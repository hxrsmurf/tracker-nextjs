import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import { DynamoDB, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB({
  credentials: {
    accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  },
  region: process.env.REGION,
});

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.send({
      content: "Not authorized",
    });
  }

  if (req.method === "GET") {
    const user_id = req.query.id
    const params = {
      TableName: process.env.NEXT_AUTH_AWS_TABLE,
      ScanIndexForward: false,
      KeyConditionExpression: "pk = :value",
      ExpressionAttributeValues: {
        ":value": {
          S: 'USER#' + user_id,
        },
      },
    };
    const command = new QueryCommand(params);
    const data = await client.send(command);

    const expires_at = data.Items[2].expires_at.N
    const access_token = data.Items[2]['access_token']
    const refresh_token = data.Items[2]['refresh_token']
    const current_epoch = Date.now() / 1000

    if (expires_at > current_epoch) {
      console.log('Expired Access Token')
    }

    return res.send(
      {
        accessToken: data.Items[2]['access_token'],
        refreshToken: data.Items[2]['refresh_token']
      }
    );
  }
}