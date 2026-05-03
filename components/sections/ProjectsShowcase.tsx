import React from 'react';
import projects from "@/data/projects";
import { AppleFeatureShowcase } from "../apple-feature-showcase";

const ProjectsShowcase: React.FC = () => {
  return (
    <div className="py-20 bg-black overflow-hidden">
      <div className="mb-20 text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Projetos em Destaque
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Uma seleção dos meus trabalhos mais recentes, focados em performance, 
          design e experiência do usuário.
        </p>
      </div>
      
      <div className="flex flex-col gap-24 md:gap-32">
        {projects.map((project) => (
          <div key={project.id} className="w-full">
            <AppleFeatureShowcase project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsShowcase;
