import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAttendance extends Document {
  userId: mongoose.Types.ObjectId;
  date: string;
  checkInTime: Date;
  checkOutTime?: Date;
}

const AttendanceSchema: Schema<IAttendance> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date },
});

export default (mongoose.models.Attendance as Model<IAttendance>) ||
  mongoose.model<IAttendance>("Attendance", AttendanceSchema);
