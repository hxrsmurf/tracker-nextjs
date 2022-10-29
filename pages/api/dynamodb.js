import { DynamoDB } from "@aws-sdk/client-DynamoDB";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

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


  if (req.method === "GET") {
    client.query(
      {
        TableName: process.env.TABLE_NAME,
        Limit: 10,
        ScanIndexForward: false,
        KeyConditionExpression: "id = :value",
        ExpressionAttributeValues: {
          ":value": {
            S: "1234",
          },
        },
      },
      function (err, data) {
        if (err) console.log(err, err.stack);
        else {
          return res.status(200).json(data.Items);
        }
      }
    );
  }
}