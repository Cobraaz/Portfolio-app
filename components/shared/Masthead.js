import { Container, Row, Button } from "reactstrap";
import { Slide } from "react-slideshow-image";

const slideImages = [
  "/images/home-bg.jpg",
  "/images/home-bg2.jpg",
  "/images/home-bg3.jpg",
];

const Masthead = ({ children }) => (
  <Slide
    duration={3000}
    arrows={false}
    transitionDuration={1400}
    pauseOnHover={false}
  >
    {slideImages.map((slideImage, index) => (
      <div
        key={index}
        className="masthead"
        style={{ backgroundImage: `url(${slideImage})` }}
      >
        <div className="overlay"></div>
        <Container>
          <Row>
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">{children}</div>
            </div>
          </Row>
        </Container>
      </div>
    ))}
  </Slide>
);

export default Masthead;
