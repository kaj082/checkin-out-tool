import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  userId?: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: String,
    lastName: String,
    mobile: { type: String, unique: true },
    password: String,
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id;
        delete ret.password;
      },
    },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("userId").get(function () {
  return this._id.toString();
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
