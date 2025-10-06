const BASE = typeof import.meta !== 'undefined' && import.meta.env && typeof import.meta.env.BASE_URL === 'string'
  ? import.meta.env.BASE_URL
  : '/';

const normalizeBase = (base) => {
  if (!base) return '';
  return base.endsWith('/') ? base.slice(0, -1) : base;
};

const normalizePath = (path) => {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
};

export function asset(path = ''){
  const base = normalizeBase(BASE);
  const normalized = normalizePath(path);
  return `${base}${normalized}`;
}
