import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import withAuth from "hoc/withAuth";
import { Row, Col } from "reactstrap";
import ProjectForm from "components/project/ProjectForm";
import { useCreateProject } from "actions/projects";
import Redirect from "components/shared/Redirect";

const ProjectNew = ({ user, loading: userLoading }) => {
  const [createProject, { data, loading, error }] = useCreateProject();

  if (data) {
    return <Redirect to="/projects" />;
  }

  return (
    <BaseLayout user={user} loading={userLoading}>
      <BasePage header="Create Project">
        <Row>
          <Col md="8">
            <ProjectForm onSubmit={createProject} />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(ProjectNew)("admin");
