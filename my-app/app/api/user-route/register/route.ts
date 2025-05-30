import { NextRequest, NextResponse } from "next/server";
import { register } from "../../controllers/authController";
import User from "../../models/User";

async function checkUserExists(mobile: string) {
  const user = await User.findOne({ mobile });
  return !!user;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { firstName, lastName, mobile, password } = data;

    const userExists = await checkUserExists(mobile);
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const result = await register({ firstName, lastName, mobile, password });

    return NextResponse.json(
      {
        message: "Registration successful",
        data: result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
