import { useState } from "react";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import { Row, Col, Button } from "reactstrap";
import { useGetUser } from "actions/user";
import { useRouter } from "next/router";
import ProjectApi from "lib/api/projects";
import Particles from "react-particles-js";
import ProjectCard from "components/ProjectsCard";
import { particlesOptionsProjects } from "helpers";
import { useDeleteProject } from "actions/projects";
import { isAuthorized } from "utils/auth0";

const Projects = ({ projects: initialProjects }) => {
  const router = useRouter();
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
    <BaseLayout
      user={dataU}
      loading={loadingU}
      navClass="transparent"
      className="projects-cover"
    >
      <Particles className="particles" params={particlesOptionsProjects} />
      <BasePage
        indexPage
        title="Portfolio - Anuj Bansal"
        className="projects-page"
      >
        <h1 className="project-header-title">My Recent Works</h1>
        <Row className="mt-3 mb-5">
          {projects &&
            projects.map((project) => {
              return (
                <Col key={project._id} md="4">
                  <ProjectCard data={project}>
                    <>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          className="mr-2 btn btn-info"
                        >
                          Repositery
                        </a>
                      )}

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          className="mr-2 btn btn-success"
                        >
                          Live
                        </a>
                      )}
                      {dataU && isAuthorized(dataU, "admin") && (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                "/projects/[id]/edit",
                                `/projects/${project._id}/edit`
                              );
                            }}
                            className="mr-2"
                            color="warning"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={(e) => _deleteProject(e, project._id)}
                            color="danger"
                          >
                            Del
                          </Button>
                        </>
                      )}
                    </>
                  </ProjectCard>
                </Col>
              );
            })}
        </Row>
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
