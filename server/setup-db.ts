import { Database } from "@db/sqlite";
import * as path from "@std/path";
import * as insightsTable from "./db/tables/insights.ts";

// Define the path to the database file
const dbFilePath = path.resolve("tmp", "db.sqlite3");

// Ensure the directory exists
await Deno.mkdir(path.dirname(dbFilePath), { recursive: true });

console.log(`Setting up SQLite database at ${dbFilePath}`);

// Create a new database connection
const db = new Database(dbFilePath);

// Create the insights table
console.log("Creating insights table...");
db.exec(insightsTable.createTable);

db.close();

console.log("Database setup complete!");
