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
      <div className="card-body-wrapper">
        <CardHeader className="d-flex flex-row">
          <img
            src={author?.avatar || "https://via.placeholder.com/150"}
            className="rounded-circle mr-3"
            height="50px"
            width="50px"
            alt="avatar"
          />
          <div>
            {mode === "placeholder" ? (
              <>
                <CardTitle className="font-weight-bold mb-1 px-5">
                  Placeholder Title
                </CardTitle>
                <CardText className="card-date">Placeholder Date</CardText>
              </>
            ) : (
              <>
                <CardTitle className="font-weight-bold mb-1">
                  {author?.name}
                </CardTitle>
                <CardText className="card-date">{date}</CardText>
              </>
            )}
          </div>
        </CardHeader>
        <div className="view overlay">
          {mode === "placeholder" ? (
            <div className="image-placeholder" />
          ) : (
            <CardImg
              src={urlFor(image).height(300).crop("center").fit("clip").url()}
              alt="Card image cap"
            />
          )}
        </div>
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
              <CardTitle className="card-main-title">
                {" "}
                {title.length > 40 ? subtitle.substr(0, 40) + "..." : title}
              </CardTitle>
              <CardSubtitle>
                {subtitle.length > 40
                  ? subtitle.substr(0, 40) + "..."
                  : subtitle}
              </CardSubtitle>
            </>
          )}
        </CardBody>
      </div>
      {link && (
        <Link {...link}>
          <a className="card-button">Read More</a>
        </Link>
      )}
    </Card>
  );
};

export default CardItem;
