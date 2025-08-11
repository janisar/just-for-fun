# Server

This is the server component of the Suit Tracker application.

## Database Setup

The application uses SQLite as its database. Follow these steps to set up the database:

### Automatic Setup

The easiest way to set up the database is to use the provided setup script:

```sh
# From the project root
deno task setup-db

# Or from the server directory
cd server
deno task setup-db
```

This will:
1. Create the database file at `server/tmp/db.sqlite3` if it doesn't exist
2. Create the necessary tables in the database

### Manual Setup

If you prefer to set up the database manually, you can:

1. Ensure the `server/tmp` directory exists:
   ```sh
   mkdir -p server/tmp
   ```

2. Create the database file:
   ```sh
   touch server/tmp/db.sqlite3
   ```

3. Run the setup script to initialize the tables:
   ```sh
   cd server
   deno run --allow-net --allow-read --allow-write --allow-ffi --allow-env setup-db.ts
   ```

## Sample Data (Optional)

If you want to add sample data to the database, you can modify the `setup-db.ts` file:

1. Open the file in your editor
2. Uncomment the sample data section (lines 22-40)
3. Modify the sample data as needed
4. Run the setup script again

## Running the Server

After setting up the database, you can run the server:

```sh
# From the project root
deno task dev:server

# Or from the server directory
cd server
deno task dev
```

The server will be available at http://localhost:8080 (or the port specified in your .env file).
