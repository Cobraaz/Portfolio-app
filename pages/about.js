import { useEffect } from "react";
import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { Row, Col } from "reactstrap";

const About = () => {
  const { data, loading } = useGetUser();

  useEffect(() => {
    return () => {
      window.__isAboutLoadeded = true;
    };
  }, []);

  const createFadeInClass = () => {
    if (typeof window !== "undefined") {
      return window.__isAboutLoadeded ? "" : "fadein";
    }

    return "fadein";
  };

  return (
    <BaseLayout user={data} loading={loading} navClass="with-bg-about">
      <BasePage className="about-page">
        <Row className="">
          <Col md="6">
            <div className="left-side">
              <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
              <h4 className={`subtitle ${createFadeInClass()}`}>
                To About Page
              </h4>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                Feel free to read short description about me.
              </p>
              <a
                href="https://www.facebook.com/anuj.bansal.739"
                target="_"
                className="nounderline"
              >
                <i
                  className={`ri-facebook-fill mr-2 clickable icons ${createFadeInClass()}`}
                ></i>
              </a>
              <a
                href="https://github.com/Cobraaz"
                target="_"
                className="nounderline"
              >
                <i
                  className={`ri-github-fill clickable icons ${createFadeInClass()}`}
                ></i>
              </a>
            </div>
          </Col>
          <Col md="6">
            <div className={`subsubTitle ${createFadeInClass()}`}>
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
            </div>
          </Col>
          <Col md="12" className="">
            <div style={{ textAlign: "center" }}>
              <i
                className={`ri-code-box-line code-icons ${createFadeInClass()}`}
              ></i>

              <h5 className={`code-title ${createFadeInClass()}`}>
                Full-stack Developer
              </h5>
              <div className={`code-subsubtitle ${createFadeInClass()}`}>
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
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
