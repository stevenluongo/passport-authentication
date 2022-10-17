import { NextApiRequest, NextApiResponse } from 'next';
import { BaseController } from '../../infra/controllers/baseController';
import { HttpRequest } from '../../infra/interfaces/httpRequest';

export const nextRouteAdapter =
  (controller: BaseController) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    //format httpRequest payload
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.query,
      headers: req.headers,
    };

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
