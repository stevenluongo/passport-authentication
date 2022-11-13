import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../infra/db/mongodb/helpers/database.service';
import { setLoginSession } from '../../../helpers/session';
import { authenticate } from '../../../strategies/local';

export const makeLoginController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await connectToDatabase();

    const user: Object = await authenticate(req, res);

    const session = { ...user };

    const cookie = await setLoginSession(session);

    res.setHeader('Set-cookie', cookie);

    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
