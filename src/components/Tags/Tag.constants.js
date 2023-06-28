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
];
