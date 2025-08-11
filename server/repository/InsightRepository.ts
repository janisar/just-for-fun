import { DbConnection } from "../db/index.ts";
import * as insightsTable from "../db/tables/insights.ts";
import type { Database } from "@db/sqlite";
import type { Insight } from "../../lib/index.ts";

export class InsightRepository {
  constructor(
    private readonly db: Database = DbConnection.getInstance(),
    private readonly logger = console,
  ) {
    this.logger.log("InsightRepository initialized with DB connection:", db);
  }

  public createInsight(
    insight: Omit<insightsTable.Row, "id">,
  ): Insight | null {
    this.db.exec(insightsTable.insertStatement, {
      createdAt: insight.createdAt,
      text: insight.text,
      brand: insight.brand,
    });
    const lastId = this.db.lastInsertRowId;
    return this.getInsightById(lastId);
  }

  public getInsightById(id: string | number): Insight | null {
    const [row] = this.db.prepare(insightsTable.selectByIdStatement).all<
      insightsTable.Row
    >({
      id: id,
    });

    if (row) {
      this.logger.log("Insight retrieved:", row.id);
      return {
        ...row,
        createdAt: +row.createdAt, // Convert createdAt to a timestamp
      } as Insight;
    }
    this.logger.log(`Insight not found for id=${id}`);
    return null;
  }

  getAllInsights(
    { page, limit }: { page: number; limit: number },
  ): Insight[] {
    const rows = this.db.prepare(insightsTable.selectAllStatement(page, limit))
      .all<
        insightsTable.Row
      >();
    return rows.map((row) => {
      return {
        ...row,
        createdAt: +row.createdAt,
      } as Insight;
    });
  }

  public deleteInsight(id: string): void {
    this.logger.log("Executing SQL to delete insight with id:", id);
    this.db.prepare(insightsTable.deleteStatement).run({ id: id });
  }
}
