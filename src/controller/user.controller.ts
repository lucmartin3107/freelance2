import { Request, Response } from "express";

import { CreateUserInput, UpdateUserInput } from "../schema/user.schema";
import { createUser, findAllUser, findUser, deleteUser, findAndUpdateUser  } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
export async function getAllUserHandler(
  req: Request,
  res: Response
) {
  const userId = req.params.userId;
  const user = await findAllUser();

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}
export async function getUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response
) {
  const userId = req.params.userId;
  const user = await findUser({ userId });

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}

export async function deleteUsertHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  

  const user = await findUser({ userId });

  if (!user) {

    return res.sendStatus(404);
  }
  await deleteUser({ userId });

  return res.sendStatus(200);
}
export async function updateUserHandler(
  req: Request<UpdateUserInput["params"]>,
  res: Response
) {
  console.log('yo');

  const userId = res.locals._id;
  const update = req.body;
  const user = await findUser({ userId });

  if (!user) {

    return res.sendStatus(404);
  }

  // if (String(user) !== userId) {

  //   return res.sendStatus(403);
  // }

  const updatedUser = await findAndUpdateUser({ userId }, update, {
    new: true,
  });
  return res.send(updatedUser);
}