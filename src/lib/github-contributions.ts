import { fetchSource } from './source';

export interface ContributionDay { date: string; level: number }
export interface Contributions { total: number; days: ContributionDay[]; fetchedAt?: string; stale?: boolean }

/** Parse only numbers/dates from GitHub's public calendar; never embed upstream HTML. */
export function parseContributions(html: string): Contributions | null {
  const heading = /<h2\b[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/.exec(html)?.[1];
  const total = heading?.match(/([\d,]+)\s+contributions?\s+in the last year/i)?.[1];
  if (!total) return null;
  const days: ContributionDay[] = [];
  for (const [cell] of html.matchAll(/<td\b[^>]*>/g)) {
    const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(cell)?.[1];
    const level = /data-level="([0-4])"/.exec(cell)?.[1];
    if (date && level) days.push({ date, level: Number(level) });
  }
  if (days.length < 350 || days.length > 371 || new Set(days.map(day => day.date)).size !== days.length) return null;
  return { total: Number(total.replaceAll(',', '')), days: days.sort((a, b) => a.date.localeCompare(b.date)) };
}

export async function getGitHubContributions(): Promise<Contributions | null> {
  const response = await fetchSource('https://github.com/users/AnandChowdhary/contributions', { ttl: 3600, optional: true, validate: body => parseContributions(body) !== null });
  if (!response.ok) return null;
  const data = parseContributions(await response.text());
  if (!data) return null;
  return { ...data, fetchedAt: new Date(Number(response.headers.get('X-Source-Fetched-At'))).toISOString(), stale: response.headers.get('X-Source-Stale') === 'true' };
}
