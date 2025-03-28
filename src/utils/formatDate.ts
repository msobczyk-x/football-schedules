import moment from "moment";
export const formatDate = (date: Date) => moment(date).format("YYYY-MM-DD");

export const formatDateTime = (date: Date) =>
  moment(date).format("YYYY-MM-DD HH:mm:ss");
