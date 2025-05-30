export const getGreetingByTime = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export const getFormattedTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const paddedMinutes = String(minutes).padStart(2, "0");
  return `${String(hours).padStart(2, "0")}:${paddedMinutes} ${ampm}`;
};

export const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const calculateTotalHours = (
  checkIn?: string,
  checkOut?: string
): string => {
  if (!checkIn || !checkOut) return ".. hrs";

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  const diff = outDate.getTime() - inDate.getTime();
  const totalMins = Math.floor(diff / 1000 / 60);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  return `${hrs}h ${mins}m`;
};

export const calculateProgressPercent = (
  totalHoursInput: number | string,
  targetHours: number
): number => {
  const totalHours =
    typeof totalHoursInput === "string"
      ? parseFloat(totalHoursInput)
      : totalHoursInput;

  if (isNaN(totalHours) || targetHours <= 0) return 0;

  return Math.min((totalHours / targetHours) * 100, 100);
};

export const formatTime = (isoString: string | undefined | null): string => {
  if (!isoString) return "--:--";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "--:--";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export const formateDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
};
