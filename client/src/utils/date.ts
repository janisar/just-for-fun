
export function formatUtcEpoch(epochSeconds: number): string {
    return new Date(epochSeconds).toLocaleString("en-AU", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}
