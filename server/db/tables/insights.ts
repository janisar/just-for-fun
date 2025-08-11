export const createTable = `
  CREATE TABLE insights (
    id INTEGER PRIMARY KEY ASC NOT NULL,
    brand INTEGER NOT NULL,
    createdAt TEXT NOT NULL,
    "text" TEXT NOT NULL
  )
`;

export type Row = {
  id: number;
  brand: number;
  createdAt: number;
  text: string;
};

export type Insert = {
  brand: number;
  createdAt: number;
  text: string;
};

export const insertStatement =
  `INSERT INTO insights (brand, createdAt, "text") VALUES (:brand, :createdAt, :text)`;
export const selectByIdStatement =
  `SELECT * FROM insights WHERE id = :id LIMIT 1`;
export const selectAllStatement = (page: number, limit: number) =>
  `SELECT * FROM insights ORDER BY createdAt DESC LIMIT ${limit} OFFSET ${
    page * limit
  }`;

export const deleteStatement = `DELETE FROM insights WHERE id = :id`;
