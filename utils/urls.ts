export const getFlagUrl = (countryCode: string) => {
  if (countryCode.toLocaleUpperCase() === "GB") countryCode = "GB-UKM";
  return `https://cdn.jsdelivr.net/gh/Yummygum/flagpack-core@v2.0.0/svg/m/${(
    countryCode ?? ""
  ).toUpperCase()}.svg`;
};

export const imageUrl = (url: string, search: Record<string, string>) => {
  return `https://wsrv.nl/?url=${encodeURIComponent(
    url
  )}?maxage=1y&${new URLSearchParams(
    search
  ).toString()}&cacheBuster=1672578584751`;
};
