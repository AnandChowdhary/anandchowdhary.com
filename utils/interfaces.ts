import timeline from "../everything/api.json" assert { type: "json" };
type Timeline = typeof timeline;

interface Summary {
  count: number;
  average: number;
  sum: number;
  minimum: number;
  maximum: number;
  breakdown: ({ start: string; end: string } & Omit<Summary, "breakdown">)[];
}

export interface Item {
  id: number;
  synced_at: string;
  hash: string;
  date: string;
  type: string;
  value: number;
  unit: string;
}

interface ItemSummaryValue {
  value: string;
  timeAgo: string;
}
export type OptionalItemSummaryValue = ItemSummaryValue | undefined;

export interface HomeData {
  okr: {
    title: string;
    description: string;
    data: {
      name: number;
      progress: number;
      success: number;
      objectives: {
        name: string;
        progress: number;
        success: number;
        key_results: {
          name: string;
          current_result: number;
          target_result: number;
          progress: number;
          success: number;
        }[];
      }[];
    };
  };
  gyroscope: {
    location: OptionalItemSummaryValue;
    heart: OptionalItemSummaryValue;
    steps: OptionalItemSummaryValue;
  };
  theme: { year: string; title: string; description: string };
  timeline: Timeline;
}
