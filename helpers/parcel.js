const { readdir, copyFile, ensureDir, writeJson } = require("fs-extra");
const { join } = require("path");

const copyParcelJs = async () => {
  const files = await readdir(join(__dirname, "..", "dist"));
  const jsFile = files.filter(f => f.endsWith(".js"))[0];
  await ensureDir(join(__dirname, "..", "public", "assets", "scripts"));
  await copyFile(
    join(__dirname, "..", "dist", jsFile),
    join(__dirname, "..", "public", "assets", "scripts", jsFile)
  );
  try {
    await copyFile(
      join(__dirname, "..", "dist", `${jsFile}.map`),
      join(__dirname, "..", "public", "assets", "scripts", `${jsFile}.map`)
    );
  } catch (error) {}
  await writeJson(
    join(__dirname, "..", "content", "_data", "jsFilePath.json"),
    jsFile
  );
};

copyParcelJs()
  .then(() => console.log("Copied parcel JS"))
  .catch(error => console.log(error));
