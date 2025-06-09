// This script runs in the Mongo shell, not Node.js!

const adminDb = db.getSiblingDB("admin");

// Authenticate as root (if needed)
adminDb.auth(
  _getEnv("MONGO_INITDB_ROOT_USERNAME"),
  _getEnv("MONGO_INITDB_ROOT_PASSWORD")
);

const appDb = db.getSiblingDB("star-core");
appDb.createUser({
  user: _getEnv("MONGO_APP_USER"),
  pwd: _getEnv("MONGO_APP_PASS"),
  roles: [
    { role: "readWrite", db: "star-core" },
    { role: "dbAdmin", db: "star-core" }
  ]
});

print("✅ MongoDB initialization complete");

// Helper to get env vars in Mongo shell init scripts
function _getEnv(name) {
  return (typeof _getEnv !== "undefined" && _getEnv[name]) || (typeof process !== "undefined" && process.env && process.env[name]) || "";
}

// const db = require('./src/config/db');
// require('dotenv').config({ path: './.env' });

// const initMongoDB = () => {
//   const env = {
//     MONGO_INITDB_ROOT_USERNAME:  process.env.MONGO_ROOT_USER,
//     MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_ROOT_PASSWORD,
//   };
//   process.env.MONGO_APP_USER;
// process.env.MONGO_APP_PASS;
//   const adminDb = db.getSiblingDB("admin");
//   adminDb.auth(env.MONGO_INITDB_ROOT_USERNAME, env.MONGO_INITDB_ROOT_PASSWORD);
//   const appDb = db.getSiblingDB("star-core");
//   appDb.createUser({
//     user: process.env.MONGO_APP_USER,
//     pwd: process.env.MONGO_APP_PASS,
//     roles: [
//       { role: "readWrite", db: "star-core" },
//       { role: "dbAdmin", db: "star-core" }
//     ]
//   });
// //   const products = [
// //     { name: "Starter Kit", sku: "SKU-001", price: 49.99, category: "kits" },
// //     { name: "Pro Bundle", sku: "SKU-002", price: 99.99, category: "kits" },
// //     { name: "Battery Pack", sku: "SKU-101", price: 19.99, category: "accessories" }
// //   ];
// //   appDb.products.insertMany(products);
// //   appDb.products.createIndex({ sku: 1 }, { unique: true });
// //   appDb.products.createIndex({ category: 1 });
//   console.log("✅ MongoDB initialization complete");
// //   print(`📦 Inserted ${products.length} sample products`);
// };

// try {
//   initMongoDB();
// } catch (error) {
//   print(`❌ Initialization failed: ${error}`);
//   quit(1);
// }