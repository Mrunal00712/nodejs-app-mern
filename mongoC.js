// import { MongoClient } from "mongodb";

// const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
// const connectionString = `mongodb+srv://mrunalugemuge:${password}@devcluster.iriyz7t.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`; // clustore url
// const client = new MongoClient(connectionString);
// let conn;
// try {
//   conn = await client.connect();
//   console.log("Connection successful");
// } catch(e) {
//   console.error("Error connecting to MongoDB:", e);
// }
// let db = conn.db("integration_ninjas");
// export default db;
import { MongoClient } from "mongodb";

// MongoDB Atlas connection details
const username = "mrunalugemuge"; // Replace with your MongoDB Atlas username
const password = "upQbWMcrnAorcKwA"; // Replace with your MongoDB Atlas password
const clusterUrl = "devcluster.iriyz7t.mongodb.net"; // Replace with your MongoDB Atlas cluster IP
const dbName = "MERN-DEPLOYMENT"; // Replace with your database name

// Construct the connection string
const connectionString = `mongodb+srv://${username}:${encodeURIComponent(password)}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;

// Create a new MongoClient
const client = new MongoClient(connectionString);

let db;

// Export a function to connect to MongoDB and return the database object
export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB Atlas");
        db = client.db(dbName);
        return db; // Return the database object
    } catch (err) {
        console.log(err.stack);
        throw new Error('Error connecting to MongoDB Atlas');
    }
}
