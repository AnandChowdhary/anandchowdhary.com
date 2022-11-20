export const humanizeMmSs = (duration: string) => {
  const [minutes] = duration.split(":").map(parseInt);
  return `${
    minutes
      ? minutes === 1
        ? "1 minute"
        : `${minutes.toLocaleString("en-US")} minutes`
      : "Less than 1 minute"
  }`;
};

export const countryName = (countryName: string) =>
  countryName === "United States of America"
    ? "United States"
    : countryName === "Netherlands"
    ? "The Netherlands"
    : countryName;
