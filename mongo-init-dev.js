
// // This script runs in the Mongo shell, not Node.js!

// const adminDb = db.getSiblingDB("admin");

// // Authenticate as root (if needed)
// adminDb.auth(
//   _getEnv("MONGO_INITDB_ROOT_USERNAME"),
//   _getEnv("MONGO_INITDB_ROOT_PASSWORD")
// );

// const appDb = db.getSiblingDB("star-core");
// appDb.createUser({
//   user: _getEnv("MONGO_APP_USER"),
//   pwd: _getEnv("MONGO_APP_PASS"),
//   roles: [
//     { role: "readWrite", db: "star-core" },
//     { role: "dbAdmin", db: "star-core" }
//   ]
// });

// print("✅ MongoDB initialization complete");

// // Helper to get env vars in Mongo shell init scripts
// function _getEnv(name) {
//   return (typeof _getEnv !== "undefined" && _getEnv[name]) || (typeof process !== "undefined" && process.env && process.env[name]) || "";
// }

// init-mongo.js
const rootUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const rootPass = process.env.MONGO_INITDB_ROOT_PASSWORD;
const appUser = process.env.MONGO_APP_USER;
const appPass = process.env.MONGO_APP_PASS;

if (!appUser || !appPass) {
  print("❌ ERROR: MONGO_APP_USER or MONGO_APP_PASS not set");
  quit(1);
}

const adminDb = db.getSiblingDB("admin");
adminDb.auth(rootUser, rootPass);

db.getSiblingDB("star-core").createUser({
  user: 'starcoreuser',
  pwd: 'startCore',
  roles: ["readWrite"]
});

print(`✅ Created app user: ${appUser}`);