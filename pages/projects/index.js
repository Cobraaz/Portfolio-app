import { useState } from "react";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { Row, Col } from "reactstrap";
import { useGetUser } from "actions/user";
import ProjectApi from "lib/api/projects";
import ProjectCard from "components/project/ProjectsCard";
import { useDeleteProject } from "actions/projects";
import { isAuthorized } from "utils/auth0";
import {
  CardDeleteButton,
  CardEditButton,
} from "components/shared/CardButtons";
import { motion } from "framer-motion";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Projects = ({ projects: initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [deleteProject, { data, error }] = useDeleteProject();
  const { data: dataU, loading: loadingU } = useGetUser();

  const _deleteProject = async (e, projectId) => {
    e.stopPropagation();
    const isConfirm = confirm(
      "Are you sure you want to delete this portfolio?"
    );
    if (isConfirm) {
      await deleteProject(projectId);
      setProjects(projects.filter((p) => p._id !== projectId));
    }
  };

  return (
    <BaseLayout user={dataU} loading={loadingU}>
      <BasePage title="Newest Projects - Anuj Bansal" className="projects-page">
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <h1 className="project-header-title">My Recent Works</h1>
          <motion.div variants={stagger} initial="initial" animate="animate">
            <Row className="mt-3 mb-5">
              {projects &&
                projects.map((project, i) => {
                  return (
                    <Col key={project._id} lg="4" md="6">
                      <ProjectCard data={project} i={i}>
                        <>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              className="mr-2 btn btn-info btn-sm"
                            >
                              Repositery{" "}
                              <i
                                style={{ verticalAlign: "middle" }}
                                className={`ri-git-repository-fill mr-2 clickable icons `}
                              ></i>
                            </a>
                          )}

                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              className="mr-2 btn btn-success btn-sm"
                            >
                              Live{" "}
                              <i
                                style={{ verticalAlign: "middle" }}
                                className={`ri-links-fill mr-2 clickable icons `}
                              ></i>
                            </a>
                          )}
                          {dataU && isAuthorized(dataU, "admin") && (
                            <>
                              <CardEditButton to={"projects"} data={project} />
                              <CardDeleteButton
                                data={project}
                                deleteCard={_deleteProject}
                              />
                            </>
                          )}
                        </>
                      </ProjectCard>
                    </Col>
                  );
                })}
            </Row>
          </motion.div>
        </motion.div>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const json = await new ProjectApi().getAll();
  const projects = json.data;
  return {
    props: { projects },
    revalidate: 1,
  };
}

export default Projects;
