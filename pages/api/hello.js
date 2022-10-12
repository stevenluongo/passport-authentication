// import { createLocalUser } from '../../lib/user';

const handler = async (_req, res) => {
//   const _response = await createLocalUser();
  res.json({ message: 'hello' });  
};

export default handler;