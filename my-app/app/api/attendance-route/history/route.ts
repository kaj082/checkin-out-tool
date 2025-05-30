import { NextRequest, NextResponse } from "next/server";
import { history } from "../../controllers/attendanceController";
import { verifyJWT } from "../../middleware/auth";

export async function POST(req: NextRequest) {
  const userId = await verifyJWT(req);
  console.log(userId, "userId");
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { page = 1, limit = 10 } = await req.json();

  const { status, body } = await history({ userId }, page, limit);
  return NextResponse.json(body, { status });
}
