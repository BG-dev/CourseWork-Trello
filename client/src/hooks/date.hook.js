const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const useDate = (dateAndTime) => {
  const date = dateAndTime.split(",");
  const dateValues = date[0].split(".");
  const month = months[dateValues[1] - 1];
  const resultDate = `${dateValues[0]} ${month} ${dateValues[2]}`;
  return resultDate;
};

export default useDate;
