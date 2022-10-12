import { getTokenCookie, removeTokenCookie } from '../../../lib/cookies';

const handler = async (req, res) => {
  try {
    const cookies = getTokenCookie(req);
    if (cookies['passport-session']) removeTokenCookie(res, 'passport-session');
    res
      .status(200)
      .json({ success: true, message: 'You have successfully logged out.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export default handler;