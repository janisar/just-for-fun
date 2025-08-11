import type { InsightRequest } from "../../../../lib/index.ts";

export async function addInsight(insight: InsightRequest) {
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

export async function fetchInsights() {
  const response = await fetch("/api/insights");
  if (!response.ok) {
    throw new Error("Failed to fetch insights");
  }
  return await response.json();
}
