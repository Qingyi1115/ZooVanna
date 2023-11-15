import moment from "moment-timezone";

export function convertTo12HourFormat(time24: string) {
  const [hour, minute] = time24.split(":").map(Number);

  let period = "AM";
  let hour12 = hour;

  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour12 = hour - 12;
    }
  }

  if (hour === 0) {
    hour12 = 12; // Midnight (00:00) is represented as 12 AM
  }

  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
}

export function convertUtcToTimezone(
  utcDate: Date,
  targetTimezone: string,
): string {
  const utcMoment = moment.utc(utcDate);
  const targetMoment = utcMoment.tz(targetTimezone);
  const formattedTime: string = targetMoment.format("DD MMM YYYY");
  // const timestampWithSuffix: string = `${formattedTime} SGT`;
  // return timestampWithSuffix;
  return formattedTime;
}
