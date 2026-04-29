export function withBase(path: string, base = '/') {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}` || '/';
}

export function normalizePathname(pathname: string, base = '/') {
  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  const withoutBase = normalizedBase && pathname.startsWith(normalizedBase)
    ? pathname.slice(normalizedBase.length)
    : pathname;
  const trimmed = withoutBase.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function isActivePath(pathname: string, href: string, base = '/') {
  const current = normalizePathname(pathname, base);
  const target = normalizePathname(href, '/');

  if (target === '/') return current === '/';

  return current === target || current.startsWith(`${target}/`);
}
