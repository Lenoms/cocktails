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
