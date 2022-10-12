import { createLocalUser } from '../../../../lib/user';
import csrf from '../../../../utils/csrf';

//create new user
const handler = async (req, res) => {
  try {
    await csrf(req, res);
    const response = await createLocalUser(req.body);
    res.status(201).json({ success: true, ...response });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export default handler;
