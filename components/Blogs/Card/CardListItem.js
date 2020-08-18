import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardHeader,
  CardSubtitle,
} from "reactstrap";
import Link from "next/link";

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
      <div className={`card-body-wrapper`}>
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
      </div>
      {link && (
        <Link {...link}>
          <a className="card-button">Read More</a>
        </Link>
      )}
    </Card>
  );
};

export default CardListItem;
