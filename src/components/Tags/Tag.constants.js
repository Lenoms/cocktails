export const mapToColour = (option) => {
  switch (option) {
    case "summer":
      return "#fffbc2";
    case "favourite":
      return "#ffc7f5";
    case "retry":
      return "#b6f0bb";
    case "strong":
      return "#ff4053";
    case "dessert":
      return "#e6b0ff";
    case "aesthetic":
      return "#fcb083";
    case "herbaceous":
      return "#8BFFD7";
    case "original":
      return "#FFC0CB";
    case "tiki":
      return "#ff9f43";
    case "halloween":
      return "#d35400";
    case "festive":
      return "linear-gradient(90deg,rgba(255, 122, 122, 1) 0%, rgba(125, 255, 179, 1) 100%)";
  }
  return "#8ff6f7";
};

export const tagOptions = [
  { label: "summer", value: "summer", color: mapToColour("summer") },
  { label: "favourite", value: "favourite", color: mapToColour("favourite") },
  { label: "retry", value: "retry", color: mapToColour("retry") },
  { label: "strong", value: "strong", color: mapToColour("strong") },
  { label: "dessert", value: "dessert", color: mapToColour("dessert") },
  { label: "aesthetic", value: "aesthetic", color: mapToColour("aesthetic") },
  {
    label: "herbaceous",
    value: "herbaceous",
    color: mapToColour("herbaceous"),
  },
  { label: "original", value: "original", color: mapToColour("original") },
  { label: "tiki", value: "tiki", color: mapToColour("tiki") },
  { label: "halloween", value: "halloween", color: mapToColour("halloween") },
  { label: "festive", value: "festive", color: mapToColour("festive") },
];

export const christmasLightsColours = [
  "red",
  "green",
  "yellow",
  "blue",
  "purple",
  "orange",
  "pink",
];
