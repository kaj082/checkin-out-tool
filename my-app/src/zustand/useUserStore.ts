import { create } from "zustand";
import { persist } from "zustand/middleware";

type Attendance = {
  checkInTime?: string;
  checkOutTime?: string;
  date?: string;
  userId?: string;
};

type User = {
  userId: string;
  firstName: string;
  mobile: string;
  lastName: string;
};

type UserStore = {
  user: User | null;
  attendance: Attendance | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setAttendance: (data: Attendance) => void;
  clearAttendance: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      attendance: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setAttendance: (attendance) => set({ attendance }),
      clearAttendance: () => set({ attendance: null }),
    }),
    {
      name: "user-storage", // localStorage key
    }
  )
);

export default useUserStore;
