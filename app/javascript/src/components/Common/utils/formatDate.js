import moment from "moment";

export const formatDate = date => {
  return date ? moment(date).format("D MMMM, YYYY") : "-";
};
