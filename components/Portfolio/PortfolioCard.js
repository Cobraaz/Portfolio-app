import { Card, CardHeader, CardBody, CardText, CardTitle } from "reactstrap";
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

const PortfolioCard = ({ portfolio, children }) => (
  <Card className="portfolio-card">
    <motion.div variants={fadeInUp} whileTap={{ scale: 0.95 }}>
      <CardHeader className="portfolio-card-header">
        {portfolio.jobTitle}
      </CardHeader>
      <CardBody>
        <p className="portfolio-card-city">{portfolio.location}</p>
        <CardTitle className="portfolio-card-title">
          {portfolio.title}
        </CardTitle>
        <CardText className="portfolio-card-text">
          {portfolio.description}
        </CardText>
        {children}
      </CardBody>
    </motion.div>
  </Card>
);

export default PortfolioCard;
