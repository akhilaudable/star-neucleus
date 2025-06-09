
const db = require('src/config/db');


const initMongoDB = () => {
  const env = {
    MONGO_INITDB_ROOT_USERNAME:  process.env.MONGO_ROOT_USER || "app_user",
    MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_ROOT_USER || "app_pass"
  };
  const adminDb = db.getSiblingDB("admin");
  adminDb.auth(env.MONGO_INITDB_ROOT_USERNAME, env.MONGO_INITDB_ROOT_PASSWORD);
  const appDb = db.getSiblingDB("star-core");
  appDb.createUser({
    user: "app_user",
    pwd: "app_pass",
    roles: [
      { role: "readWrite", db: "star-core" },
      { role: "dbAdmin", db: "star-core" }
    ]
  });
//   const products = [
//     { name: "Starter Kit", sku: "SKU-001", price: 49.99, category: "kits" },
//     { name: "Pro Bundle", sku: "SKU-002", price: 99.99, category: "kits" },
//     { name: "Battery Pack", sku: "SKU-101", price: 19.99, category: "accessories" }
//   ];
//   appDb.products.insertMany(products);
//   appDb.products.createIndex({ sku: 1 }, { unique: true });
//   appDb.products.createIndex({ category: 1 });
  print("✅ MongoDB initialization complete");
//   print(`📦 Inserted ${products.length} sample products`);
};

try {
  initMongoDB();
} catch (error) {
  print(`❌ Initialization failed: ${error}`);
  quit(1);
}