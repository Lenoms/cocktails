export const mapToColour = (option) => {
  switch (option) {
    case "summer":
      return "#fffbc2";
    case "favourite":
      return "#ffc7f5";
    case "try again":
      return "#b6f0bb";
    case "strong":
      return "#ff4053";
    case "dessert":
      return "#e6b0ff";
    case "aesthetic":
      return "#fcb083";
  }
  return "#8ff6f7";
};

export const tagOptions = [
  { label: "summer", value: "summer", color: mapToColour("summer") },
  { label: "favourite", value: "favourite", color: mapToColour("favourite") },
  { label: "try again", value: "try again", color: mapToColour("try again") },
  { label: "strong", value: "strong", color: mapToColour("strong") },
  { label: "dessert", value: "dessert", color: mapToColour("dessert") },
  { label: "aesthetic", value: "aesthetic", color: mapToColour("aesthetic") },
];
