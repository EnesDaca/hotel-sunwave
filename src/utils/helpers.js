import { format, isToday, formatDistanceStrict } from "date-fns";

export const subtractDates = (dateStr1, dateStr2) => {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  const differenceInMilliseconds = Math.abs(date1 - date2);
  return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
};

export const formatDistanceFromNow = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  if (isToday(date)) {
    return "Today";
  } else {
    return formatDistanceStrict(date, today, { addSuffix: true });
  }
};

export const getToday = (options = {}) => {
  const today = new Date();
  if (options.end) {
    today.setHours(23, 59, 59, 999);
  } else {
    today.setHours(0, 0, 0, 0);
  }
  return today.toISOString();
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return format(date, "MMM dd yyyy");
};

export const formatRange = (startDateStr, endDateStr) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  return `${format(startDate, "MMM dd yyyy")} — ${format(
    endDate,
    "MMM dd yyyy"
  )}`;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "EUR" }).format(
    value
  );
