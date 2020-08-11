import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import withAuth from "hoc/withAuth";
import { useRouter } from "next/router";
import { useGetProject } from "actions/projects";
import ProjectForm from "components/ProjectForm";
import { Row, Col } from "reactstrap";
import { useUpdateProject } from "actions/projects";

import { toast } from "react-toastify";

const ProjectEdit = ({ user }) => {
  const router = useRouter();
  const [updateProject, { error }] = useUpdateProject();
  const { data: initialData } = useGetProject(router.query.id);

  const _updateProject = async (data) => {
    await updateProject(router.query.id, data);
    toast.success("Project has been updated!", { autoClose: 2000 });
  };

  return (
    <BaseLayout user={user} loading={false}>
      <BasePage header="Project Edit">
        <Row>
          <Col md="8">
            {initialData && (
              <ProjectForm
                onSubmit={_updateProject}
                initialData={initialData}
              />
            )}
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth(ProjectEdit)("admin");
