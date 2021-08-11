const { exec } = require("child_process");
console.info(
  "node env var ANGULAR_ENVIRONMENT_CONFIGURATION",
  process.env.ANGULAR_ENVIRONMENT_CONFIGURATION
);

let buildScript = "npm run build:staging:ssr";
if (process.env.ANGULAR_ENVIRONMENT_CONFIGURATION === "production") {
  buildScript = "npm run build:prod:ssr";
}
const child = exec(buildScript, function (err, stdout, stderr) {
  if (err) throw err;
  else console.info(stdout);
});

child.stdout.on("data", function (data) {
  process.stdout.write(data);
});

child.stderr.on("data", function (data) {
  process.stdout.write(data);
});

child.on("exit", function (data) {
  process.stdout.write("I'm done!");
});
