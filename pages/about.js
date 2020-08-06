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
    <BaseLayout user={data} loading={loading}>
      <BasePage className="about-page">
        <Row className="mt-5">
          <Col md="6">
            <div className="left-side">
              <h1 className={`title ${createFadeInClass()}`}>Hello, Welcome</h1>
              <h4 className={`subtitle ${createFadeInClass()}`}>
                To About Page
              </h4>
              <p className={`subsubTitle ${createFadeInClass()}`}>
                Feel free to read short description about me.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className={`${createFadeInClass()}`}>
              <p>
                My name is Anuj bansal and I am an Student and freelance
                developer.{" "}
              </p>
              <p>
                I am currently persuing Master's degree in Computer Application
                and and web applications in React.
              </p>
              <p>{/* TODO: something to write */}</p>
            </div>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default About;
