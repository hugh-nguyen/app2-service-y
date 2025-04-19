// app2-service-y (Lambda version)
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { instrumentWithAxon } from 'cortex-axon-js';

instrumentWithAxon("app2");

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (event.path === '/getresult' || event.resource === '/getresult') {
    try {
      // const response = await axios.get('http://localhost/shared-app/service-s/getresult/');
      const response = await axios.get('http://hn-cortex.click/shared-app/service-s/getresult/');
      return {
        statusCode: response.status,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(["Y=0.0.1", ...response.data])
      };
    } catch (err: any) {
      console.error("Error calling /getresult:", err.message);
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: "Something went wrong" })
      };
    }
  }

  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ error: "Not found" })
  };
};