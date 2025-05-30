import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "../lib/dbConnect";
import User from "../models/User";
import bcrypt from "bcryptjs";

interface RegisterData {
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
}

export async function register(data: RegisterData) {
  await dbConnect();
  const { firstName, lastName, mobile, password } = data;

  const existingUser = await User.findOne({ mobile });
  if (existingUser) {
    return { status: 400, body: { message: "User already exists" } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    mobile,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  return {
    status: 201,
    body: {
      data: {
        firstName,
        lastName,
        mobile,
        userId: user._id.toString(),
      },
      token,
    },
  };
}
export async function handleLogin(data: { mobile: string; password: string }) {
  await dbConnect();
  const { mobile, password } = data;

  const user = await User.findOne({ mobile });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { status: 401, body: { message: "Invalid credentials" } };
  }

  const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  return {
    status: 200,
    body: {
      token,
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        userId: user._id.toString(),
      },
    },
  };
}
