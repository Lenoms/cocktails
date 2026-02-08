const WrappedService = {
  printWrappedStats: function (data) {
    // Filter cocktails from 2025
    const cocktails2025 = data.filter((cocktail) => {
      if (!cocktail.createdAt) return false;
      const year = cocktail.createdAt.substring(0, 4);
      return year === "2025";
    });

    // Top 5 by Dani grade
    const top5Dani = cocktails2025
      .filter((c) => c.daniGrade)
      .sort((a, b) => parseInt(b.daniGrade) - parseInt(a.daniGrade))
      .slice(0, 8);

    // Top 5 by Daniel grade
    const top5Daniel = cocktails2025
      .filter((c) => c.danielGrade)
      .sort((a, b) => parseInt(b.danielGrade) - parseInt(a.danielGrade))
      .slice(0, 8);

    // Top 5 by overall grade (average)
    const top5Overall = cocktails2025
      .sort(
        (a, b) =>
          (parseInt(b.danielGrade) ?? 0) +
          (parseInt(b.daniGrade) ?? 0) -
          (parseInt(a.danielGrade) ?? 0) -
          (parseInt(a.daniGrade) ?? 0)
      )
      .slice(0, 5);

    console.log("===== 2025 WRAPPED STATS =====");
    console.log(`Number of cocktails in 2025: ${cocktails2025.length}`);
    console.log("");

    // Calculate averages for 2025
    const daniGrades = cocktails2025
      .filter((c) => c.daniGrade)
      .map((c) => parseInt(c.daniGrade));
    const danielGrades = cocktails2025
      .filter((c) => c.danielGrade)
      .map((c) => parseInt(c.danielGrade));
    const overallGrades = cocktails2025
      .filter((c) => c.daniGrade && c.danielGrade)
      .map((c) => (parseInt(c.danielGrade) + parseInt(c.daniGrade)) / 2);

    const daniAverage = (
      daniGrades.reduce((a, b) => a + b, 0) / daniGrades.length
    ).toFixed(2);
    const danielAverage = (
      danielGrades.reduce((a, b) => a + b, 0) / danielGrades.length
    ).toFixed(2);
    const overallAverage = (
      overallGrades.reduce((a, b) => a + b, 0) / overallGrades.length
    ).toFixed(2);

    console.log("2025 AVERAGES:");
    console.log(`  Dani Average: ${daniAverage}`);
    console.log(`  Daniel Average: ${danielAverage}`);
    console.log(`  Overall Average: ${overallAverage}`);
    console.log("");

    console.log("TOP 5 - Dani's Ratings:");
    top5Dani.forEach((c, i) =>
      console.log(`  ${i + 1}. ${c.name} (${c.daniGrade})`)
    );
    console.log("");

    console.log("TOP 5 - Daniel's Ratings:");
    top5Daniel.forEach((c, i) =>
      console.log(`  ${i + 1}. ${c.name} (${c.danielGrade})`)
    );
    console.log("");

    console.log("TOP 5 - Overall Average:");
    top5Overall.forEach((c, i) =>
      console.log(
        `  ${i + 1}. ${c.name} (${
          (parseInt(c.danielGrade) + parseInt(c.daniGrade)) / 2
        })`
      )
    );
    console.log("");

    // Find lowest overall score
    const lowestOverall = cocktails2025
      .filter((c) => c.daniGrade && c.danielGrade)
      .sort(
        (a, b) =>
          (parseInt(a.danielGrade) + parseInt(a.daniGrade)) / 2 -
          (parseInt(b.danielGrade) + parseInt(b.daniGrade)) / 2
      )
      .slice(0, 1)[0];

    if (lowestOverall) {
      const lowestOverallScore =
        (parseInt(lowestOverall.danielGrade) +
          parseInt(lowestOverall.daniGrade)) /
        2;

      console.log("LOWEST OVERALL SCORE:");
      console.log(`  ${lowestOverall.name} (${lowestOverallScore.toFixed(2)})`);
      console.log("");
    }

    // Count spirits in cocktails
    const spirits = ["gin", "whiskey", "rum", "tequila", "vodka", "mezcal"];
    const spiritCounts = {};

    spirits.forEach((spirit) => {
      spiritCounts[spirit] = 0;
    });

    cocktails2025.forEach((cocktail) => {
      if (
        cocktail.versions[0].ingredients &&
        Array.isArray(cocktail.versions[0].ingredients)
      ) {
        const ingredientsLower = cocktail.versions[0].ingredients
          .map((i) => i.toLowerCase())
          .join(" ");

        spirits.forEach((spirit) => {
          if (ingredientsLower.includes(spirit)) {
            spiritCounts[spirit]++;
          }
        });
      }
    });

    console.log("MOST COMMON SPIRITS:");
    spirits.forEach((spirit) => {
      console.log(`  ${spirit}: ${spiritCounts[spirit]} drinks`);
    });
    console.log("");

    console.log("==============================");
  },
};

export default WrappedService;
