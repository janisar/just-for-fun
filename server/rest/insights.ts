import type { Router, RouterContext } from "@oak/oak";
import { InsightsService } from "../services/InsightsService.ts";
import { InsightRequestSchema } from "../../lib/index.ts";

export default (router: Router) => {
    const insightsService = new InsightsService();

    router.post("/insights", async (ctx: RouterContext<"/insights">) => {
        const body = ctx.request.body;
        const value = await body.json();
        ctx.response.body = insightsService.createInsight(InsightRequestSchema.parse(value));
        ctx.response.status = 201;
    });

    router.get("/insights", (ctx: RouterContext<"/insights">) => {
        ctx.response.body = insightsService.listInsights();
        ctx.response.status = 200;
    });

    router.get("/insights/:id", (ctx: RouterContext<"/insights/:id">) => {
        ctx.response.body = insightsService.getInsightById(ctx.params.id);
        ctx.response.status = 200;
    });

    router.delete("/insights/:id", (ctx: RouterContext<"/insights/:id">) => {
        insightsService.deleteInsight(ctx.params.id);
        ctx.response.status = 204;
        ctx.response.body = null;
    });
}
