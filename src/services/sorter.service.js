import CocktailService from "./cocktail.service";

export function sortList(data, sortBy) {
  if (sortBy == "Alphabetical") {
    return sortByAlphabetical(data);
  } else if (sortBy == "Overall Grade") {
    return sortByOverallGrade(data);
  } else if (sortBy == "Daniel Grade") {
    return sortByDanielGrade(data);
  } else if (sortBy == "Dani Grade") {
    return sortByDaniGrade(data);
  } else if (sortBy == "Date Created") {
    return sortByDateCreated(data);
  }
}

function sortByAlphabetical(data) {
  return [...data].sort((a, b) => (a.name > b.name ? 1 : -1));
}

function sortByOverallGrade(data) {
  return [...data].sort((a, b) => {
    const overallA = getOverall(a);
    const overallB = getOverall(b);

    return overallA < overallB ? 1 : -1;
  });
}

function sortByDanielGrade(data) {
  return [...data].sort((a, b) => {
    const gradeA = parseInt(a.danielGrade);
    const gradeB = parseInt(b.danielGrade);

    if (isNaN(gradeA) || a.danielGrade === null) return 1;
    if (isNaN(gradeB) || b.danielGrade === null) return -1;

    return gradeA < gradeB ? 1 : -1;
  });
}

function sortByDaniGrade(data) {
  return [...data].sort((a, b) => {
    const gradeA = parseInt(a.daniGrade);
    const gradeB = parseInt(b.daniGrade);

    if (isNaN(gradeA) || a.daniGrade === null) return 1;
    if (isNaN(gradeB) || b.daniGrade === null) return -1;

    return gradeA < gradeB ? 1 : -1;
  });
}

function sortByDateCreated(data) {
  return [...data].sort((a, b) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();

    return timeB - timeA;
  });
}

function getOverall(cocktail) {
  const overallValue = CocktailService.calculateAverageGrade(
    parseInt(cocktail.danielGrade),
    parseInt(cocktail.daniGrade)
  );

  return isNaN(overallValue) ? 0 : overallValue;
}
