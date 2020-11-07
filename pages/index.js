import { useState, useRef, useEffect } from "react";
import BaseLayout from "components/layouts/BaseLayout";
import { Container, Row, Col } from "reactstrap";
import BasePage from "components/layouts/BasePage";
import Typed from "react-typed";
import { useGetUser } from "actions/user";
import Particles from "react-particles-js";
import { ROLES, particlesOptionsIndex } from "helpers";
import Link from "next/link";
import AlanAi from "components/AlanAi/AlanAi";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.5, duration: 1.5 },
  },
  exit: {
    x: "-100vh",
    transition: { ease: "easeInOut" },
  },
};

const nextVariants = {
  hidden: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 20 },
  },
};

const buttonVariants = {
  hover: {
    color: "#fff",
    scale: 1.3,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.2,
      yoyo: Infinity,
    },
  },
};

const Index = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { data, loading } = useGetUser();
  const flipInterval = useRef();

  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current);
  }, []);
  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping((prevFlipping) => !prevFlipping);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      window.__isIndexLoadeded = true;
    };
  }, []);

  const createAlanBtnOneTime = () => {
    if (typeof window !== "undefined") {
      return window.__isIndexLoadeded ? null : <AlanAi />;
    }
    return <AlanAi />;
  };

  return (
    <BaseLayout
      user={data}
      loading={loading}
      indexPage
      navClass="transparent"
      footer
      className={`cover ${isFlipping ? "cover-orange" : "cover-blue"}`}
    >
      {createAlanBtnOneTime()}
      <Particles className="particles" params={particlesOptionsIndex} />
      <BasePage indexPage title="Portfolio - Anuj Bansal">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover={buttonVariants}
          className="main-section"
        >
          <div className="background-image">
            <img src="/images/background-index.png" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? "isFlipping" : ""}`}>
                    <div className="front">
                      <div className="image image-1">
                        <div className="hero-section-content">
                          <h2> Full Stack Developer </h2>
                          <div className="hero-section-content-intro">
                            Have a look at my portfolio and recent works.
                          </div>
                        </div>
                      </div>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="image image-2">
                        <div className="hero-section-content">
                          <h2>React and Next is Amazing!</h2>
                          <div className="hero-section-content-intro">
                            Software developer ready for a project of any type!
                          </div>
                        </div>
                      </div>
                      <div className="shadow-custom shadow-custom-orange">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of{" "}
                    <b style={{ fontWeight: "700" }}>Anuj Bansal</b>. Get
                    informed, collaborate and discover projects I was working on
                    through the Months!
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={70}
                  backSpeed={70}
                  strings={ROLES}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  className="self-typed"
                  cursorChar="|"
                />
                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
                <motion.div
                  variants={nextVariants}
                  className="hero-welcome-bio"
                >
                  <Link href="/projects">
                    <motion.a
                      variants={buttonVariants}
                      whileHover="hover"
                      className="btn btn-index"
                    >
                      <i
                        className="ri-send-plane-line "
                        style={{ verticalAlign: "middle" }}
                      ></i>{" "}
                      LET'S GO
                    </motion.a>
                  </Link>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </motion.div>
      </BasePage>
    </BaseLayout>
  );
};

export default Index;
