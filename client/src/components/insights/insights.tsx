import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { BRANDS } from "../../lib/consts.ts";
import { formatUtcEpoch } from "../../utils/date.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
  onDelete: (id: number) => void;
};

export const Insights = ({ insights, className, onDelete }: InsightsProps) => {
  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length
          ? (
            insights.map(({ id, text, createdAt, brand }) => (
              <div className={styles.insight} key={id}>
                <div className={styles["insight-meta"]}>
                  <span>
                    {BRANDS.find((b) =>
                      b.id === brand
                    )?.name ??
                      "Unknown brand"}
                  </span>
                  <div className={styles["insight-meta-details"]}>
                    <span>{formatUtcEpoch(createdAt)}</span>
                    <Trash2Icon
                      className={styles["insight-delete"]}
                      onClick={() => onDelete(id)}
                    />
                  </div>
                </div>
                <p className={styles["insight-content"]}>
                  <span className={styles["insight-label"]}>Insight:</span>
                  {text}
                </p>
              </div>
            ))
          )
          : <p>We have no insight!</p>}
      </div>
    </div>
  );
};
