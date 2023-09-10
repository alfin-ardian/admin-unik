export const capitalizeEachWord = (str: string) => {
  const startsWithSlash = str.startsWith("/");
  if (startsWithSlash) {
    str = str.substring(1);
  }

  const words = str.split("/");
  const capitalizedWords = words.map((word) => {
    if (word.length <= 1) {
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  const result = capitalizedWords.join(" / ");
  return result;
};
