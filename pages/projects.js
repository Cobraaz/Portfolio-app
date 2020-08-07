import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { Row, Col } from "reactstrap";
import { useGetUser } from "@/actions/user";
import ProjectApi from "@/lib/api/projects";
import Particles from "react-particles-js";
import ProjectCard from "@/components/ProjectsCard";
import { particlesOptionsProjects } from "helpers";

const Projects = ({ projects }) => {
  const { data, loading } = useGetUser();

  return (
    <BaseLayout
      user={data}
      loading={loading}
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
            projects.map((data) => {
              return (
                <Col key={data._id} md="4">
                  <ProjectCard data={data}>
                    <>
                      {data.github && (
                        <a
                          href={data.github}
                          target="_blank"
                          className="mr-2 btn btn-info"
                        >
                          Repositery
                        </a>
                      )}

                      {data.link && (
                        <a
                          href={data.link}
                          target="_blank"
                          className="mr-2 btn btn-success"
                        >
                          Live
                        </a>
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
