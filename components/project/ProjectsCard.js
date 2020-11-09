import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  CardSubtitle,
  Button,
} from "reactstrap";
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

const ProjectsCard = ({ data, children, i }) => {
  return (
    <Card id={`${i}projectcard`} className="project-card">
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <CardHeader className="project-card-header">{data.header}</CardHeader>
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <CardImg
            top
            width="5%"
            src={data.img}
            alt="Card image cap"
            style={{ height: "180px", width: "100%", display: "block" }}
          />
        </motion.div>
        <CardBody>
          <CardTitle className="project-card-title">{data.title}</CardTitle>
          <CardText className="project-card-text">{data.description}</CardText>
          {children}
        </CardBody>
      </motion.div>
    </Card>
  );
};

export default ProjectsCard;
