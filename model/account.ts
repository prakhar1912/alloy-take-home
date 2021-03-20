import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const PASSWORD_SALT_ROUNDS = 5;

interface IAccountSchema extends Document {
  email: string;
  password: string;
}

const AccountSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

AccountSchema.pre("save", function(this: IAccountSchema, next) {
  const account = this;
  const salt = bcrypt.genSaltSync(PASSWORD_SALT_ROUNDS);
  account.password = bcrypt.hashSync(account.password, salt);
  next();
});

const Account = model<IAccountSchema>("Account", AccountSchema);
export default Account;