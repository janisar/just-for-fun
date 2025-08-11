import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";
import { useEffect, useState } from "react";
import type { InsightRequest } from "../../../lib/index.ts";
import {
  addInsight as addInsightFetch,
  deleteInsight,
  fetchInsights,
} from "../components/insights/insight-fetch.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInsights().then((insights) => setInsights(insights)).catch((err) => {
      setError(err.message);
    });
  }, []);

  const addInsight = (insight: InsightRequest) => {
    addInsightFetch(insight).then((insight) => {
      setInsights((prevInsights) => [insight, ...prevInsights]);
    }).catch((err) => {
      setError(err.message);
    });
  };

  const onDeleteInsight = (insightId: number) => {
    deleteInsight(insightId).then(() => {
      setInsights((prevInsights) =>
        prevInsights.filter((insight) => insight.id !== insightId)
      );
    }).catch((err) => {
      setError(err.message);
    });
  };

  return (
    <main className={styles.main}>
      <Header addInsight={addInsight} />
      <Insights
        className={styles.insights}
        insights={insights}
        onDelete={onDeleteInsight}
      />
        {error && <p className={styles.error}>{error}</p>}
    </main>
  );
};
