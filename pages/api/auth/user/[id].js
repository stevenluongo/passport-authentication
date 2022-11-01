import nextConnect from "next-connect";
import { removeUser } from "../../../../lib/user";
import { nextRouteAdapter } from "../../../../lib/main/adapters/nextRouteAdapter";
import { makeFetchUserByIdController } from "../../../../lib/main/factories/controllers/user/makeFetchUserByIdController";
import {makeUpdateUserController} from "../../../../lib/main/factories/controllers/user/makeUpdateUserController";

const handler = nextConnect();

//fetch user by id
handler.get(nextRouteAdapter(makeFetchUserByIdController()));

//update user
handler.put(nextRouteAdapter(makeUpdateUserController()));

// //update user
// handler.put(async (req, res) => {
//   const { id } = req.query;
//   try {
//     const result = await updateUser(id, req.body);
//     res.status(200).json({ success: true, ...result });
//   } catch (err) {
//     res.status(500).json({ message: err.message, ...err });
//   }
// });

//delete user
handler.delete(async (req, res) => {
  const { id } = req.query;
  try {
    const result = await removeUser(id);
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ message: err.message, ...err });
  }
});

export default handler;
