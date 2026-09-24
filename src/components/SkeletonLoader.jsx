import React, { useState } from 'react';

/**
 * Shimmering skeleton loader & progressive image wrapper
 */
export function SkeletonBlock({ height = '100%', width = '100%', borderRadius = '12px', className = '' }) {
  return (
    <div
      className={`skeleton-block ${className}`}
      style={{
        height,
        width,
        borderRadius,
      }}
      aria-hidden="true"
    />
  );
}

export function ImageWithSkeleton({
  src,
  alt = '',
  className = '',
  aspectRatio = '16/9',
  objectFit = 'cover',
  priority = false,
  onClick,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`image-skeleton-container ${className}`}
      style={{ aspectRatio }}
      onClick={onClick}
    >
      {!isLoaded && !hasError && (
        <div className="skeleton-overlay" aria-hidden="true">
          <div className="skeleton-shimmer" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          objectFit,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        className="progressive-image"
      />

      {hasError && (
        <div className="image-error-fallback">
          <span>{alt || 'Image preview'}</span>
        </div>
      )}
    </div>
  );
}
