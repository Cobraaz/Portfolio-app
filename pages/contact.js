import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import { useGetUser } from "actions/user";
import ContactForm from "components/contact/ContactForm";
import { useContactMe } from "actions/contact";
import Redirect from "components/shared/Redirect";
import { Row, Col, UncontrolledAlert } from "reactstrap";

const Contact = () => {
  const { dataU, loadingU } = useGetUser();
  const [contactMe, { data, loading, error }] = useContactMe();

  if (data) {
    return <Redirect to="/" />;
  }

  return (
    <BaseLayout user={dataU} loading={loadingU} navClass="with-bg-cv">
      <BasePage
        title="My Experiences - Anuj Bansal"
        className="contact-page wrapper"
      >
        <Row>
          <Col
            md={{ size: 6, offset: 3 }}
            sm={{ size: 6, offset: 3 }}
            xs={{ size: 12 }}
          >
            <div className="form-wrapper">
              <h1>Drop a Line</h1>

              {/* <h5 style={{ color: "red" }}>This is in development mode</h5> */}
              <ContactForm onSubmit={contactMe} />
              {error &&
                error.errors.map((err) => (
                  <UncontrolledAlert className="mt-2" color="danger">
                    {err.msg}
                  </UncontrolledAlert>
                ))}
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Contact;
