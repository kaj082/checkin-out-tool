import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "../../middleware/auth";
import { summary } from "../../controllers/attendanceController";

export async function GET(req: NextRequest) {
  const userId = await verifyJWT(req);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { status, body } = await summary({ userId });
  return NextResponse.json(body, { status });
}
