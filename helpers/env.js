const { join } = require("path");
const { writeJsonSync } = require("fs-extra");

writeJsonSync(join(__dirname, "..", "content", "_data", "environment.json"), {
  NODE_ENV: process.env.NODE_ENV
});
