import { authOptions } from "./auth/[...nextauth]"
import { unstable_getServerSession } from 'next-auth/next'

const { DynamoDBClient, QueryCommand, UpdateItemCommand } = require('@aws-sdk/client-dynamodb')

//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);
    const client = new DynamoDBClient({ region: 'us-east-1' })

    if (req.method === 'PUT') {
        const params = {
            TableName: process.env.TABLE_USER,
            Key: {
                'email': {
                    'S': session.user.email
                },
                'epoch':{
                    'S': 'announcement_ack'
                }
            },
            ExpressionAttributeNames: {
                '#d': 'data'
            },
            UpdateExpression: "SET #d = :value",
            ExpressionAttributeValues: {
                ':value' : {
                    'S' : 'yes'
                }
            }
        }

        const command = new UpdateItemCommand(params)
        const data = await client.send(command)

        res.send({
            message: 'Acknowledged.'
        })
    }

    const params = {
        TableName: process.env.TABLE_USER,
        KeyConditionExpression: "email = :email",
        ExpressionAttributeNames: { '#t': 'type' },
        FilterExpression: "#t = :type",
        ExpressionAttributeValues: {
            ':email': {
                S: session.user.email
            },
            ':type': {
                S: 'setting'
            }
        }
    }
    const command = new QueryCommand(params)
    const data = await client.send(command)
    const result = data.Items
    result.forEach(setting => {
        if (setting.epoch.S == 'announcement_ack') {
            if (setting.data.S === 'yes') {
                res.send({ acknowledged: true })
            }
        }
    })

    res.send({ acknowledged: false })
}