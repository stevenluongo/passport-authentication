import { NextApiRequest, NextApiResponse } from 'next';
import { setLoginSession } from '../../../../auth';
import { authenticate } from '../../../../strategies/local';
import {connectToDatabase} from "../../../../infra/db/mongodb/helpers/database.service";

export const makeLoginSessionController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await connectToDatabase();

    const user: Object = await authenticate(req, res);

    const session = { ...user };

    const cookie = await setLoginSession(session);

    res.setHeader('Set-cookie', cookie);

    return res.status(200).json({ success: true, user });
  } catch (e) {
    return res.status(500).json({ message: e.message, success: false });
  }
};
