import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  firstname: string;
  lastname: string;
  age: number;
  major: number;
  password: string;
  country: string;
  city: string;
  postcode: number;
  additionnalInfo: string;
  diploma: string[];
  yearOfGraduation:  number;
  school: string;
  countryschool:string;

}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: false },
    age: { type: Number, required: false },
    major: { type: Number, required: false },
    password: { type: String, required: true },
    country: { type: String, required: false },
    city: { type: String, required: false },
    postcode: { type: Number, required: false },
    additionnalInfo: { type: String, required: false },
    diploma: { type: [String], required: false },
    yearOfGraduation: { type: Number, required: true },
    school: { type: String, required: false },
    countryschool: { type: String, required: false },


  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;