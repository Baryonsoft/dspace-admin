// get sentry release version and export to SENTRY_RELEASE
// run this script:
// export SENTRY_RELEASE=$(node ./scripts/get-sentry-release.js --prod)

const pkg = require("../package.json");

const arg = process.argv[2];
let sentry_release = `baryonics-dashboard@${pkg.version}`;

switch (arg) {
  case "--prod":
    if (sentry_release.includes("beta")) sentry_release = "";
    break;
  case "--beta":
    if (!sentry_release.includes("beta")) sentry_release = "";
    break;
  default:
    break;
}

console.log(sentry_release);
