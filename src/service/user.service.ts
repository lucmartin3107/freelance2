import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserInput, UserDocument} from "../models/user.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";


export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;
  
  console.log(user);
  return omit(user.toJSON(), "password");
}


export async function findAllUser() {
  return UserModel.find().lean();
}

export async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "finduser",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await UserModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function deleteUser(query: FilterQuery<UserDocument>) {
  return UserModel.deleteOne(query);
}
