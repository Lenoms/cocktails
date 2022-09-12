export function searchQueryMatch(searchQuery, cocktail) {
  if (searchQuery != undefined) {
    if (
      isSubString(
        searchQuery.trim().toLowerCase(),
        cocktail.cocktailName.toLowerCase()
      )
    ) {
      return true;
    }

    let ingredients = cocktail.ingredients;

    if (ingredients) {
      for (let i = 0; i < ingredients.length; i++) {
        if (checkIngredient(searchQuery, ingredients[i])) {
          return true;
        }
      }
    }

    return false;
  } else {
    return true;
  }
}

function isSubString(s1, s2) {
  var M = s1.length;
  var N = s2.length;

  /* A loop to slide pat[] one by one */
  for (var i = 0; i <= N - M; i++) {
    var j;

    /* For current index i, check for
 pattern match */
    for (j = 0; j < M; j++) if (s2[i + j] != s1[j]) break;

    if (j == M) return true;
  }

  return false;
}

function checkIngredient(searchQuery, ingredient) {
  // Check full ingredient
  if (searchQuery.toLowerCase() === ingredient.toLowerCase()) {
    return true;
  }

  // Split and check parts. This is to cover search terms like 'rum' returning for ingredients like 'white rum'
  ingredient = ingredient.split(" ");
  for (let j = 0; j < ingredient.length; j++) {
    if (searchQuery.toLowerCase() === ingredient[j].toLowerCase()) {
      return true;
    }
  }
  return false;
}
