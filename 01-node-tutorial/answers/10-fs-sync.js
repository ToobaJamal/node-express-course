const fs = require("fs");

const tempFilePath = "../temporary/fileA.txt"

firstLine = fs.writeFileSync(tempFilePath, "My first line");
fs.writeFileSync(tempFilePath, "Second line", { flag: "a+" });
fs.writeFileSync(tempFilePath, "Third line", { flag: "a+" });

const fileContents = fs.readFileSync(tempFilePath, { encoding: "utf-8" });
console.log('fileContents: ' + fileContents);
