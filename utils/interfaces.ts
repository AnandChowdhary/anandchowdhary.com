import type {
  Timeline,
  TimelineOkr,
  TimelineTheme,
} from "https://esm.sh/timeline-types@2.0.0/index.d.ts";

interface ItemSummaryValue {
  values: string[];
  timeAgo?: string;
}
export type OptionalItemSummaryValue = ItemSummaryValue | undefined;

export interface ApiWeeklyValues {
  weeks: Record<number, string[]>;
}
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

export interface AllLifeDataSummary {
  timeline: Timeline;
  okr: TimelineOkr;
  theme: TimelineTheme;
  sleep?: Record<string, OuraSleepData>;
  activity?: Record<string, OuraActivity>;
  readiness?: Record<string, OuraReadiness>;
  location?: LocationApiResult;
}
