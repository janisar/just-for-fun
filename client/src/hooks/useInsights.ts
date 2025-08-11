import { useEffect, useState } from "react";
import {
  addInsight,
  deleteInsight,
  fetchInsights,
} from "../components/insights/insight-fetch.ts";
import type { Insight, InsightRequest } from "../../../lib/index.ts";

export const useInsights = () => {
  const [page, setPage] = useState<number>(0);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(false);

  useEffect(() => {
    fetchInsights(page)
      .then((data) => {
        setInsights(data.insights);
        setHasMore(data.hasMore);
      })
      .catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    setLoading(true);
    fetchInsights(page + 1)
      .then((data) => {
        setInsights((prevInsights) => [...prevInsights, ...data.insights]);
        setHasMore(data.hasMore);
        if (data.hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

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

  return {
    insights,
    error,
    loading,
    onAddInsight,
    onDeleteInsight,
    loadMore,
    hasMore,
  };
};
