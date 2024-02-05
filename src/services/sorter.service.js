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
  let sortedData = data.sort((a, b) =>
    a.cocktailName > b.cocktailName ? 1 : -1
  );
  return sortedData;
}

function sortByOverallGrade(data) {
  let sortedData = data.sort((a, b) => {
    const overallA = getOverall(a);
    const overallB = getOverall(b);

    return overallA < overallB ? 1 : -1;
  });
  return sortedData;
}

function getOverall(cocktail) {
  const overallValue = CocktailService.calculateAverageGrade(
    parseInt(cocktail.danielGrade),
    parseInt(cocktail.daniGrade)
  );

  return isNaN(overallValue) ? 0 : overallValue;
}

function sortByDanielGrade(data) {
  let sortedData = data.sort((a, b) => {
    const gradeA = parseInt(a.danielGrade);
    const gradeB = parseInt(b.danielGrade);

    if (isNaN(gradeA) || a.danielGrade === null) {
      return 1; // Move a to the end
    } else if (isNaN(gradeB) || b.danielGrade === null) {
      return -1; // Move b to the end
    } else {
      return gradeA < gradeB ? 1 : -1;
    }
  });

  return sortedData;
}

function sortByDaniGrade(data) {
  let sortedData = data.sort((a, b) => {
    const gradeA = parseInt(a.daniGrade);
    const gradeB = parseInt(b.daniGrade);

    if (isNaN(gradeA) || a.daniGrade === null) {
      return 1; // Move a to the end
    } else if (isNaN(gradeB) || b.daniGrade === null) {
      return -1; // Move b to the end
    } else {
      return gradeA < gradeB ? 1 : -1;
    }
  });

  return sortedData;
}

function sortByDateCreated(data) {
  let sortedData = data.sort((a, b) =>
    parseInt(a.date[0]) < parseInt(b.date[0]) ? 1 : -1
  );
  return sortedData;
}
