import ReactResizeDetector from "react-resize-detector";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { useGetUser } from "actions/user";
import { Row, Col } from "reactstrap";
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

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
                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                  >
                    <iframe
                      style={{ width: "101%", height: "800px" }}
                      src="/AnujCv.pdf"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                  >
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
                  </motion.div>
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
