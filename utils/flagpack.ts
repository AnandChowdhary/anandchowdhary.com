export const getFlagUrl = (countryCode: string) => {
  if (countryCode.toLocaleUpperCase() === "GB") countryCode = "GB-UKM";
  return `https://cdn.jsdelivr.net/gh/Yummygum/flagpack-core@v2.0.0/svg/m/${(
    countryCode ?? ""
  ).toUpperCase()}.svg`;
};
