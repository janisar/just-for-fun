import { Database } from "@db/sqlite";
import * as path from "@std/path";

export class DbConnection {

    private static db: Database;

    public static async init() {
        const dbFilePath = path.resolve("tmp", "db.sqlite3");
        console.log(`Opening SQLite database at ${dbFilePath}`);

        await Deno.mkdir(path.dirname(dbFilePath), { recursive: true });
        this.db = new Database(dbFilePath);
        return this.db;
    }

    public static getInstance(): Database {
        if (!this.db) {
            console.warn("DbConnection not initialized. Call DbConnection.init() first.");
        }
        return this.db;
    }
}
