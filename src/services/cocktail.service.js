import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";

const API_URL =
  "https://s8zmac6xjl.execute-api.ap-southeast-2.amazonaws.com/prod/cocktails";

const CocktailService = {
  fetchCocktails: async function (isTried) {
    const url = `${API_URL}?tried=${isTried}`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      return data.items;
    } catch (err) {
      console.error("Error fetching cocktails:", err);
      return [];
    }
  },
  saveCocktail: async function (cocktail) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cocktail),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Cocktail saved:", data);
      return data;
    } catch (error) {
      console.error("Error saving cocktail:", error);
    }
  },
  deleteCocktail: async function (cocktailId) {
    try {
      const response = await fetch(`${API_URL}/${cocktailId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete cocktail");
      }

      return await response.json(); // maybe return { success: true } or the deleted item
    } catch (err) {
      console.error("Error deleting cocktail:", err);
      throw err;
    }
  },

  uploadImage: function (event, setProgresspercent, setImgUrl, setIsUploading) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${event.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setIsUploading(false);
        });
      }
    );
  },
  printAnalytics: function (data) {
    let danielSum = 0;
    let daniSum = 0;
    let danielDrinksNotTriedCount = 0;
    let daniDrinksNotTriedCount = 0;
    for (let i = 0; i < data.length; i++) {
      if (!data[i].danielGrade) {
        danielDrinksNotTriedCount += 1;
      }
      if (!data[i].daniGrade) {
        daniDrinksNotTriedCount += 1;
      }
      danielSum += data[i].danielGrade ? parseInt(data[i].danielGrade) : 0;
      daniSum += data[i].daniGrade ? parseInt(data[i].daniGrade) : 0;
    }

    console.log(daniDrinksNotTriedCount, danielDrinksNotTriedCount);

    console.log(`TOTAL COCKTAILS: ${data.length} `);

    const averageCocktailGrade = (
      (danielSum + daniSum) /
      (data.length * 2 - danielDrinksNotTriedCount - daniDrinksNotTriedCount)
    ).toPrecision(4);

    console.log(`Average Cocktail Grade: ${averageCocktailGrade}`);

    console.log(
      `Daniel Total Grade: ${danielSum}, Average: ${(
        danielSum /
        (data.length - danielDrinksNotTriedCount)
      ).toPrecision(4)}`
    );

    console.log(
      `Dani Total Grade: ${daniSum}, Average: ${(
        daniSum /
        (data.length - daniDrinksNotTriedCount)
      ).toPrecision(4)}`
    );
  },
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
      .slice(0, 5);

    // Top 5 by Daniel grade
    const top5Daniel = cocktails2025
      .filter((c) => c.danielGrade)
      .sort((a, b) => parseInt(b.danielGrade) - parseInt(a.danielGrade))
      .slice(0, 5);

    // Top 5 by overall grade (average)
    const top5Overall = cocktails2025
      .map((c) => ({
        ...c,
        average:
          (parseInt(c.danielGrade) || 0 + parseInt(c.daniGrade) || 0) / 2,
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 5);

    console.log("===== 2025 WRAPPED STATS =====");
    console.log(`Number of cocktails in 2025: ${cocktails2025.length}`);
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
      console.log(`  ${i + 1}. ${c.name} (${c.average.toPrecision(3)})`)
    );
    console.log("");

    console.log("==============================");
  },
  calculateAverageGrade: function (danielGrade, daniGrade) {
    if (
      (danielGrade === null || isNaN(danielGrade)) &&
      (daniGrade === null || isNaN(daniGrade))
    ) {
      return "N/A";
    } else if (danielGrade === null || isNaN(danielGrade)) {
      return daniGrade;
    } else if (daniGrade === null || isNaN(daniGrade)) {
      return danielGrade;
    } else {
      return (danielGrade + daniGrade) / 2;
    }
  },
  getNonAmericanDateString: function (date) {
    const dateParts = date.split("/");
    return `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;
  },
};

export default CocktailService;
