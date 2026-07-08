'use client';

import React from 'react';

interface SkillCategoryProps {
  title: string;
  items: string[];
}

export default function SkillCategory({ title, items }: SkillCategoryProps) {
  return (
    <div className="skill-category flex flex-col gap-4">
      <h3 className="text-note font-labeltracking-widest uppercase">{title}</h3>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {items.map((item) => (
          <li key={item} className="text-ui text-ink font-nav">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
