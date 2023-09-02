const locationsWithNoIcon = [
  "/cocktails/info",
  "/cocktails/create",
  "/cocktails/update",
  "/cocktails/filter",
];

export const locationShouldShowCocktailIcon = (location) => {
  return !locationsWithNoIcon.includes(location.pathname);
};
