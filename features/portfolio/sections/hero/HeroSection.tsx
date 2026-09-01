import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[min(54rem,100svh)] flex-col justify-end px-[clamp(1.25rem,3vw,3.75rem)] pt-36 pb-12 max-[800px]:min-h-svh max-[800px]:pt-32 max-[480px]:pb-8"
      aria-labelledby="hero-title"
      data-hero
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(37_34_31/0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgb(37_34_31/0.055)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,transparent_6%,black_50%,transparent_100%)] bg-size-[clamp(4rem,11vw,10rem)_clamp(4rem,11vw,10rem)]" />
      <div
        className="border-ink/25 before:bg-peach after:bg-ink absolute top-[17%] right-[12%] aspect-square w-[clamp(10rem,24vw,22rem)] rounded-full border opacity-80 before:absolute before:inset-[18%] before:rounded-full before:content-[''] after:absolute after:top-[4%] after:right-[12%] after:size-3 after:rounded-full after:content-[''] max-[800px]:top-1/4 max-[800px]:right-[-10%]"
        aria-hidden="true"
        data-hero-orbit
      />
      <p
        className="text-muted text-label inline-flex items-center gap-2.5 leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']"
        data-hero-eyebrow
      >
        Interfaces com intenção
      </p>
      <HeadingSplit
        as="h1"
        id="hero-title"
        className="text-hero max-[480px]:text-hero-mobile relative z-1 my-5 max-w-[13ch] leading-[0.82] font-normal tracking-[-0.105em] max-[480px]:tracking-[-0.11em]"
      >
        Desenvolvimento no{' '}
        <em className="text-peach inline-block font-serif font-normal">detalhe</em>.
      </HeadingSplit>
      <div className="grid grid-cols-[1fr_auto] items-end gap-8 max-[800px]:grid-cols-1 max-[480px]:gap-5">
        <p
          className="text-muted text-intro m-0 max-w-100 leading-tight tracking-[-0.04em]"
          data-hero-intro
        >
          Construo experiências digitais com clareza, personalidade e movimento — da primeira ideia
          ao último detalhe.
        </p>
        <a
          className="text-muted [&>span]:border-ink/15 [&>span]:after:border-ink text-label inline-flex min-h-11 items-center gap-3 font-bold tracking-widest uppercase [&>span]:relative [&>span]:block [&>span]:size-[2.7rem] [&>span]:rounded-full [&>span]:border [&>span]:after:absolute [&>span]:after:top-[0.85rem] [&>span]:after:left-1/2 [&>span]:after:size-[0.45rem] [&>span]:after:-translate-x-1/2 [&>span]:after:rotate-45 [&>span]:after:border-r [&>span]:after:border-b [&>span]:after:content-['']"
          href="#projetos"
          data-scroll-cue
        >
          Deslize <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
