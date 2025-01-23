import { formatDistanceToNow } from "date-fns";

export const formatTimeAgo = (date) => {
  const now = new Date();
  const targetDate = new Date(date);

  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return "Less than a minute ago";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return formatDistanceToNow(targetDate, { addSuffix: true });
  }
};
