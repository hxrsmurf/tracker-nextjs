import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { stringify, v4 as uuidv4 } from "uuid"

import { DynamoDB, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"

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

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/interfaces/putitemcommandinput.html#item
export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return;
    }

    if (req.method == 'GET') {
        const params = {
          TableName: process.env.TABLE_USER,
          KeyConditionExpression: "email = :value",
          ExpressionAttributeNames: {'#t': 'type'},
          FilterExpression: '#t = :setting',
          ExpressionAttributeValues: {
            ":value": {
              S: session.user.email,
            },
            ":setting": {
              S: 'setting'
            },
          },
        };

        const command = new QueryCommand(params);
        const data = await client.send(command);
        const current_setting = data.Items[0].data

        res.send({setting: current_setting})
    }

    if (req.method == 'PUT') {
        var uuid = null

        // We actually send a string
        if (req.body === 'enabled') {
            uuid = uuidv4().replace(/-/g, "").slice(0, 10)
        } else {
            uuid = 'disabled'
        }

        console.log(uuid)

        const params = {
            TableName: process.env.TABLE_USER,
            Item: {
                'email': {
                    'S': session.user.email
                },
                'epoch': {
                    'S': 'now_playing_public'
                },
                'data': {
                    'S': uuid
                },
                'type': {
                    'S': 'setting'
                }
            }
        }

        const command = new PutItemCommand(params)

        try {
            const result = await client.send(command)
            res.send({ message: 'Successfully updated!', share_id: uuid })
        } catch (error) {
            res.send({ message: 'Failed to update:' + error })
        }
    }
}