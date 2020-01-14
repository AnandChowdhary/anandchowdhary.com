const { readFile } = require("fs-extra");
const { join } = require("path");
const recursiveReaddir = require("recursive-readdir");
const frontMatter = require("front-matter");

const getTags = async () => {
  const tags = new Set();
  const contentFiles = await recursiveReaddir(
    join(__dirname, "..", "content", "blog")
  );
  for await (const file of contentFiles) {
    const fileContents = (await readFile(file)).toString();
    const fileAttributes = frontMatter(fileContents).attributes;
    ([fileAttributes.tags].flat() || []).forEach(tag => tags.add(tag));
  }
  return Array.from(tags).filter(i => i);
};
