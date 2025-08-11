import type {
  Insight,
  InsightRequest,
  InsightResponse,
} from "../../../../lib/index.ts";

export async function addInsight(insight: InsightRequest): Promise<Insight> {
  const response = await fetch("/api/insights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(insight),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add insight");
  }
  return await response.json();
}

export async function deleteInsight(insightId: number) {
  await fetch(`/api/insights/${insightId}`, {
    method: "DELETE",
  }).catch((error) => {
    throw new Error(error.message || "Failed to delete insight");
  });
}

export async function fetchInsights(page: number): Promise<InsightResponse> {
  const response = await fetch(`/api/insights?page=${page}&limit=2`);
  if (!response.ok) {
    throw new Error("Failed to fetch insights");
  }
  return await response.json();
}
