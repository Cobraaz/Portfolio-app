import ReactResizeDetector from "react-resize-detector";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import { useGetUser } from "actions/user";
import ContactForm from "components/contact/ContactForm";
import {
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

const Contact = () => {
  const { data, loading } = useGetUser();
  const onSubmit = (data) => console.log(data);
  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <BaseLayout user={data} loading={loading} navClass="with-bg-cv">
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
                  {/* <h3>
                    Get <b>In Touch</b>
                  </h3> */}
                  <h5 style={{ color: "red" }}>This is in development mode</h5>
                  <ContactForm onSubmit={onSubmit} />
                </div>
              </Col>
            </Row>
          </BasePage>
        </BaseLayout>
      )}
    </ReactResizeDetector>
  );
};

export default Contact;
