import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';

export default function ManifestoSection() {
  return (
    <section
      className="border-ink/15 grid min-h-[80vh] scroll-mt-24 items-center border-y px-[clamp(1.25rem,3vw,3.75rem)] py-32 max-[800px]:min-h-[65vh] max-[480px]:py-22"
      aria-label="Manifesto"
    >
      <div
        className="grid grid-cols-[minmax(8rem,0.4fr)_1fr] gap-8 max-[800px]:grid-cols-1"
        data-blur-reveal
      >
        <p className="text-muted text-label inline-flex items-center gap-2.5 leading-tight font-bold tracking-[0.12em] uppercase before:h-px before:w-7 before:bg-current before:content-['']">
          01 / Manifesto
        </p>
        <div>
          <HeadingSplit
            as="h2"
            className="[&_em]:text-peach text-display-lg m-0 max-w-[11.5ch] leading-[0.88] font-normal tracking-[-0.09em] [&_em]:font-serif [&_em]:font-normal"
            id="manifest"
          >
            Menos ruído<span className="text-peach">.</span>{' '}
            <i className="text-peach">Mais presença</i>
            <span className="text-ink">.</span>
          </HeadingSplit>
          <p className="text-muted text-body-md m-0 mb-3 ml-auto max-w-xs self-end leading-[1.35] tracking-[-0.03em] max-[800px]:ml-0">
            A interface precisa ser rápida de entender, gostosa de usar e impossível de esquecer.
          </p>
        </div>
      </div>
    </section>
  );
}
