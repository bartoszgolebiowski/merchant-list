import dayjs from "dayjs";

export const FULL_FORMAT = "YYYY-MM-DD hh:mm:ss";

export const formatDate = (date: string | Date, format: string) => {
  return dayjs(date).format(format);
};
