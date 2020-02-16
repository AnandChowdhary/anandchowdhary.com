const { readFile, writeJson, readJSON } = require("fs-extra");
const { join } = require("path");
const recursiveReaddir = require("recursive-readdir");
const frontMatter = require("front-matter");
const { getMdDescription, titleify } = require("./utils");

const trim = (s, mask) => {
  while (~mask.indexOf(s[0])) s = s.slice(1);
  while (~mask.indexOf(s[s.length - 1])) s = s.slice(0, -1);
  return s;
};

const generateBlogTags = async () => {
  const tags = new Set();
  const contentFiles = await recursiveReaddir(
    join(__dirname, "..", "content", "blog")
  );
  for await (const file of contentFiles) {
    const fileContents = (await readFile(file)).toString();
    const fileAttributes = frontMatter(fileContents).attributes;
    ([fileAttributes.tags].flat() || []).forEach(tag => {
      if (tag !== "blog") tags.add(tag);
    });
  }
  const blogTags = Array.from(tags).filter(i => i);
  await writeJson(
    join(__dirname, "..", "content", "_data", "blogTags.json"),
    blogTags
  );
};

const generateEventRolesTags = async () => {
  const roles = new Set();
  const contentFiles = await recursiveReaddir(
    join(__dirname, "..", "content", "events")
  );
  for await (const file of contentFiles) {
    const fileContents = (await readFile(file)).toString();
    const fileAttributes = frontMatter(fileContents).attributes;
    ([fileAttributes.roles].flat() || []).forEach(tag => roles.add(tag));
  }
  const eventRolesTags = Array.from(roles).filter(i => i);
  await writeJson(
    join(__dirname, "..", "content", "_data", "eventRolesTags.json"),
    eventRolesTags
  );
};

const generateProjectTags = async () => {
  const work = new Set();
  const stack = new Set();
  const tools = new Set();
  const collaborators = new Set();
  const contentFiles = await recursiveReaddir(
    join(__dirname, "..", "content", "projects")
  );
  for await (const file of contentFiles) {
    const fileContents = (await readFile(file)).toString();
    const fileAttributes = frontMatter(fileContents).attributes;
    ([fileAttributes.work].flat() || []).forEach(tag => work.add(tag));
    ([fileAttributes.stack].flat() || []).forEach(tag => stack.add(tag));
    ([fileAttributes.tools].flat() || []).forEach(tag => tools.add(tag));
    ([fileAttributes.collaborators].flat() || []).forEach(tag =>
      collaborators.add(tag)
    );
  }
  const workTags = Array.from(work).filter(i => i);
  const stackTags = Array.from(stack).filter(i => i);
  const toolsTags = Array.from(tools).filter(i => i);
  const collaboratorsTags = Array.from(collaborators).filter(i => i);
  await writeJson(
    join(__dirname, "..", "content", "_data", "workTags.json"),
    workTags
  );
  await writeJson(
    join(__dirname, "..", "content", "_data", "stackTags.json"),
    stackTags
  );
  await writeJson(
    join(__dirname, "..", "content", "_data", "toolsTags.json"),
    toolsTags
  );
  await writeJson(
    join(__dirname, "..", "content", "_data", "collaboratorsTags.json"),
    collaboratorsTags
  );
};

const generatePlacesTags = async () => {
  const places = new Set();
  const contentFiles = await recursiveReaddir(join(__dirname, "..", "content"));
  for await (const file of contentFiles) {
    if (file.endsWith(".md")) {
      const fileContents = (await readFile(file)).toString();
      const fileAttributes = frontMatter(fileContents).attributes;
      ([fileAttributes.places].flat() || []).forEach(tag => places.add(tag));
    }
  }
  const highlights = await readJSON(
    join(__dirname, "..", "life-data", "instagram-highlights.json")
  );
  Object.keys(highlights).forEach(key => {
    places.add(
      trim(
        highlights[key].meta.title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, ""),
        "-"
      )
    );
  });
  const placesData = Array.from(places).filter(i => i);
  const placesObjects = [];
  for await (const slug of placesData) {
    const desc = getMdDescription(`life/travel/${slug}`);
    const flag = desc.flag;
    const title = desc.title || titleify(slug);
    const country = desc.country;
    placesObjects.push({
      title,
      slug,
      flag,
      country
    });
  }
  await writeJson(
    join(__dirname, "..", "content", "_data", "cities.json"),
    placesObjects
  );
};

generateBlogTags();
generateEventRolesTags();
generateProjectTags();
generatePlacesTags();
