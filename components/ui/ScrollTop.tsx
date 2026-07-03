import React from 'react';

export default function ScrollTop() {
  return (
    <a
      href="#top"
      className="border-line fixed right-4 bottom-4 z-25 grid h-11 w-11 place-items-center rounded-full border bg-[rgb(255,255,255,0.84)] shadow-[0_14px_40px_rgb(24,24,27,0.1)]"
      aria-label="Voltar ao topo"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="stroke-linecap-round stroke-linejoin-round h-icon-scroll w-icon-scroll fill-none stroke-current stroke-2"
      >
        <path d="m6 15 6-6 6 6" />
      </svg>
    </a>
  );
}
