import axiosInstance from "@/axios";
import { toast } from "react-toastify";

export const userCheckIn = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      "/attendance-route/check-in",
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    toast.success("Check-in successful!");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Check-in failed");
    return {
      success: false,
      data: [],
    };
  }
};

export const userCheckOut = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(
      "/attendance-route/check-out",
      {},
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    toast.success("Check-out successful!");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Check-out failed");
    return {
      success: false,
      data: [],
    };
  }
};

export const fetchAttendanceHistory = async (
  page: number = 1,
  limit: number = 10
) => {
  try {
    const token = localStorage.getItem("token"); // or whatever your token key is

    const response = await axiosInstance.post(
      `/attendance-route/history`,
      { page, limit },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error fetching attendance history:", error);
    return {
      success: false,
      data: [],
    };
  }
};

export const fetchStatus = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/attendance-route/status", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
    };
  }
};

export const fetchMonthlySummary = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get("/attendance-route/summary", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
    };
  }
};
