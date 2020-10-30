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

const ProjectsCard = ({ data, children, i }) => {
  return (
    <Card id={`${i}projectcard`} className="project-card">
      <CardHeader className="project-card-header">{data.header}</CardHeader>

      <CardImg
        top
        width="5%"
        src={data.img}
        alt="Card image cap"
        style={{ height: "180px", width: "100%", display: "block" }}
      />
      <CardBody>
        <CardTitle className="project-card-title">{data.title}</CardTitle>
        <CardText className="project-card-text">{data.description}</CardText>
        {children}
      </CardBody>
    </Card>
  );
};

export default ProjectsCard;
