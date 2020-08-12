import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import { useGetUser } from "actions/user";
import { Row, Col } from "reactstrap";

const Cv = () => {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading} navClass="with-bg-cv">
      <BasePage title="My Experiences - Anuj Bansal">
        <div style={{ paddingTop: "130px" }}>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <iframe
                style={{ width: "100%", height: "800px" }}
                src="/AnujCv.pdf"
              />
            </Col>
          </Row>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default Cv;
