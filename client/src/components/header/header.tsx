import { useState, type FunctionComponent } from "react";
import { Button } from "../button/button.tsx";
import styles from "./header.module.css";
import { AddInsight } from "../insights/add-insight/add-insight.tsx";
import type { InsightRequest } from "../../../../lib/index.ts";

export const HEADER_TEXT = "Suit Tracker Insights";

type Props = {
    addInsight: (insight: InsightRequest) => void;
};

export const Header: FunctionComponent<Props> = ({addInsight}) => {
  const [addInsightOpen, setAddInsightOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.logo}>{HEADER_TEXT}</span>
          <Button
            label="Add insight"
            theme="secondary"
            onClick={() => setAddInsightOpen(true)}
          />
        </div>
      </header>
      <AddInsight
        open={addInsightOpen}
        onAdd={addInsight}
        onClose={() => setAddInsightOpen(false)}
      />
    </>
  );
};
