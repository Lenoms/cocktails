import CocktailService from "./cocktail.service.js";

export async function migrateCocktailData() {
  const data = await CocktailService.getUntriedCocktails();
  const cocktailList = Object.values(data);

  console.log(`Starting migration of ${cocktailList.length} cocktails...`);

  for (const cocktail of cocktailList) {
    await reformatUntried(cocktail);
    await sleep(70); // wait 70ms between writes
  }

  console.log("Migration complete!");
}

async function reformatUntried(cocktail) {
  console.log("Reformatting:", cocktail.cocktailName);

  const result = await CocktailService.saveCocktail({
    isTried: false,
    name: cocktail.cocktailName,
    versions: cocktail.versions,
    tags: cocktail.tags ?? [],
  });

  console.log("Saved:", cocktail.cocktailName, "→", result);
}

async function reformatTried(cocktail) {
  console.log("Reformatting:", cocktail.cocktailName);

  const createdDate = new Date(cocktail.date[1]).toISOString();
  console.log("Created Date:", createdDate);

  const result = await CocktailService.saveCocktail({
    isTried: true,
    name: cocktail.cocktailName,
    danielGrade: cocktail.danielGrade ?? null,
    daniGrade: cocktail.daniGrade ?? null,
    versions: cocktail.versions,
    tags: cocktail.tags ?? [],
    createdAt: createdDate,
  });

  console.log("Saved:", cocktail.cocktailName, "→", result);
}

// small helper
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
