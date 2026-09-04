'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type ProjectShaderGradient from './ProjectShaderGradient';

const LazyProjectShaderGradient = dynamic(() => import('./ProjectShaderGradient'), {
  ssr: false,
  loading: () => null
});

type ProjectShaderGradientProps = ComponentProps<typeof ProjectShaderGradient>;

export default function ProjectShaderGradientLazy(props: ProjectShaderGradientProps) {
  return <LazyProjectShaderGradient {...props} />;
}
