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
  totalHoursStr: string,
  targetHours: number
) => {
  // Handle plain numbers like "8"
  if (/^\d+$/.test(totalHoursStr)) {
    totalHoursStr = `${totalHoursStr}h`;
  }

  const match = totalHoursStr.match(/(\d+)h\s*(\d+)?m?/);
  if (!match) return 0;

  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;

  const totalHours = hours + minutes / 60;
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
