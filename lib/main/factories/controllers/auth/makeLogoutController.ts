import { getTokenCookie, removeTokenCookie } from '@main/helpers/cookies';
import { NextApiRequest, NextApiResponse } from 'next';

export const makeLogoutController = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const cookies = getTokenCookie(req);
    if (cookies?.['passport-session'])
      removeTokenCookie(res, 'passport-session');
    return res
      .status(200)
      .json({ success: true, message: 'You have successfully logged out.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
