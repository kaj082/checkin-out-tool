"use client";
import { attendenceAction } from "@/src/actions";
import AppSkeleton from "@/src/component/appskeleton/AppSkeleton";
import Loader from "@/src/component/loader/Loader";
import MonthlySummarySkeleton from "@/src/component/MonthlySkeleton";
import { calculateProgressPercent } from "@/src/helpers/general.helper";
import { withAuth } from "@/src/hoc/withAuthentication";
import React, { useEffect } from "react";

const page = ({ month = "This Month" }) => {
  const [totalHours, setTotalHours] = React.useState<string>("");
  const [progress, setProgress] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const monthData = async () => {
      setIsLoading(true);
      const res = await attendenceAction.fetchMonthlySummary();
      if (res.success) {
        setTotalHours(res.data.totalHours);
      }
      setIsLoading(false);
    };
    monthData();
  }, []);

  const progressPercent = calculateProgressPercent(totalHours, 200);
  useEffect(() => {
    setProgress(progressPercent);
  }, [progressPercent]);

  return (
    <AppSkeleton>
      {isLoading ? (
        <MonthlySummarySkeleton />
      ) : (
        <div className="w-full bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-tr from-[#6b3eb4] to-[#9d6bf0] p-3 rounded-full"></div>
            <div>
              <p className="text-gray-500 text-sm">{month}</p>
              <h2 className="text-lg font-semibold text-gray-800">
                Monthly Summary
              </h2>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{totalHours}</p>
            <p className="text-sm text-gray-500">Total hours at work</p>
          </div>

          <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6b3eb4] to-[#9d6bf0] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </AppSkeleton>
  );
};

export default withAuth(page);
