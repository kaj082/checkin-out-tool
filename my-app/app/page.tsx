"use client";

import { attendenceAction } from "@/src/actions";
import AppSkeleton from "@/src/component/appskeleton/AppSkeleton";
import Loader from "@/src/component/loader/Loader";
import Spinner from "@/src/component/spinner/Spinner";
import {
  calculateTotalHours,
  formatTime,
  getFormattedTime,
  getGreetingByTime,
} from "@/src/helpers/general.helper";
import { withAuth } from "@/src/hoc/withAuthentication";
import useUserStore from "@/src/zustand/useUserStore";
import { Suspense, useEffect, useState } from "react";

interface Record {
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
}
type PaginationType = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

const Home = () => {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [pagination, setPagination] = useState<PaginationType>({
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });

  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const user = useUserStore((state) => state.user);
  const setAttendance = useUserStore((state) => state.setAttendance);
  const [HistoryData, setHistoryData] = useState<Record[]>([]);
  const [isCheckin, setIsCheckin] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [status, setStatus] = useState("not_checked_in");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTime(getFormattedTime());
    setGreeting(getGreetingByTime());

    const interval = setInterval(() => {
      setTime(getFormattedTime());
      setGreeting(getGreetingByTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      const res = await attendenceAction.fetchAttendanceHistory(page, 10);
      if (res.success) {
        console.log(res.data, "res.data.data");
        console.log(res.data.formattedData, "res.data.formattedData");
        setHistoryData(res.data.formattedData);
        setPagination(res.data.pagination);
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, [page]);

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await attendenceAction.fetchStatus();
      if (res.success) {
        setStatus(res.data.status);
      }
    };

    fetchStatus();
  }, []);

  const handleCheckIn = async () => {
    setIsCheckin(true);
    try {
      const res = await attendenceAction.userCheckIn();
      if (res.success) {
        setAttendance({
          date: res.data.data.date,
          checkInTime: res.data.data.checkInTime,
          userId: res.data.data.userId,
        });
      }
    } finally {
      setIsCheckin(false);
    }
  };

  const handleCheckOut = async () => {
    setIsCheckout(true);
    try {
      const res = await attendenceAction.userCheckOut();
      if (res.success) {
        setAttendance({
          date: res.data.data.date,
          checkOutTime: res.data.data.checkOutTime,
          userId: res.data.data.userId,
        });
      }
    } finally {
      setIsCheckout(false);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < pagination?.totalPages) setPage(page + 1);
  };

  return (
    <Suspense fallback={<Loader isLoading={true} />}>
      <AppSkeleton>
        <div className="h-full flex flex-col  bg-[#fafbfc] p-6 pt-0 space-y-8">
          <div
            className="p-6 rounded-2xl text-white"
            style={{ background: "linear-gradient(90deg, #6b3eb4, #8c52d0)" }}
          >
            <h2 className="text-2xl font-bold">
              Hi, {user?.firstName} {user?.lastName}
            </h2>
            <p className="mt-1">{greeting}</p>
            <p className="mt-2 text-4xl font-mono">{time}</p>

            <div className="mt-4 flex gap-4">
              {status === "not_checked_in_out" && (
                <button
                  className="flex-1 py-2 rounded-lg bg-white/20 hover:bg-white/30 cursor-pointer"
                  onClick={handleCheckIn}
                >
                  {isCheckin ? <Spinner /> : "Check In"}
                </button>
              )}
              {status === "checked_in" && (
                <button
                  className="flex-1 py-2 rounded-lg bg-white/20 hover:bg-white/30 cursor-pointer"
                  onClick={handleCheckOut}
                >
                  {isCheckout ? <Spinner /> : "Check Out"}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4 flex-1 flex flex-col">
            <h3 className="text-xl font-semibold text-[#121212]">History</h3>

            <div className="bg-white rounded-xl relative shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#6b3eb4] text-white sticky top-0">
                    <tr>
                      {[
                        "Date",
                        "Day",
                        "Check-In",
                        "Check-Out",
                        "Total Hours",
                      ].map((hdr) => (
                        <th
                          key={hdr}
                          className="px-4 py-3 text-left text-sm font-medium bg-[#6b3eb4]"
                        >
                          {hdr}
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="overflow-y-auto max-h-[250px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-100">
                    {HistoryData.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-4 text-sm text-gray-500"
                        >
                          No records available
                        </td>
                      </tr>
                    ) : (
                      HistoryData.map((r, i) => {
                        const d = new Date(r.date);
                        return (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm">
                              {d.toLocaleDateString("en-GB")}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {d.toLocaleDateString("en-US", {
                                weekday: "long",
                              })}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {formatTime(r.checkInTime)}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {formatTime(r.checkOutTime)}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              {calculateTotalHours(
                                r.checkInTime,
                                r.checkOutTime
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {isLoading && (
                <div className="absolute left-1/2 top-[50%]">
                  <Spinner color="#6b3eb4" size={32} />
                </div>
              )}
            </div>

            <div className="flex justify-center items-center space-x-2">
              <button
                disabled={page === 1}
                onClick={handlePrev}
                className="px-3 py-1 rounded bg-[#6b3eb4]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <span className="text-sm text-[#626f86]">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                disabled={page === 100}
                onClick={handleNext}
                className="px-3 py-1 cursor-pointer rounded bg-[#6b3eb4]/20 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </AppSkeleton>
    </Suspense>
  );
};

export default withAuth(Home);
