import { DynamoDB, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    region: process.env.REGION,
});

export default async function handler(req, res) {
    const api_key = req.query.key
    const email = req.query.email

    if (!api_key) {
        res.status(401).json({
            message: 'Invalid API Key'
        })
    }

    const params = {
        TableName: process.env['TABLE_USER'],
        ScanIndexForward: false,
        KeyConditionExpression: "email = :value",
        ProjectionExpression: "#c, #t",
        ExpressionAttributeNames: { "#c": "category", "#t": "type" },
        FilterExpression: "#c = :value2",
        ExpressionAttributeValues: {
            ":value": {
                S: email,
            },
            ":value2": {
                S: api_key,
            }
        },
    };

    const command = new QueryCommand(params);

    client.send(command).then((data) => {
        if (data.Items.length == 0) res.status(401).send({message: 'Invalid API Key'})
        delete params.FilterExpression
        delete params.ExpressionAttributeValues[":value2"]

        const new_command = new QueryCommand(params)
        client.send(new_command).then((data) => {
            res.send({
                message: data
            })
        })
    },
        (error) => {
            res.status(500).send({ message: 'Error with API. Contact Administrator' })
        }
    )
}