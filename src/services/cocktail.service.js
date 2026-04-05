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
  uploadPendingVersionImages: async function (versionList) {
    return Promise.all(
      versionList.map(async (version) => {
        if (!version.imgFile) {
          const { imgFile, previewUrl, ...rest } = version;
          return rest;
        }

        const storage = getStorage();
        const storageRef = ref(storage, `images/${version.imgFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, version.imgFile);

        const downloadURL = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => resolve(url))
                .catch((uploadError) => reject(uploadError));
            },
          );
        });

        return {
          ...version,
          imgUrl: downloadURL,
          imgFile: undefined,
          previewUrl: undefined,
        };
      }),
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
      ).toPrecision(4)}`,
    );

    console.log(
      `Dani Total Grade: ${daniSum}, Average: ${(
        daniSum /
        (data.length - daniDrinksNotTriedCount)
      ).toPrecision(4)}`,
    );
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
