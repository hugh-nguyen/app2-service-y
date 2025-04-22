// app2-service-y (Lambda version)
import express, { Request, Response } from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { instrumentWithAxon } from 'cortex-axon-js';

const app = express();

app.use(instrumentWithAxon("app2"));

app.get('/getresult', async (req: Request, res: Response) => {
  try {
    // const response = await axios.get('http://localhost/shared-app/service-s/getresult/');
    const response = await axios.get('http://hn-cortex.click/shared-app/service-s/getresult/');
    const payload = ["Y=0.0.2", ...response.data];
    res.status(response.status).json(payload);
  } catch (err: any) {
    console.error("Error calling /getresult:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// catch-all 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

export const handler = serverlessExpress({ app });
