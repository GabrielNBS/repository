'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Coordinates follow the original 1536 × 1024 bitmap. Narrow strokes trace
// edges; wider strokes reveal lettering without replacing its hand-drawn ink.
const contours = [
  'M40 803 Q27 822 30 883 Q30 906 45 912 L902 1000 L1026 882 Q1037 875 1027 862 L1023 796 L985 782',
  'M40 803 L877 897 L1023 796 M877 897 Q865 951 877 995 M905 1000 L914 901 L1026 804',
  'M40 660 Q26 691 29 746 Q28 771 43 777 L900 879 L990 788 L989 712 Q1000 701 984 695 L969 691',
  'M40 660 L856 772 L989 705 M856 772 Q841 824 852 871 M900 879 L909 776 L987 716',
  'M110 539 Q96 568 98 610 Q97 633 114 640 L850 753 L971 677 Q981 670 967 658 L969 585 Q980 574 964 568 L934 562',
  'M110 539 L850 647 L969 577 M850 647 Q837 703 843 744 M850 753 L859 652 L969 589',
  'M90 410 Q71 438 72 482 Q71 503 86 511 L796 625 L940 551 Q950 544 935 534 L934 468 Q951 456 935 450 L839 434',
  'M90 410 L799 526 L940 457 M799 526 Q779 578 786 616 M796 625 L808 531 L935 472',
  'M80 269 L301 150 Q309 145 324 151 L904 276 Q920 281 912 294 L908 373 Q924 382 909 393 L723 507 L78 373 Q59 371 61 347 Q61 293 80 269',
  'M80 269 L724 409 L912 286 M724 409 Q707 451 715 498 M723 507 L733 416 L910 300',
  'M868 267 L822 90 Q817 71 836 77 L955 54 Q962 42 976 55 L1022 98 Q1033 110 1036 140 L1208 908 Q1217 926 1198 931 L1087 954 Q1074 955 1066 941 L1027 895',
  'M828 78 L893 137 L1026 108 M893 137 L1078 946 M955 54 L1015 111',
  'M1041 146 L1143 124 Q1140 110 1152 117 L1209 166 Q1221 172 1224 187 L1376 914 Q1383 932 1363 935 L1262 944 Q1251 947 1242 930 L1207 888',
  'M1041 146 L1094 210 L1217 181 M1094 210 L1255 939 M1148 121 L1205 180',
  'M1164 101 Q1170 95 1179 105 L1250 88 Q1244 73 1259 77 L1338 125 Q1353 132 1357 156 L1533 873 Q1539 886 1519 893 L1429 918 Q1416 923 1406 909 L1377 875',
  'M1174 104 L1231 177 L1350 138 M1231 177 L1420 916 M1254 84 L1339 139'
];

const details = [
  {
    d: 'M61 810 Q47 854 60 912 M80 806 Q71 855 81 914 M836 892 L834 990 M853 895 L851 994',
    width: 18
  },
  { d: 'M116 862 L188 871 M283 872 L683 920 M726 919 L807 929', width: 105 },
  { d: 'M63 667 Q47 720 57 776 M87 670 Q73 722 83 780 M867 776 L856 871', width: 18 },
  { d: 'M149 721 L251 746 M296 746 L490 769 M734 792 L812 805', width: 105 },
  { d: 'M119 548 Q105 592 115 632 M235 606 L575 659 M752 675 L813 687', width: 100 },
  { d: 'M145 431 Q130 475 145 520 M165 432 Q147 476 163 523 M196 439 Q180 481 194 525', width: 18 },
  { d: 'M278 494 L410 515 M631 547 L750 566 M544 483 Q607 546 564 585', width: 90 },
  { d: 'M92 284 Q74 328 82 371 M114 285 Q93 330 101 375 M682 412 Q667 459 680 494', width: 18 },
  { d: 'M220 359 L419 394 M584 429 L655 445', width: 100 },
  { d: 'M290 250 L330 248 L311 273 M390 226 L327 287 M407 240 L433 267 L378 284', width: 16 },
  {
    d: 'M516 235 L700 269 M534 257 L638 277 M527 284 L689 313 M505 299 L628 320 M470 319 L534 330 M569 331 L678 349 M585 350 L667 365',
    width: 16
  },
  { d: 'M912 170 L1025 144 M918 184 L1027 156 M1089 908 L1192 878 M1092 922 L1197 893', width: 17 },
  {
    d: 'M944 283 Q942 226 1002 224 Q1051 228 1057 277 M953 312 Q974 290 998 303 Q1015 310 1030 294 Q1046 284 1064 300 M955 328 Q978 308 1001 319 Q1019 331 1035 312 Q1047 301 1068 316 M960 342 Q982 321 1005 335 Q1020 343 1040 327 Q1055 317 1071 331 M964 356 Q985 335 1008 348 Q1023 356 1044 342 Q1059 329 1073 345',
    width: 16
  },
  { d: 'M1032 403 L1100 743', width: 94 },
  {
    d: 'M1180 270 Q1200 274 1217 272 Q1236 332 1196 371 Q1148 357 1135 291 L1172 265 M1170 338 L1205 331 L1198 306 L1162 312 L1170 338 M1167 309 Q1155 288 1175 289 Q1194 284 1195 307',
    width: 17
  },
  { d: 'M1210 421 L1283 811 M1260 884 L1352 860 M1264 900 L1356 876', width: 85 },
  {
    d: 'M1279 238 L1340 218 Q1351 215 1356 230 L1370 289 Q1373 300 1358 305 L1301 320 Q1290 322 1287 310 L1271 251 Q1268 241 1279 238 M1296 272 L1312 288 L1339 240',
    width: 17
  },
  { d: 'M1384 450 L1431 667 M1426 857 L1509 831 M1430 874 L1513 847', width: 82 },
  // The faint page lines occupy each lateral face; reveal along that face.
  { d: 'M926 929 L1011 849 M918 954 L1017 864', width: 34 },
  { d: 'M921 817 L976 764 M919 844 L978 787', width: 28 },
  { d: 'M868 697 L956 640 M867 719 L956 656', width: 25 },
  { d: 'M818 567 L924 507 M817 591 L925 527', width: 25 },
  { d: 'M743 439 L894 342 M741 465 L894 363', width: 25 }
];

export default function BooksDrawing({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const maskId = `books-${useId().replace(/:/g, '')}`;
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: '240px 0px' });
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const svg = root.current;
      if (!svg) return;
      const media = gsap.matchMedia();
      media.add(
        {
          animate: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 801px)'
        },
        (context) => {
          if (!context.conditions?.animate || !svg.getClientRects().length) return;
          const paths = Array.from(svg.querySelectorAll<SVGPathElement>('[data-draw]'));
          const artwork = svg.querySelector('image');
          const completeMask = svg.querySelector('[data-complete-mask]');
          gsap.set(completeMask, { opacity: 0 });
          const timeline = gsap.timeline({
            paused: true,
            onComplete: () => artwork?.removeAttribute('mask')
          });
          paths.forEach((path, index) => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            timeline.to(
              path,
              {
                strokeDashoffset: 0,
                duration: Math.max(0.12, Math.min(0.55, length / 2600)),
                ease: 'none'
              },
              index < contours.length ? index * 0.075 : 1.45 + (index - contours.length) * 0.055
            );
          });
          // Pick up stray pencil marks outside the mapped corridors before
          // removing the mask, guaranteeing the exact original final image.
          timeline.to(completeMask, { opacity: 1, duration: 0.18 }, '>');
          let entered = false;
          let loaded = false;
          const preload = new window.Image();
          preload.onload = () => {
            loaded = true;
            if (entered) timeline.play();
          };
          preload.onerror = () => artwork?.removeAttribute('mask');
          const trigger = ScrollTrigger.create({
            trigger: svg,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              entered = true;
              preload.src = '/illustrations/web-development-books-outline.webp';
              if (loaded) timeline.play();
            }
          });
          return () => {
            trigger.kill();
            preload.onload = null;
            preload.onerror = null;
            // Restore the declarative mask for React Strict Mode's next setup.
            artwork?.setAttribute('mask', `url(#${maskId})`);
          };
        }
      );
      return () => media.revert();
    },
    { scope: root }
  );

  return (
    <svg
      ref={root}
      className={className}
      viewBox="0 0 1536 1024"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1536"
          height="1024"
          style={{ maskType: 'luminance' }}
        >
          <rect width="1536" height="1024" fill="white" data-complete-mask="" />
          <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
            {contours.map((d, index) => (
              <path key={`edge-${index}`} d={d} strokeWidth="22" data-draw="" />
            ))}
            {details.map(({ d, width }, index) => (
              <path key={`detail-${index}`} d={d} strokeWidth={width} data-draw="" />
            ))}
          </g>
        </mask>
      </defs>
      <image
        href={shouldLoad ? '/illustrations/web-development-books-outline.webp' : undefined}
        width="1536"
        height="1024"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
