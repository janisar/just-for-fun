import * as zod from "zod";

export const InsightRequestSchema = zod.object({
  brand: zod.number().int().min(0),
  text: zod.string(),
});

export type InsightRequest = zod.infer<typeof InsightRequestSchema>;
