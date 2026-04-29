import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
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
