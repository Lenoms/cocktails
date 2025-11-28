const locationsWithNoIcon = ["/info", "/create", "/update"];

export const locationShouldShowCocktailIcon = (location) => {
  return !locationsWithNoIcon.includes(location.pathname);
};
