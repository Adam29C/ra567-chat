import { format, formatDistanceToNow } from "date-fns";

export const formatWhatsAppDate = (unixTimestamp) => {
  // Convert Unix timestamp to milliseconds if needed
  if (unixTimestamp.toString().length === 10) {
    unixTimestamp *= 1000; // Convert seconds to milliseconds
  }

  const now = new Date();
  const date = new Date(unixTimestamp);

  // console.log("date" ,date);

  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  const dayOptions = { weekday: 'long' };
  const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

  // Check if today
  if (now.toDateString() === date.toDateString()) {
    return date.toLocaleTimeString('en-US', options); // Show time if today
  }

  // Get start of the week (Monday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday = 0

  // Get end of the week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Check if in the same week
  if (date >= startOfWeek && date <= endOfWeek) {
    return date.toLocaleDateString('en-US', dayOptions);
  }

  // If older, show full date
  return date.toLocaleDateString('en-GB', dateOptions);
};

export const changeDateFormat = (dateString) => {
  const [month, day, year] = dateString.split('/');

  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  return formattedDate;
};


export function Get_Year_With_Time(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm:ss");
}


export function Get_Year_With_Time_With_Column_Saprate(date) {
  return format(new Date(date), "dd:MM:yyyy hh:mm:ss a");
}