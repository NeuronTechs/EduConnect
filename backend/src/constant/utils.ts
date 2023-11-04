export const convertTimestampToDateTime = () => {
  const dateNow = new Date();
  const updatedAt: string = dateNow
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return updatedAt;
};

export const generateID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
