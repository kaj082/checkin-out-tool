import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import AttendanceRecord from "../../models/AttendanceRecord";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      console.log("Missing userId");
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const records = [];

    for (let day = 1; day <= 30; day++) {
      const dateStr = `2025-04-${day.toString().padStart(2, "0")}`;
      const date = new Date(dateStr);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday
      if (isWeekend) continue;

      const record = {
        userId,
        date: dateStr,
        checkInTime: new Date(`${dateStr}T09:00:00Z`),
        checkOutTime: new Date(`${dateStr}T17:00:00Z`),
      };

      records.push(record);
    }

    const newRecords = await AttendanceRecord.insertMany(records);

    return NextResponse.json(
      { message: "Dummy attendance records added", data: newRecords },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in dummy route:", error.message || error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
