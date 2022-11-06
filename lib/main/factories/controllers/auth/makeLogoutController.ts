import { NextApiRequest, NextApiResponse } from 'next';
import { getTokenCookie, removeTokenCookie } from '../../../helpers/cookies';

export const makeLogoutController = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const cookies = getTokenCookie(req);
    if (cookies?.['passport-session']) removeTokenCookie(res, 'passport-session');
    return res
      .status(200)
      .json({ success: true, message: 'You have successfully logged out.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
