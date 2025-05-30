import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../middleware/auth";
import { checkIn } from "../../controllers/attendanceController";

export async function POST(req: NextRequest) {
  const userId = await verifyJWT(req);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { status, body } = await checkIn({ userId });
  return NextResponse.json(body, { status });
}
