const ProjectCard = ({ project, onDelete }) => {
  const titleInitials = (project.title || "Project")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <article className="project-card reveal">
      <div className="project-media">
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title} loading="lazy" />
        ) : (
          <div className="project-placeholder" aria-hidden="true">
            <span>{titleInitials}</span>
          </div>
        )}
        {project.featured ? <span className="badge-featured">Featured</span> : null}
      </div>

      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {project.techStack?.length ? (
          <ul className="tech-list">
            {project.techStack.map((item) => (
              <li key={`${project._id || project.title}-${item}`}>{item}</li>
            ))}
          </ul>
        ) : null}

        <div className="project-actions">
          {project.liveUrl ? (
            <a className="btn btn-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          ) : null}
          {project.repoUrl ? (
            <a className="btn btn-secondary" href={project.repoUrl} target="_blank" rel="noreferrer">
              Repository
            </a>
          ) : null}
          {project._id ? (
            <button className="btn btn-danger" type="button" onClick={() => onDelete(project._id)}>
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
