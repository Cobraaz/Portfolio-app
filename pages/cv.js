import ReactResizeDetector from "react-resize-detector";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import { useGetUser } from "actions/user";
import { Row, Col } from "reactstrap";

const Cv = () => {
  const { data, loading } = useGetUser();

  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => (
        <BaseLayout user={data} loading={loading} navClass="with-bg-cv">
          <BasePage title="My Experiences - Anuj Bansal">
            <Row>
              <Col md={{ size: 8, offset: 2 }}>
                {width > 1500 ? (
                  <div>
                    <iframe
                      style={{ width: "101%", height: "800px" }}
                      src="/AnujCv.pdf"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src="/images/AnujCvImg.jpg"
                      style={{ width: "100%", height: "500px" }}
                    />
                    <a
                      style={{ backgroundColor: "#4f90cd", border: "#4f90cd" }}
                      href="/AnujCv.pdf"
                      className="mt-3 btn btn-success btn-sm"
                      download
                    >
                      Download{" "}
                      <i
                        className={`ri-download-2-line mr-2 clickable icons `}
                      ></i>
                    </a>
                  </div>
                )}
              </Col>
            </Row>
          </BasePage>
        </BaseLayout>
      )}
    </ReactResizeDetector>
  );
};

export default Cv;
