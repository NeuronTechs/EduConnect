export const convertTimestampToDateTime = () => {
  const dateNow = new Date();
  const updatedAt: string = dateNow
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return updatedAt;
};
