import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { DynamoDB, QueryCommand } from "@aws-sdk/client-dynamodb";
import { stringify, v4 as uuidv4 } from "uuid";

const client = new DynamoDB({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.REGION,
  });

export default async function handler(req, res) {
    const session = await unstable_getServerSession(req, res, authOptions);
    const user = req.query.user

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    if (user != session.user.email) {
        res.status(401).json({
            message: 'Invalid access.'
        })
    }

    const data = uuidv4();


    client.putItem(
        {
          TableName: process.env.TABLE_USER,
          Item: {
            email: {
              S: user,
            },
            epoch: {
              S: Date.now().toString(),
            },
            type: {
              S: 'key',
            },
            category: {
              S: data,
            },
          },
        },
        function (err, data) {
          if (err) console.log(err, err.stack);
          else return res.status(200).json({ status: data });
        }
      );

    return (
        res.send({
            message: user,
            requestor: session.user.email
        })
    )
}