'use client';

interface ServiceCardProps {
  title: string;
  description: string;
}

export default function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <article className="service-card p-card flex flex-col bg-[rgb(255,255,255,0.74)]">
      <h3 className="mb-title-gap font-title tracking-normal text-black">{title}</h3>
      <p className="text-muted text-body">{description}</p>
    </article>
  );
}
