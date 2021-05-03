export const truncateText = (text, charLimit = 32, ellipsisText = "....") => {
  let truncateMessage = "";
  if (text.length > charLimit) {
    truncateMessage =
      text.substr(0, charLimit - ellipsisText.length) + ellipsisText;
  } else {
    truncateMessage = text;
  }
  return truncateMessage;
};
