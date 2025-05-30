import { NextRequest, NextResponse } from "next/server";
import { status } from "../../controllers/attendanceController";
import { verifyJWT } from "../../middleware/auth";
export async function GET(req: NextRequest) {
  const userId = await verifyJWT(req);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { status: statusCode, body } = await status({ userId });
  return NextResponse.json(body, { status: statusCode });
}
