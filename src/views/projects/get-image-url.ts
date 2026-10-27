// Convert relative paths to GitHub raw URLs
export function getImageUrl(
  src: string | undefined,
  type: string | undefined
): string {
  if (!src) return "";
  if (src.startsWith("/assets")) {
    // Add file extension from img_type if not already present
    let fullPath = src;
    if (!src.match(/\.(jpg|jpeg|png|gif|svg)$/i) && type) {
      fullPath = `${src}.${type}`;
    }
    return `https://raw.githubusercontent.com/AnandChowdhary/projects/main${fullPath}`;
  }
  return src;
}
