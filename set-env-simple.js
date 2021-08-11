// get environment variables
// const fs = require("fs");
import fs from "fs";
const targetPath = "./src/environments/environment.ts";
const envConfigFile = `export const environment = {
     userName: '${process.env.userName}',
   production: '${process.env.PRODUCTION}'
};
`;
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      `Angular environment.ts file generated correctly at ${targetPath} \n`
    );
  }
});
