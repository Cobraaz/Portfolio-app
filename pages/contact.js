import ReactResizeDetector from "react-resize-detector";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import { useGetUser } from "actions/user";
import {
  Row,
  Col,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Label,
} from "reactstrap";

const Contact = () => {
  const { data, loading } = useGetUser();

  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <BaseLayout user={data} loading={loading} navClass="with-bg-cv">
          <BasePage
            title="My Experiences - Anuj Bansal"
            // header="Drop a Line"
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
                  <h4 style={{ color: "red" }}>This is in development mode</h4>
                  <form>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend" className="input">
                        <InputGroupText>
                          <i className="ri-user-fill"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="FullName" />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ri-mail-send-fill"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Email" />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ri-message-3-fill"></i>
                        </InputGroupText>
                      </InputGroupAddon>

                      <Input
                        type="textarea"
                        name="text"
                        id="exampleText"
                        placeholder="Message"
                      />
                    </InputGroup>
                    <InputGroup>
                      <Button
                        color="primary"
                        onClick={() => alert("This is in development mode")}
                        block
                      >
                        <i
                          className="ri-save-2-line"
                          style={{ float: "left" }}
                        ></i>{" "}
                        Submit
                      </Button>
                    </InputGroup>
                  </form>
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
