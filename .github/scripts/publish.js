const { readFileSync, writeFileSync } = require("fs");
const { execSync } = require("child_process");

const package = JSON.parse(readFileSync("package.json").toString());

if (!process.argv[2])
  throw new Error("You must supply branch as the first argument.");

const branch = process.argv[2].split("/").pop();

const commits = execSync("git rev-list --all --count")
  .toString()
  .trim();

package.version = `${package.version}-${branch}.${commits}`;

writeFileSync("package.json", JSON.stringify(package));
