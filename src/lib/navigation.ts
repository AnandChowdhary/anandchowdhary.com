/** HTTP control flow shared by route loaders and server-rendered sections. */
export class RouteResponse extends Error {
  constructor(public status: 404 | 307 | 308, public location?: string) {
    super(location || 'Page not found');
  }
}
export function notFound(): never { throw new RouteResponse(404); }
export function redirect(location: string): never { throw new RouteResponse(307, location); }
export function permanentRedirect(location: string): never { throw new RouteResponse(308, location); }
