import * as z from "zod";

export const InsightRequestSchema = z.object({
  brand: z.number().int().min(0),
  text: z.string(),
});

export type InsightRequest = z.infer<typeof InsightRequestSchema>;

export type InsightResponse = {
  insights: Insight[];
  hasMore: boolean;
};

export const Insight = z.object({
  id: z.number().int().min(0),
  brand: z.number().int().min(0),
  createdAt: z.number(),
  text: z.string(),
});

export type Insight = z.infer<typeof Insight>;
