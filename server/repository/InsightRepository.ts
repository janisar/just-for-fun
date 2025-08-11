import { DbConnection } from "../db/index.ts";
import * as insightsTable from "../db/tables/insights.ts";
import type { Database } from "@db/sqlite";
import type { Insight } from "$models/insight.ts";

export class InsightRepository {
  constructor(private readonly db: Database = DbConnection.getInstance()) {
    console.log("InsightRepository initialized with DB connection:", db);
  }

  public createInsight(
    insight: Omit<insightsTable.Row, "id">,
  ): Insight | null {
    const sql = insightsTable.insertStatement(insight);
    console.log("Executing SQL to create insight:", sql);
    this.db.exec(
        `INSERT INTO insights (brand, createdAt, "text") VALUES (:brand, :createdAt, :text)`,
        {
          ...insight
        },
    );
    const lastId = this.db.lastInsertRowId;
    return this.getInsightById(lastId);
  }

  public getInsightById(id: string | number): Insight | null {
    const [row] = this.db.prepare(`SELECT * FROM insights WHERE id = :id LIMIT 1`).all<insightsTable.Row>({
      id: id,
    });

    if (row) {
      console.log("Insight retrieved:", row);
      return {
        ...row,
        createdAt: +row.createdAt, // Convert createdAt to a timestamp
      } as Insight;
    }
    console.log(`Insight not found for id=${id}`);
    return null;
  }

  getAllInsights(): Insight[] {
    const rows = this.db.sql<insightsTable.Row>`SELECT * FROM insights ORDER BY createdAt DESC`;
    return rows.map((row) => {
      return {
        ...row,
        createdAt: +row.createdAt,
      } as Insight;
    });
  }

  public deleteInsight(id: string): void {
    console.log("Executing SQL to delete insight with id:", id);
    this.db.prepare(`DELETE FROM insights WHERE id = :id`).run({ id: id });
  }
}
