import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import { useInsights } from "../hooks/useInsights.ts";

export const App = () => {
  const {
    insights,
    error,
    loading,
    onDeleteInsight,
    onAddInsight,
    loadMore,
    hasMore,
  } = useInsights();

  return (
    <main className={styles.main}>
      <Header addInsight={onAddInsight} />
      {loading && <p className={styles.loading}>Loading insights...</p>}
      <Insights
        className={styles.insights}
        hasMore={hasMore}
        insights={insights}
        onDelete={onDeleteInsight}
        onLoadMore={loadMore}
      />
      {error && <p className={styles.error}>{error}</p>}
    </main>
  );
};
