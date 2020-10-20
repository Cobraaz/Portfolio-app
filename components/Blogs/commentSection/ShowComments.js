import { formatDate } from "helpers/functions";

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

      <p>{text}</p>
    </li>
  );
};

export default ShowComments;
