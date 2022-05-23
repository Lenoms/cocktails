export function sortList(data, sortBy) {
  if (sortBy == "Alphabetical") {
    return sortByAlphabetical(data);
  } else if (sortBy == "Overall Grade") {
    return sortByOverallGrade(data);
  } else if (sortBy == "Daniel Grade") {
    return sortByDanielGrade(data);
  } else if (sortBy == "Dani Grade") {
    return sortByDaniGrade(data);
  }
}

function sortByAlphabetical(data) {
  let sortedData = data.sort((a, b) =>
    a.cocktailName > b.cocktailName ? 1 : -1
  );
  return sortedData;
}

function sortByOverallGrade(data) {
  let sortedData = data.sort((a, b) =>
    getOverall(a) < getOverall(b) ? 1 : -1
  );
  return sortedData;
}

function getOverall(cocktail) {
  let danielGrade = cocktail.danielGrade;
  let daniGrade = cocktail.daniGrade;
  let overallGrade = (parseInt(daniGrade) + parseInt(danielGrade)) / 2;
  console.log(cocktail.cocktailName, overallGrade);
  return overallGrade;
}

function sortByDanielGrade(data) {
  let sortedData = data.sort((a, b) =>
    parseInt(a.danielGrade) < parseInt(b.danielGrade) ? 1 : -1
  );
  return sortedData;
}

function sortByDaniGrade(data) {
  let sortedData = data.sort((a, b) =>
    parseInt(a.daniGrade) < parseInt(b.daniGrade) ? 1 : -1
  );
  return sortedData;
}
