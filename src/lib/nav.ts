const trim = (path: string) =>
  path.length > 1 ? path.replace(/\/$/, "") : path;

/** True when `pathname` is `href` or a page inside it. */
export function isActive(pathname: string, href: string) {
  const current = trim(pathname);
  const target = trim(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

/** True only when `pathname` is exactly `href`. */
export function isCurrent(pathname: string, href: string) {
  return trim(pathname) === trim(href);
}
