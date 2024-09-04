export const getCurrentDate = (): string => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return `${month}-${year}`;
};

export const formatCurrentMonth = (currentMonth: string): string => {
  const [month, year] = currentMonth.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return `${months[parseInt(month) - 1]} ${year}`;
};

export const formatDateTime = (dateString: string): string =>
  new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });

export const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString();
