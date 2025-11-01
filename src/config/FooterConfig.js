const locationsWithNoIcon = ["/info", "/create", "/update", "/filter"];

export const locationShouldShowCocktailIcon = (location) => {
  return !locationsWithNoIcon.includes(location.pathname);
};
