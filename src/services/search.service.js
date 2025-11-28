export function searchQueryMatch(query, cocktail) {
  const q = normalize(query);
  if (!q) return true;

  // -------- Name match --------
  if (includes(q, cocktail.name)) {
    return true;
  }

  // -------- Ingredient match --------
  const ingredients =
    cocktail?.versions?.flatMap((v) => v.ingredients || []).filter(Boolean) ||
    [];

  for (const ing of ingredients) {
    if (ingredientMatch(q, ing)) return true;
  }

  // -------- Tag match --------
  const tags = cocktail.tags || [];
  for (const t of tags) {
    if (normalize(t) === q) return true; // exact match
    if (includes(q, t)) return true; // partial match
  }

  return false;
}

function normalize(str) {
  return str?.toLowerCase().trim() ?? "";
}

function includes(query, value) {
  return normalize(value).includes(normalize(query));
}

function ingredientMatch(query, ingredient) {
  const q = normalize(query);
  const ing = normalize(ingredient);

  return ing.includes(q) || ing.split(" ").some((word) => word === q);
}
