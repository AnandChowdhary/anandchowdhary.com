interface ContentSnapshot {
  mode: 'record' | 'replay';
  read(url: string): Promise<Response>;
  record(url: string, response: Response): Promise<unknown>;
}
export function contentSnapshot(): ContentSnapshot | undefined {
  return (globalThis as Record<symbol, unknown>)[Symbol.for('site.contentSnapshot')] as ContentSnapshot | undefined;
}
