import { useEffect } from "react";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { useGetUser } from "actions/user";
import { Row, Col } from "reactstrap";
import { motion } from "framer-motion";

const nextVariants = {
  hidden: {
    x: "-100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      when: "beforeParent",
      delay: 0.2,
    },
  },
};

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      staggerChildren: 0.4,
      mass: 1.4,
      stiffness: 80,
      damping: 13,
      delay: 0.9,
    },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const childVariantsHover = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.9,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: [1, 2, 2, 1, 1],
    rotate: [0, 0, 270, 270, 0],
    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    transition: {
      duration: 1.4,
    },
  },
};

const About = () => {
  const { data, loading } = useGetUser();
  useEffect(() => {
    return () => {
      window.__isAboutLoadeded = true;
    };
  }, []);

  const createContainerVariants = () => {
    if (typeof window !== "undefined") {
      return window.__isAboutLoadeded ? "" : containerVariants;
    }

    return containerVariants;
  };

  const createNextVariants = () => {
    if (typeof window !== "undefined") {
      return window.__isAboutLoadeded ? "" : nextVariants;
    }

    return nextVariants;
  };

  const createChildVariants = () => {
    if (typeof window !== "undefined") {
      return window.__isAboutLoadeded ? "" : childVariants;
    }

    return childVariants;
  };
  return (
    <BaseLayout user={data} loading={loading} navClass="with-bg-about">
      <BasePage className="about-page">
        <Row className="">
          <Col md="6">
            <div className="left-side">
              <motion.h1
                variants={createNextVariants()}
                initial="hidden"
                animate="visible"
                className={`title`}
              >
                Hello, Welcome
              </motion.h1>
              <motion.div
                variants={createContainerVariants()}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h4 className={`subtitle`}>To About Page</h4>
                <p className={`subsubTitle`}>
                  Feel free to read short description about me.
                </p>
              </motion.div>
            </div>
          </Col>
          <Col md="6">
            <motion.div
              variants={createContainerVariants()}
              initial="hidden"
              animate="visible"
              className={`subsubTitle mt-3`}
            >
              <h5 style={{ fontWeight: "bolder" }}>
                Hi, I’m Anuj Bansal. I'm a multi-talented human with over 6+
                months of experiences in Reactjs and Node.js.
              </h5>
              <p>
                I am currently persuing Master's degree in Computer Application.
              </p>
              <p>
                You can also call me a Coder, Experience Developer,Full Stack
                Developer or by any other market defined function-title. I
                prefer to keep learning, continue challenging myself, and do
                interesting things that matter. My abundant energy fuels me in
                the pursuit of many interests, hobbies, areas of study and
                artistic endeavors. I’m a fast learner, able to pick up new
                skills and juggle different projects and roles with relative
                ease.
              </p>
            </motion.div>
          </Col>
          <Col md="12" className="">
            <motion.div
              variants={createChildVariants()}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              style={{ textAlign: "center" }}
            >
              <motion.div variants={buttonVariants} whileHover="hover">
                <i className={`ri-code-box-line code-icons `}></i>
              </motion.div>
              <motion.div variants={childVariantsHover} whileHover="hover">
                <h5 className={`code-title `}>Full-stack Developer</h5>
                <div>
                  <p>
                    I like to code things from scratch, and enjoy bringing ideas
                    to life in the browser.
                  </p>

                  <p style={{ color: "#7510f7", fontSize: "25px" }}>
                    Languages I speak:
                  </p>
                  <p>
                    HTML, CSS,Javascript, Reactjs, MongoDB, Express, Nodejs,
                    Nextjs
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
