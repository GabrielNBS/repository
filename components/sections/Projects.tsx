import projects from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="w-full">
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <div key={index} className="w-full">
            <ProjectCard
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
          </div>
        ))}
      </div>
    </section>
  );
}
