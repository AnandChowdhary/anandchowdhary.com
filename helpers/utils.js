const trim = (s, mask) => {
  while (~mask.indexOf(s[0]))
    s = s.slice(1);
  while (~mask.indexOf(s[s.length - 1]))
    s = s.slice(0, -1);
  return s;
}

const titleify = value =>
  (value || "")
    .replace(/-/g, " ")
    .replace(/\//g, " ")
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ")
    .replace(/ The/g, " the")
    .replace(/ Of/g, " of")
    .replace("Sf", "SF");

module.exports = { trim, titleify };
