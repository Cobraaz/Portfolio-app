import { formatDate } from "helpers/functions";
import { Button } from "reactstrap";

const ShowComments = ({
  comments: { text, name, avatar, date },
  index,
  extra,
}) => {
  return (
    <li key={index} className={`comment ${extra ? "author" : "user"}-comment`}>
      <div className="info">
        <div href="#">{name}</div>
        <span>{formatDate(date, "LLLL")}</span>
      </div>

      <div className="avatar" href="#">
        <img src={avatar} width="35" alt="Profile Avatar" title={name} />
      </div>

      <p>
        {text}
        <Button
          onClick={(e) => console.log(e)}
          outline
          color="danger"
          size="sm"
          className="ml-2 justify-content-end blog-delete"
        >
          <i className={`ri-delete-bin-2-fill clickable icons `}></i>
        </Button>
        <Button
          // onClick={(e) => deleteCard(e, data._id)}
          outline
          color="secondary"
          size="sm"
          className=" ml-2 justify-content-end blog-like-unlike"
        >
          <i className={`ri-thumb-down-fill clickable icons `}></i>
        </Button>
        <Button
          onClick={(e) => console.log("like")}
          outline
          color="secondary"
          size="sm"
          className="blog-like-unlike"
        >
          <i className={`ri-thumb-up-fill clickable icons `}></i>
        </Button>
      </p>
    </li>
  );
};

export default ShowComments;
