import React from 'react';

export function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="stroke-linecap-round stroke-linejoin-round h-icon w-icon fill-none stroke-current stroke-[1.8]"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="stroke-linecap-round stroke-linejoin-round h-icon w-icon fill-none stroke-current stroke-[1.8]"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="stroke-linecap-round stroke-linejoin-round h-icon-sm w-icon-sm fill-none stroke-current stroke-[1.8]"
    >
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}
