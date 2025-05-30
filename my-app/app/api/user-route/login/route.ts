import { NextRequest, NextResponse } from "next/server";
import { handleLogin } from "../../controllers/authController";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { status, body } = await handleLogin(data);
    return NextResponse.json(body, { status });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
