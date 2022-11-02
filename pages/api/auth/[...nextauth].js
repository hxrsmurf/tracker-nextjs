import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";

import { DynamoDB, QueryCommand, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

const DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY
  },
  region: 'us-east-1'
}

const client = DynamoDBDocument.from(new DynamoDB(DynamoDBClientConfig), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})

async function updateDBAccessToken(id, access_token, expires_at, sort_key, partition_key) {
  const params = {
    TableName: process.env.NEXT_AUTH_AWS_TABLE,
    Key: { 'pk': partition_key, 'sk': sort_key },
    UpdateExpression: 'SET access_token = :access, expires_at = :expires',
    ExpressionAttributeValues: {
      ':access': {
        'S': access_token
      },
      ':expires': {
        'S': String(expires_at)
      }
    }
  }
  const command = new UpdateItemCommand(params)
  const data = await client.send(command)
}

async function generateDBParameter(id) {
  const params = {
    TableName: process.env.NEXT_AUTH_AWS_TABLE,
    ScanIndexForward: false,
    KeyConditionExpression: "pk = :value",
    ExpressionAttributeValues: {
      ":value": {
        S: 'USER#' + id,
      },
    }
  }

  const command = new QueryCommand(params);
  const data = await client.send(command);

  var refresh_token = null
  var access_token = null
  var expires_at = null
  var sort_key = null
  var partition_key = null

  {
    data.Items.map((d, id) => {
      { d.refresh_token ? refresh_token = d.refresh_token.S : null }
      { d.access_token ? access_token = d.access_token.S : null }
      { d.expires_at ? expires_at = d.expires_at.S : null }
      { d.sk ? sort_key = d.sk : null }
      { d.pk ? partition_key = d.pk : null }
    })
  }

  const current_time = Date.now() / 1000

  // If access token expired, grab a new one
  if (current_time > expires_at) {
    console.log('Access Token Expired!')

    const url = 'https://accounts.spotify.com/api/token?' + new URLSearchParams({
      client_id: process.env.SPOTIFY_ID,
      client_secret: process.env.SPOTIFY_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    })

    const refresh_response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    const result = await refresh_response.json()
    access_token = result.access_token
    expires_at = result.expires_in + current_time

    await updateDBAccessToken(id, access_token, expires_at, sort_key, partition_key)

  }

  return { refresh_token, access_token, expires_at }

}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: { params: { scope: "user-read-private user-read-recently-played user-read-currently-playing user-top-read" } },
    }),
    // ...add more providers here
  ],
  adapter: DynamoDBAdapter(
    client,
    { tableName: process.env.NEXT_AUTH_AWS_TABLE }
  ),
  callbacks: {
    async session({ session, user, token }) {
      session.id = user.id
      session.tokens = await generateDBParameter(user.id)
      return session
    }
  }
};

export default NextAuth(authOptions);