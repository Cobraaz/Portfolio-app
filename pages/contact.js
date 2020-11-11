import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { useGetUser } from "actions/user";
import ContactForm from "components/contact/ContactForm";
import { useContactMe } from "actions/contact";
import Redirect from "components/shared/Redirect";
import { Row, Col, UncontrolledAlert, Spinner } from "reactstrap";
import { toast } from "react-toastify";
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
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const Contact = () => {
  const { dataU, loadingU } = useGetUser();
  const [contactMe, { data, loading, error }] = useContactMe();

  if (data) {
    setTimeout(() => {
      toast.success("Thank You for sending me Feedback", { autoClose: 5000 });
    }, 0);
    return <Redirect to="/" />;
  }

  return (
    <BaseLayout user={dataU} loading={loadingU} navClass="with-bg-contact">
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
            <motion.div
              className="form-wrapper"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h1>Drop a Line</h1>
              <ContactForm onSubmit={contactMe} />
              {loading && (
                <div className="text-center">
                  <Spinner color="info" />
                </div>
              )}
              {error &&
                error.errors.map((err) => (
                  <UncontrolledAlert className="mt-2" color="danger">
                    {err.msg}
                  </UncontrolledAlert>
                ))}
            </motion.div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Contact;
