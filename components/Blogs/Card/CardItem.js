import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
} from "reactstrap";
import Link from "next/link";
import { urlFor } from "lib/api/blogs";
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

const CardItem = ({
  title,
  subtitle,
  image,
  date,
  author,
  link,
  mode = "normal",
}) => {
  return (
    <Card className={`fj-card ${mode}`}>
      <motion.div
        variants={fadeInUp}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="card-body-wrapper"
      >
        <CardHeader className="d-flex flex-row">
          <div>
            {mode === "placeholder" ? (
              <>
                <CardTitle className="card-main-title">
                  Placeholder Title
                </CardTitle>
                <CardText className="card-date">Placeholder Date</CardText>
              </>
            ) : (
              <>
                <CardTitle className="card-main-title">
                  {/* {" "} */}
                  {title.length > 40 ? subtitle.substr(0, 40) + "..." : title}
                </CardTitle>
                <CardText className="card-date">{date}</CardText>
              </>
            )}
          </div>
        </CardHeader>
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="view overlay"
        >
          {mode === "placeholder" ? (
            <div className="image-placeholder" />
          ) : (
            <CardImg
              src={urlFor(image).height(300).crop("center").fit("clip").url()}
              alt="Card image cap"
            />
          )}
        </motion.div>
        <CardBody>
          {mode === "placeholder" ? (
            <>
              <CardTitle>Placeholder Title</CardTitle>
            </>
          ) : (
            <>
              <CardSubtitle>
                {subtitle.length > 40
                  ? subtitle.substr(0, 40) + "..."
                  : subtitle}
              </CardSubtitle>
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

export default CardItem;
