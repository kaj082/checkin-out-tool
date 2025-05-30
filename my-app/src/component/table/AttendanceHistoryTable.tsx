import {
  calculateTotalHours,
  formatDate,
  formatTime,
  getDayName,
} from "@/src/helpers/general.helper";

interface AttendanceRecord {
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
}

interface Props {
  data: AttendanceRecord[];
}

const AttendanceHistoryTable: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-auto rounded-lg border border-gray-300">
      <table className="min-w-full text-sm text-left text-white bg-gray-900">
        <thead className="bg-gray-800 text-white uppercase">
          <tr>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Day</th>
            <th className="px-6 py-3">Check-In</th>
            <th className="px-6 py-3">Check-Out</th>
            <th className="px-6 py-3">Day Hours</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, idx) => (
            <tr
              key={idx}
              className="border-t border-gray-700 hover:bg-gray-800"
            >
              <td className="px-6 py-4">{formatDate(record.date)}</td>
              <td className="px-6 py-4">{getDayName(record.date)}</td>
              <td className="px-6 py-4">{formatTime(record.checkInTime)}</td>
              <td className="px-6 py-4">{formatTime(record.checkOutTime)}</td>
              <td className="px-6 py-4">
                {calculateTotalHours(record.checkInTime, record.checkOutTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistoryTable;
