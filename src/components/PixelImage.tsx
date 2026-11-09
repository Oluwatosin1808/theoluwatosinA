import React, { useEffect, useRef, useState } from 'react';

/**
 * Image with a pixelated loading state.
 *
 * Two modes, both driven by the same contract (loader visible until the full
 * image fires `load`):
 *
 *  - `pixelSrc` given (Sanity projects): a tiny CDN thumbnail is shown
 *    upscaled with `image-rendering: pixelated` — chunky 8-bit pixels that
 *    cross-fade into the real image. This is the classic blur-up technique,
 *    in pixel-art form.
 *  - no `pixelSrc` (bundled images): an animated checkerboard of accent
 *    blocks with a stepped (frame-by-frame) scroll and a blinking tag.
 *
 * The full-size <img> stays in the DOM the whole time (opacity 0 → 1), so the
 * browser starts fetching immediately and cached images resolve without a
 * flash. Callers keep their own classes on it (e.g. `.v2-proj-photo` for the
 * entrance animation) — this component only adds `v2-fade-in` / `v2-img-ready`.
 */

type PixelImageProps = {
  src: string;
  alt: string;
  /** Tiny upscaled placeholder shown while `src` loads. */
  pixelSrc?: string;
  /** Class for the full-size <img> (entrance animations etc.). */
  imgClassName?: string;
  /** Inline style for the full-size <img>. */
  imgStyle?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  /** Label shown on the loading chip. */
  label?: string;
};

export default function PixelImage({
  src,
  alt,
  pixelSrc,
  imgClassName,
  imgStyle,
  loading = 'lazy',
  label = 'loading',
}: PixelImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);
  const [errored, setErrored] = useState(false);

  // cached images can be complete before React attaches onLoad
  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) setReady(true);
  }, [src]);

  const showLoader = !ready && !errored;

  return (
    <>
      {/* pixel thumbnail (Sanity mode) */}
      {pixelSrc && !errored && (
        <img
          className="v2-pixel-ph"
          src={pixelSrc}
          alt=""
          aria-hidden="true"
          style={{ opacity: ready ? 0 : 1 }}
        />
      )}

      {/* full-size image — always in the DOM so it starts loading at once */}
      <img
        ref={imgRef}
        className={`v2-fade-in${ready ? ' v2-img-ready' : ''} ${imgClassName ?? ''}`}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setReady(true)}
        onError={() => setErrored(true)}
        style={imgStyle}
      />

      {/* loading state */}
      {showLoader && (
        <div className={pixelSrc ? 'v2-pixel-loader v2-pixel-loader--soft' : 'v2-pixel-loader'} aria-hidden="true">
          <div className="v2-pixel-checker" />
          <div className="v2-pixel-loader-center">
            <span className="v2-pixel-blocks">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="v2-pixel-tag">{label}</span>
          </div>
        </div>
      )}
    </>
  );
}
