import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const { DynamoDB } = require("@aws-sdk/client-dynamodb");
import { stringify, v4 as uuidv4 } from "uuid"

const client = new DynamoDB({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.REGION,
  });

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);
    // Date.now().toString()
    console.log(session.user.email)
    const params = {
        TableName: process.env.TABLE_USER,
        Key: {
            'email' : {
                'S': 'kevin'
            },
            'epoch' : {
                'S': 'now_playing_public'
            }
        },
        UpdateExpression: 'SET category = :category',
        ExpressionAttributeValues: {
            ':category': {'S': 'testing'}
        }
    }

    client.updateItem(params).then((data)=> {
        res.send({message: 'Success'})
    }).catch
}