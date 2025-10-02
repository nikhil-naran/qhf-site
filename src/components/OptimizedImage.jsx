import React, { useMemo } from 'react';

const DEFAULT_WIDTHS = [320, 480, 640, 960, 1200];

const normalizeSrc = (value = '') => {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) {
    return value;
  }
  return `/${value}`;
};

const buildOptimizedUrl = (src, width, quality) => {
  const safeSrc = normalizeSrc(src);
  const params = new URLSearchParams({
    url: safeSrc,
    w: String(width),
    q: String(quality)
  });
  return `/_vercel/image?${params.toString()}`;
};

export default function OptimizedImage({
  src,
  alt,
  widths,
  sizes = '100vw',
  quality = 75,
  loading = 'lazy',
  decoding = 'async',
  className = '',
  ...rest
}) {
  const widthSet = useMemo(() => {
    const unique = (widths && widths.length ? widths : DEFAULT_WIDTHS)
      .filter((w) => typeof w === 'number' && Number.isFinite(w) && w > 0);
    const deduped = Array.from(new Set(unique));
    deduped.sort((a, b) => a - b);
    return deduped.length ? deduped : DEFAULT_WIDTHS;
  }, [widths]);

  if (!src || !alt) {
    return null;
  }

  const srcSet = widthSet
    .map((widthValue) => `${buildOptimizedUrl(src, widthValue, quality)} ${widthValue}w`)
    .join(', ');
  const fallbackSrc = buildOptimizedUrl(src, widthSet[widthSet.length - 1], quality);

  return (
    <img
      src={fallbackSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={className}
      {...rest}
    />
  );
}
