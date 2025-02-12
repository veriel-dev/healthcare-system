export function createRouteRegex(parentPath: string) {
  const cleanParentPath = parentPath.replace(/^\/+|\/+$/g, '');
  const escapedPath = cleanParentPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^/?${escapedPath}(?:/.*)?$`);
}
