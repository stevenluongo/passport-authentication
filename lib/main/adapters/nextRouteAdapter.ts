import { NextApiRequest, NextApiResponse } from 'next';
import { BaseController } from '../../infra/controllers/baseController';
import { connectToDatabase } from '../../infra/db/mongodb/helpers/database.service';
import { HttpRequest } from '../../infra/http/interfaces/httpRequest';

export const nextRouteAdapter =
  (controller: BaseController) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    //format httpRequest payload
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.query,
      headers: req.headers,
    };

    //ensure db connection
    await connectToDatabase();

    //handle the http request
    const httpResponse = await controller.handle(httpRequest);

    //return successful responses
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    }

    //return errors
    else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body?.message,
      });
    }
  };
