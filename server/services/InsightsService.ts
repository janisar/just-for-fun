import type { Insight } from "$models/insight.ts";
import type * as insightsTable from "../db/tables/insights.ts";
import type { InsightRequest } from "../../lib/index.ts";
import { InsightRepository } from "../repository/InsightRepository.ts";

export class InsightsService {

    constructor(
        private readonly insightRepository: InsightRepository = new InsightRepository(),
        private readonly logger = console,
    ) {
    }

    public createInsight(insight: InsightRequest): Insight | null {
        this.logger.log("Creating insight:");
        const insightData: Omit<insightsTable.Row, "id"> = {
            createdAt: new Date().getTime(),
            text: insight.text,
            brand: insight.brand,
        }
        const result = this.insightRepository.createInsight(insightData);

        if (result == null) {
            this.logger.error("Failed to create insight.", {brand: insight.brand});
        } else {
            this.logger.log("Insight created successfully:", {
                id: result.id,
                brand: result.brand,
            });
        }
        return result;
    }

    public getInsightById(id: string): Insight | null {
        this.logger.log(`Looking up insight for id=${id}`);
        return this.insightRepository.getInsightById(id);
    }

    public listInsights() {
        return this.insightRepository.getAllInsights();
    }

    public deleteInsight(id: string): void {
        this.logger.log(`Deleting insight for id=${id}`);
        this.insightRepository.deleteInsight(id);
        this.logger.log(`Insight with id=${id} deleted successfully.`);
    }
}
