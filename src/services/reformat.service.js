import {
  getDatabase,
  ref as databaseRef,
  remove,
  set,
  get,
  child,
} from "firebase/database";

export function reformatAllTried(cocktails) {
  for (let i = 0; i < cocktails.length; i++) {
    reformatTried(cocktails[i]);
  }
}

export function reformatTried(cocktail) {
  const db = getDatabase();
  console.log("Reformatting: ", cocktail.cocktailName);
  if (cocktail.versions) {
    console.log("Already reformatted!");
    return;
  }
  const versions = [
    {
      imgUrl: cocktail.image ?? null,
      ingredients: cocktail.ingredients ?? null,
      name: "Version 1",
      notes: cocktail.cocktailNotes ?? null,
      versionId: crypto.randomUUID(),
    },
  ];
  console.log("New versions: ", versions);
  set(databaseRef(db, "cocktails/tried/" + cocktail.cocktailName), {
    cocktailName: cocktail.cocktailName,
    danielGrade: cocktail.danielGrade ?? null,
    daniGrade: cocktail.daniGrade ?? null,
    versions: versions,
    date: cocktail.date,
    dateModified: cocktail.dateModified ?? null,
    tags: cocktail.tags ?? null,
  });
  console.log("Successfully reformatted: ", cocktail.cocktailName);
}

export function reformatUntried(cocktail) {
  const db = getDatabase();
  console.log("Reformatting: ", cocktail.cocktailName);
  if (cocktail.versions) {
    console.log("Already reformatted!");
    return;
  }
  const versions = [
    {
      ingredients: cocktail.ingredients ?? null,
      name: "Version 1",
      notes: cocktail.cocktailNotes ?? null,
      versionId: crypto.randomUUID(),
    },
  ];
  console.log("New versions: ", versions);
  const noSpecialCharactersKey = cocktail.cocktailName.replace(
    /[.$#[\]/]/g,
    ""
  );
  if (noSpecialCharactersKey.length == 0) return;
  set(databaseRef(db, "cocktails/untried/" + noSpecialCharactersKey), {
    cocktailName: cocktail.cocktailName,
    versions: versions,
  });
  console.log("Successfully reformatted: ", cocktail.cocktailName);
}
