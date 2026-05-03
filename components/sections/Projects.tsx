import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectsShowcase from "./ProjectsShowcase";

interface ProjectsProps {
  variation?: "list" | "showcase";
}

export default function Projects({ variation = "showcase" }: ProjectsProps) {
  if (variation === "showcase") {
    return <ProjectsShowcase />;
  }

  return (
    <>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          id={project.id}
          name={project.name}
          title={project.title}
          description={project.description}
          techs={project.techs.map((tech) => tech.name)}
          mockups={[
            project.mockups.mobile,
            project.mockups.tablet,
            project.mockups.desktop,
          ]}
          deploy={project.deploy}
          github={project.github}
          isNew={project.isNew}
          bgColor={project.bgColor}
        />
      ))}
    </>
  );
}
