import { getGitHubContributions } from '@/lib/github-contributions';
import { underlinedLink } from '@/views/components/external-link';

export async function GitHubSection() {
  const contributions = await getGitHubContributions();
  const start = contributions ? new Date(contributions.days[0].date + 'T00:00:00Z') : null;
  const offset = start?.getUTCDay() ?? 0;
  const columns = contributions ? Math.ceil((contributions.days.length + offset) / 7) : 0;
  return (
    <div className="space-y-2">
      <h2 className="font-medium text-xl">GitHub</h2>
      {contributions ? (
        <>
          <p className="text-sm text-neutral-500">{contributions.total.toLocaleString('en-US')} contributions in the last year</p>
          {contributions.stale && <p className="text-xs text-neutral-500">Last updated {new Date(contributions.fetchedAt!).toLocaleDateString('en-US', { timeZone: 'UTC' })}</p>}
          <svg viewBox={`0 0 ${columns * 13} 91`} role="img" aria-label="GitHub contributions in the last year" className="w-full contribution-calendar">
            {contributions.days.map((day, index) => (
              <rect key={day.date} x={Math.floor((index + offset) / 7) * 13} y={(index + offset) % 7 * 13}
                width="10" height="10" rx="2" data-level={day.level}>
                <title>{`${day.date}: activity level ${day.level} of 4`}</title>
              </rect>
            ))}
          </svg>
        </>
      ) : <p className="text-sm text-neutral-500">Contributions unavailable</p>}
      <a className={`${underlinedLink} text-sm`} href="https://github.com/AnandChowdhary">View activity on GitHub</a>
    </div>
  );
}
