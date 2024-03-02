import { MongoClient } from "mongodb";

const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectionString = `mongodb+srv://mrunalugemuge:${password}@devcluster.iriyz7t.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`; // clustore url
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
  console.log("Connection successful");
} catch(e) {
  console.error("Error connecting to MongoDB:", e);
}
let db = conn.db("integration_ninjas");
export default db;
