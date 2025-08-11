import type { Insight } from "$models/insight.ts";
import { expect } from "jsr:@std/expect";
import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { Database } from "@db/sqlite";
import { InsightRepository } from "./InsightRepository.ts";
import * as insightsTable from "../db/tables/insights.ts";

describe("listing insights in the database", () => {
  describe("nothing in the DB", () => {
    let result: Insight[];
    const inMemoryDb: Database = new Database(":memory:");
    const repository = new InsightRepository(inMemoryDb);

    beforeAll(() => {
      inMemoryDb.exec(insightsTable.createTable);
    });

    afterAll(() => {
      inMemoryDb.close();
    });

    it("returns empty result", () => {
      result = repository.getAllInsights();
      expect(result).toEqual([]);
    });
  });

  describe("populated DB", () => {
    const insights: Insight[] = [
      { id: 1, brand: 0, createdAt: 1754886418, text: "1" },
      { id: 2, brand: 0, createdAt: 1754886518, text: "2" },
      { id: 3, brand: 1, createdAt: 1754886618, text: "3" },
      { id: 4, brand: 4, createdAt: 1754886718, text: "4" },
    ];

    const inMemoryDb: Database = new Database(":memory:");
    const repository = new InsightRepository(inMemoryDb);

    beforeAll(() => {
      inMemoryDb.exec(insightsTable.createTable);
      for (let i = 0; i < insights.length; i++) {
        repository.createInsight(insights[i]);
      }
    });

    afterAll(() => {
      inMemoryDb.close();
    });

    it("returns non-empty result", () => {
      const result = repository.getAllInsights();
      expect(result.length).toBeGreaterThan(0);
    });

    it("returns all insights in the DB", () => {
      const result = repository.getAllInsights();
      expect(result).toHaveLength(4);
    });

    it("should order by createdAtDate", () => {
      const result = repository.getAllInsights();
      expect(result[0].createdAt).toBeGreaterThanOrEqual(result[1].createdAt);
      expect(result[0].id).toBe(4);
    });
  });
});

describe("listing insights by id in the database", () => {
  const database: Database = new Database(":memory:");
  const repository = new InsightRepository(database);

  beforeAll(() => {
    database.exec(insightsTable.createTable);
  });

  it("should returns nothing if no insights in DB", () => {
    const result = repository.getInsightById("1");
    expect(result).toBeNull();
  });

  it("should return the expected insights", () => {
    const insights: Insight[] = [
      { id: 1, brand: 0, createdAt: new Date().getTime(), text: "1" },
      { id: 2, brand: 0, createdAt: new Date().getTime(), text: "2" },
      { id: 3, brand: 1, createdAt: new Date().getTime(), text: "3" },
      { id: 4, brand: 4, createdAt: new Date().getTime(), text: "4" },
    ];

    const repository = new InsightRepository(database);
    for (const insight of insights) {
      repository.createInsight(insight);
    }
    const result = repository.getInsightById("2");
    expect(result).toEqual(insights[1]);
  });
});

describe("deleting insights from database", () => {
  const database: Database = new Database(":memory:");
  const repository = new InsightRepository(database);

  beforeAll(() => {
    database.exec(insightsTable.createTable);
  });

  it("should not do anything when id not found", () => {
    repository.deleteInsight("1");
  });

  it("should delete item", () => {
    const insight1: Insight = {
      id: 1,
      brand: 0,
      createdAt: new Date().getTime(),
      text: "1",
    };
    const insight2: Insight = {
      id: 2,
      brand: 1,
      createdAt: new Date().getTime(),
      text: "2",
    };
    repository.createInsight(insight1);
    repository.createInsight(insight2);
    repository.deleteInsight("1");

    const result = repository.getInsightById("1");
    expect(result).toBeNull();
  });
});
