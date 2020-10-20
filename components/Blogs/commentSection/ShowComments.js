import { formatDate } from "helpers/functions";

const ShowComments = ({ comments: { text, name, avatar, date }, index }) => {
  return (
    <li className={`comment ${index ? "author" : "user"}-comment`}>
      <div className="info">
        <div href="#">{name}</div>
        <span>{formatDate(date, "LL")}</span>
      </div>

      <div className="avatar" href="#">
        <img src={avatar} width="35" alt="Profile Avatar" title={name} />
      </div>

      <p>{text}</p>
    </li>
  );
};

export default ShowComments;
