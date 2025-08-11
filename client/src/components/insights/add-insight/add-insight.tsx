import { BRANDS } from "../../../lib/consts.ts";
import { Button } from "../../button/button.tsx";
import { Modal, type ModalProps } from "../../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { type InsightRequest, InsightRequestSchema } from "../../../../../lib/index.ts";
import type { FormEvent } from "npm:@types/react@19.0.2";

type AddInsightProps = ModalProps & {
    onAdd: (insight: InsightRequest) => void;
};

export const AddInsight = (props: AddInsightProps) => {

    const addInsight = (formEvent: FormEvent<HTMLFormElement>) => {
        formEvent.preventDefault();
        props.onClose();
        const formData = new FormData(formEvent.currentTarget);
        const insight = InsightRequestSchema.parse({
            brand: Number(formData.get("brand")),
            text: formData.get("text"),
        })
        props.onAdd(insight);
    };

    return (
        <Modal {...props}>
            <h1 className={styles.heading}>Add a new insight</h1>
            <form className={styles.form} onSubmit={addInsight}>
                <label className={styles.field}>
                    <select id="brand" name="brand" className={styles["field-input"]}>
                        {BRANDS.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                    </select>
                </label>
                <label className={styles.field}>
                    Insight
                    <textarea
                        className={styles["field-input"]}
                        rows={5}
                        name="text"
                        id="text"
                        placeholder="Something insightful..."
                    />
                </label>
                <Button className={styles.submit} type="submit" label="Add insight" />
            </form>
        </Modal>
    );
};
