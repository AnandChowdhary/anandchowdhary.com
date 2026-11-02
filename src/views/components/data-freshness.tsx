export function latestRecordedDate(dates: string[]) {
  return dates.filter(date => /^\d{4}-\d{2}-\d{2}/.test(date) && Number.isFinite(Date.parse(date))).sort((a,b)=>Date.parse(b)-Date.parse(a))[0];
}
export function DataFreshness({ dates, label = 'Latest record' }: {dates:string[];label?:string}) {
  const latest = latestRecordedDate(dates);
  return <p className="text-xs text-neutral-500">{label}: {latest ? <time dateTime={latest}>{new Date(latest).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'})}</time> : 'unavailable'}</p>;
}
export function SiteRefresh() {
  const refreshed = new Date().toISOString();
  return <p className="text-xs text-neutral-500">Page refreshed <time dateTime={refreshed}>{new Date(refreshed).toLocaleString('en-US',{year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'2-digit',timeZone:'UTC'})} UTC</time>. Source records may be older.</p>;
}
