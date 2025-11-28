export function formatPrettyDate(isoString) {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const suffix = getDaySuffix(day);

  return `${month} ${day}${suffix}, ${year}`;
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return "th"; // special rule for 11,12,13
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
