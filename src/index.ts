// app2-service-y
import express, { Request, Response } from 'express';
import axios from 'axios';
import { instrumentWithAxon } from 'cortex-axon-js';

const app = express();

app.use(instrumentWithAxon("app2"));

axios.defaults.proxy = {
  host: 'envoy',
  port: 8080
};

app.get('/getresult', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`http://localhost/shared-app/service-s/getresult/`);
    return res.status(response.status).json(["Y=0.0.1", ...response.data]);
  } catch (err: any) {
    console.error("Error calling /y/getresult:", err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(80, () => {
  console.log('service-y listening on port 80');
});
