import { DynamoDB, QueryCommand } from "@aws-sdk/client-dynamodb";
import { stringify, v4 as uuidv4 } from "uuid";

import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { useState } from "react";

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
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  if (req.method === "PUT") {
    const user = req.query.user;
    const data = req.query.data;
    const type = req.query.type;
    const unique_id = uuidv4();
    const now_date = new Date().toISOString();
    const save_date = now_date.split("T")[0];
    const save_time = now_date.split("T")[1];

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
            S: type,
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

    return res.status(200).json({ status: "success" });
  }

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
  if (req.method === "GET") {
    const user = req.query.user;
    const ref = req.query.ref;

    if (ref == "list") {
      var table = process.env.TABLE_USER;
    } else {
      var table = process.env.TABLE_NAME;
    }

    const params = {
      TableName: table,
      ScanIndexForward: false,
      KeyConditionExpression: "email = :value",
      ExpressionAttributeValues: {
        ":value": {
          S: user,
        },
      },
    };
    const command = new QueryCommand(params);
    const data = await client.send(command);
    return res.json(data.Items);
  }
}