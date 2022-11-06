import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../../infra/db/mongodb/helpers/database.service';
import { UserRepository } from '../../../../infra/db/mongodb/repositories/UserRepository';
import { getLoginSession } from '../../../helpers/session';

export const makeSessionController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await connectToDatabase();
    const session = await getLoginSession(req);
    const userRepo = new UserRepository();
    const user = session ? await userRepo.fetchUserById({id: session._id}) : null;
    if (!user) {
      res.status(401).json({ user });
      return;
    }
    return res.status(200).json({ success: true, user });
  } catch (e) {
    return res.status(500).json({ message: e.message, success: false });
  }
};
