import { DynamoDB, QueryCommand } from "@aws-sdk/client-dynamodb"
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

export default async function handler(req, res) {

    const params_placeholder = {
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


    res.status(200).send({
        message: 'Hello world'
    })
}