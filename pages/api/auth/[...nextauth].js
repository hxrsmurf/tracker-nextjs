import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";

import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter"

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
      authorization: {params: {scope: "user-read-private user-read-recently-played user-read-currently-playing user-top-read"}},
    }),
    // ...add more providers here
  ],
  adapter: DynamoDBAdapter(
    client,
    {tableName: process.env.NEXT_AUTH_AWS_TABLE}
  ),
  callbacks: {
    async session({session, token, user}){
      session.id = user.id
      return session
    }
  }
};

export default NextAuth(authOptions);