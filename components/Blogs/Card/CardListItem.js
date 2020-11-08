import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  CardSubtitle,
} from "reactstrap";
import Link from "next/link";
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

const CardListItem = ({
  title,
  subtitle,
  author,
  link,
  date,
  mode = "normal",
}) => {
  return (
    <Card className={`fj-card fj-card-list ${mode}`}>
      <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`card-body-wrapper`}
      >
        <CardHeader className="d-flex flex-row">
          {mode === "placeholder" ? (
            <div>
              <CardTitle className="font-weight-bold mb-1">
                Placeholder Author
              </CardTitle>
              <CardText className="card-date">Placeholder Date</CardText>
            </div>
          ) : (
            <div>
              <CardTitle className="card-main-title">{title}</CardTitle>
              <CardText className="card-date">{date}</CardText>
            </div>
          )}
        </CardHeader>
        <CardBody>
          {mode === "placeholder" ? (
            <>
              <CardTitle className="card-main-title">
                Placeholder Title
              </CardTitle>
              <CardSubtitle>Placeholder Subtitle</CardSubtitle>
            </>
          ) : (
            <>
              <CardSubtitle>{subtitle}</CardSubtitle>
            </>
          )}
        </CardBody>
      </motion.div>
      {link && (
        <Link {...link}>
          <a className="card-button">Read More</a>
        </Link>
      )}
    </Card>
  );
};

export default CardListItem;
