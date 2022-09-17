export function hasUnownedIngredient(cocktail, unowned_list) {
  for (const ingredient of cocktail.ingredients) {
    const split_ingredient = ingredient.split(" ");
    for (let i = 0; i < split_ingredient.length; i++) {
      for (const unowned_ingredient of unowned_list) {
        if (
          unowned_ingredient.ingredient.toLowerCase() ==
          split_ingredient[i].toLowerCase()
        ) {
          return true;
        }
      }
    }
  }

  return false;
}
