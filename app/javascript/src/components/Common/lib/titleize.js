export const titleize = text => {
  const textWords = text.replace(/_/g, " ").split(" ");
  let newTextArr = [];
  for (let i = 0; i < textWords.length; ++i) {
    newTextArr.push(
      textWords[i].charAt(0).toUpperCase() + textWords[i].toLowerCase().slice(1)
    );
  }
  return newTextArr.join(" ");
};
