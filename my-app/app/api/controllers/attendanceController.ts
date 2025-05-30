import dbConnect from "../lib/dbConnect";
import Attendance from "../models/AttendanceRecord";

interface IUserContext {
  userId: string;
}

export async function checkIn({ userId }: IUserContext) {
  await dbConnect();
  const today = new Date().toISOString().slice(0, 10);

  const existing = await Attendance.findOne({ userId, date: today });
  if (existing) {
    return { status: 400, body: { message: "Already checked in" } };
  }

  const record = await Attendance.create({
    userId,
    date: today,
    checkInTime: new Date(),
  });

  return { status: 201, body: record };
}

export async function checkOut({ userId }: IUserContext) {
  await dbConnect();
  const today = new Date().toISOString().slice(0, 10);

  const record = await Attendance.findOne({ userId, date: today });
  if (!record || record.checkOutTime) {
    return { status: 400, body: { message: "Cannot check out" } };
  }

  record.checkOutTime = new Date();
  await record.save();

  return { status: 200, body: record };
}

export async function status({ userId }: IUserContext) {
  await dbConnect();
  const today = new Date().toISOString().slice(0, 10);

  const record = await Attendance.findOne({ userId, date: today });

  if (!record) return { status: 200, body: { status: "not_checked_in_out" } };

  if (!record.checkOutTime)
    return { status: 200, body: { status: "checked_in" } };

  return { status: 200, body: { status: "checked_out" } };
}

export async function history({ userId }: IUserContext, page = 1, limit = 10) {
  await dbConnect();

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const dateThreshold = threeMonthsAgo.toISOString().slice(0, 10);

  const skip = (page - 1) * limit;

  const totalRecords = await Attendance.countDocuments({
    userId,
    date: { $gte: dateThreshold },
  });

  const records = await Attendance.find({
    userId,
    date: { $gte: dateThreshold },
  })
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalRecords / limit);
  const formattedData = records.map((i) => ({
    userId: i.userId,
    date: i.date,
    checkInTime: i.checkInTime,
    checkOutTime: i.checkOutTime,
  }));

  return {
    status: 200,
    body: {
      formattedData,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    },
  };
}

export async function summary({ userId }: IUserContext) {
  await dbConnect();
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-01`;

  const records = await Attendance.find({ userId, date: { $gte: monthStart } });

  const totalHours = records.reduce((sum, r) => {
    if (r.checkInTime && r.checkOutTime) {
      return (
        sum + (r.checkOutTime.getTime() - r.checkInTime.getTime()) / 3600000
      );
    }
    return sum;
  }, 0);

  return { status: 200, body: { totalHours } };
}
