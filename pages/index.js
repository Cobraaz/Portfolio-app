import { useState, useRef, useEffect } from "react";
import BaseLayout from "components/layouts/BaseLayout";
import { Container, Row, Col } from "reactstrap";
import BasePage from "components/layouts/BasePage";
import Typed from "react-typed";
import { useGetUser } from "actions/user";
import Particles from "react-particles-js";
import { ROLES, particlesOptionsIndex } from "helpers";
import Link from "next/link";
import AlanAi from "components/AlanAi";

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
        <div className="main-section">
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
                <div className="hero-welcome-bio">
                  <Link href="/projects">
                    <a className="btn btn-index">
                      <i
                        className="ri-send-plane-line "
                        style={{ verticalAlign: "middle" }}
                      ></i>{" "}
                      LET'S GO
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default Index;
