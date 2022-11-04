import { DynamoDB, QueryCommand } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"

import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]"

const DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
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

async function lookupUserAuthTable(email) {

  const params = {
    TableName: process.env.NEXT_AUTH_AWS_TABLE,
    IndexName: process.env.NEXT_AUTH_INDEX,
    KeyConditionExpression: "email = :email",
    //FilterExpression: '#d = :data',
    ProjectionExpression: "email, pk",
    //ExpressionAttributeNames: { "#d": "data", "#t": "type" },
    ExpressionAttributeValues: {
      ":email": {
        S: email,
      }
    },
  };

  const command = new QueryCommand(params);
  const data = await client.send(command)
  const result = data.Items

  const pk = result[0].pk.S

  const params_pk = {
    TableName: process.env.NEXT_AUTH_AWS_TABLE,
    IndexName: process.env.NEXT_AUTH_INDEX_PK,
    KeyConditionExpression: "pk = :pk",
    //FilterExpression: '#d = :data',
    ProjectionExpression: "pk, access_token",
    //ExpressionAttributeNames: { "#d": "data", "#t": "type" },
    ExpressionAttributeValues: {
      ":pk": {
        S: pk,
      }
    },
  };

  const command_pk = new QueryCommand(params_pk);
  const data_pk = await client.send(command_pk)
  const result_pk = data_pk.Items
  var access_token = null

  result_pk.forEach(item => {
    if (item.access_token) {
      access_token = item.access_token.S
    }
  })

  return access_token

}

async function getNowPlaying(result) {
  const email = result[0].email.S
  const id = result[0].data.S

  const result_user_auth_table = await lookupUserAuthTable(email)
  //Next Auth Index: email and pk
  // Antoher index with pk and access

  var SpotifyWebApi = require('spotify-web-api-node');

  var spotifyApi = new SpotifyWebApi({
    accessToken: result_user_auth_table
  })

  const query_currently_playing = await spotifyApi.getMyCurrentPlaybackState()
  const shuffle_state = query_currently_playing.body.shuffle_state
  const repeat_state = query_currently_playing.body.repeat_state
  const progress = query_currently_playing.body.progress_ms
  const currently_playing = query_currently_playing.body.item
  const filtered_currently_playing = {
    album: currently_playing.album.name,
    album_image: currently_playing.album.images[0].url,
    track: currently_playing.name,
    artists: currently_playing.artists,
    shuffle: shuffle_state,
    repeat: repeat_state,
    progress: progress
  }

  return ({
    now_playing: filtered_currently_playing
  })
}

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)

  const { id } = req.query

  const params = {
    TableName: process.env.TABLE_USER,
    IndexName: process.env.TABLE_USER_INDEX,
    KeyConditionExpression: "#t = :type",
    FilterExpression: '#d = :data',
    ProjectionExpression: "#d, email",
    ExpressionAttributeNames: { "#d": "data", "#t": "type" },
    ExpressionAttributeValues: {
      ":type": {
        S: 'setting',
      },
      ":data": {
        S: id
      },
    },
  };

  const command = new QueryCommand(params);
  const data = await client.send(command)
  const result = data.Items

  if (!result) res.status(401).send({ messsage: 'Unauthorized' })
  if (result.length == 0) res.status(401).send({ message: 'Invalid share id' })

  // With Share ID, we need to query the Next JS table with email to get access token

  const now_playing_track = await getNowPlaying(result)

  res.status(200).send(now_playing_track)
}