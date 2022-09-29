export function LoadError({ items }: { items: string }) {
  return (
    <p className="opacity-50 space-x-2">
      <span aria-hidden="true">⚠️</span>
      <span>{`Unable to load ${items}`}</span>
    </p>
  );
}
