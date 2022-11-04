import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { stringify, v4 as uuidv4 } from "uuid"

import { DynamoDB, PutItemCommand } from "@aws-sdk/client-dynamodb"
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
    const params = {
        TableName: process.env.TABLE_USER,
        Item: {
            'email': {
                'S': session.user.email
            },
            'epoch': {
                'S': 'now_playing_public'
            },
            'data' : {
                'BOOL' : true
            },
            'type' : {
                'S' : 'setting'
            }
        }
    }

    const command = new PutItemCommand(params)

    try {
        const result = await client.send(command)
        res.send({message: 'Successfully updated!'})
    } catch (error) {
        res.send({message: 'Failed to update:' + error})
    }
}