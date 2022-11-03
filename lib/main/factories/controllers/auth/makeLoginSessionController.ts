import { NextApiRequest, NextApiResponse } from 'next';
import { setLoginSession } from '../../../../auth';
import { authenticate } from '../../../../strategies/local';

export const makeLoginSessionController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user: Object = await authenticate(req, res);

    const session = { ...user };

    const cookie = await setLoginSession(session);

    res.setHeader('Set-cookie', cookie);

    return res.status(200).json({ success: true, user });
  } catch (e) {
    return res.status(500).json({ message: e.message, success: false });
  }
};
