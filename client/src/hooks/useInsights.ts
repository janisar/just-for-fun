import { useEffect, useState } from "react";
import {
  addInsight,
  deleteInsight,
  fetchInsights,
} from "../components/insights/insight-fetch.ts";
import type { InsightRequest } from "../../../lib/index.ts";
import type { Insight } from "../schemas/insight.ts";

export const useInsights = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchInsights()
      .then((data) => setInsights(data))
      .catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  const onAddInsight = async (insight: InsightRequest) => {
    try {
      const newInsight = await addInsight(insight);
      setInsights((prevInsights) => [newInsight, ...prevInsights]);
    } catch {
      setError("Failed to add insight");
    }
  };

  const onDeleteInsight = async (insightId: number) => {
    try {
      await deleteInsight(insightId);
      setInsights((prevInsights) =>
        prevInsights.filter((insight) => insight.id !== insightId)
      );
    } catch {
      setError("Failed to delete insight");
    }
  };

  return { insights, error, loading, onAddInsight, onDeleteInsight };
};
