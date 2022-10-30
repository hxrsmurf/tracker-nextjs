import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { unstable_getServerSession } from "next-auth/next";
import { stringify, v4 as uuidv4 } from "uuid";
import { authOptions } from "../auth/[...nextauth]";

const client = new DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
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

  if (req.method === "PUT") {
    const user = req.query.user;
    const data = req.query.data;
    const type = req.query.type;
    const unique_id = uuidv4();
    const now_date = new Date().toISOString()
    const save_date = now_date.split('T')[0]
    const save_time = now_date.split('T')[1]

    client.putItem(
      {
        TableName: process.env.TABLE_USER,
        Item: {
          email: {
            S: user,
          },
          epoch: {
            S: Date.now().toString()
          },
          type: {
            S: type
          },
          category: {
            S: data,
          }
        },
      },
      function (err, data) {
        if (err) console.log(err, err.stack);
        else return res.status(200).json({ status: data });
      }
    );

    return res.status(200).json({ status: "success" });
  }

  if (req.method === "GET") {

    const user = req.query.user

    client.query(
      {
        TableName: process.env.TABLE_USER,
        ScanIndexForward: false,
        KeyConditionExpression: "email = :value",
        ExpressionAttributeValues: {
          ":value": {
            S: user,
          },
        },
      },
      function (err, data) {
        if (err) console.log(err, err.stack);
        else return res.status(200).json(data.Items);
      }
    );
  }
}