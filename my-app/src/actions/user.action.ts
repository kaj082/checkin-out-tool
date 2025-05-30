import { toast } from "react-toastify";
import axiosInstance from "../../axios";
export const userLogin = async (credentials: {
  mobile: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/user-route/login", credentials);
    console.log(response.data);
    toast.success("Login successful!");
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Login failed");
    return {
      success: false,
      data: [],
    };
  }
};

export const userRegister = async (credentials: {
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
}) => {
  try {
    const { status, data } = await axiosInstance.post(
      "/user-route/register",
      credentials
    );

    const message = data?.message ?? "Registration successful!";

    if (status === 201) {
      toast.success(message);
      return { success: true, status, message, data };
    }

    toast.error("Unexpected response from server");
    return {
      success: false,
      status,
      message: "Unexpected response from server",
      data: [],
    };
  } catch (error: any) {
    const status = error?.response?.status ?? 500;
    const message =
      error?.response?.data?.message ??
      error?.response?.data?.body?.message ??
      "Registration failed";

    toast.error(message);

    return { success: false, status, message, data: [] };
  }
};

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get("/user-route/user", {
      headers: {
        Authorization: `Bearer ${token}`,
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
