import timeline from "../everything/api.json" assert { type: "json" };
export type Timeline = typeof timeline;

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
  values: string[];
  timeAgo?: string;
}
export type OptionalItemSummaryValue = ItemSummaryValue | undefined;

export interface OuraSleepData {
  total: number;
  rem: number;
  awake: number;
  deep: number;
  duration: number;
  efficiency: number;
  light: number;
  score: number;
}
export interface OuraActivity {
  steps: 6574;
  total: 300;
  cal_active: 305;
  cal_total: 2431;
  score: 93;
}
export interface OuraReadiness {
  score: 82;
  score_activity_balance: 60;
  score_hrv_balance: 60;
  score_previous_day: 95;
  score_previous_night: 95;
  score_recovery_index: 100;
  score_resting_hr: 75;
  score_sleep_balance: 89;
  score_temperature: 100;
}
export interface LocationApiResult {
  updatedAt: string;
  approximateCoordinates: [number, number];
  label: string;
  timezone?: {
    name: string;
    countries: string[];
    utcOffset: number;
    utcOffsetStr: string;
    dstOffset: number;
    dstOffsetStr: string;
  };
  country: {
    code: string;
    name: string;
    timezones: string[];
  };
}

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
    sleep: OptionalItemSummaryValue;
  };
  theme: { year: string; title: string; description: string };
  timeline: Timeline;
  query: string;
}
