const fetchRandomWord = async () => {
  try {
    let fetchedWord = "";

    do {
      const response = await fetch(
        "https://random-word-api.vercel.app/api?words=1"
      );
      const data = await response.json();
      fetchedWord = data[0];
    } while (fetchedWord.length > 8);

    return fetchedWord;
  } catch (error) {
    console.error("Error fetching word:", error);
    return null;
  }
};

export default fetchRandomWord;
