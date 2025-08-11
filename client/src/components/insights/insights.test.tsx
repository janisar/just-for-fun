import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Insights } from "./insights.tsx";

const TEST_INSIGHTS = [
  {
    id: 1,
    brand: 1,
    createdAt: new Date().getTime(),
    text: "Test insight",
  },
  {
    id: 2,
    brand: 2,
    createdAt: new Date().getTime(),
    text: "Another test insight"
  },
];

describe("insights", () => {
  it("renders", () => {
    const { getByText } = render(
      <Insights insights={TEST_INSIGHTS} onDelete={() => {}} />,
    );
    expect(getByText(TEST_INSIGHTS[0].text)).toBeTruthy();
  });
});
