import { formatDate } from "helpers/functions";
import CommentsButtons from "./CommentsButtons";

const ShowComments = ({
  comments: { text, name, avatar, date, _id, authId },
  loginInUser,
  deleteComment,
  index,
  extra,
}) => {
  return (
    <li className={`comment ${extra ? "author" : "user"}-comment`}>
      <div className="info">
        <div href="#">{name}</div>
        <span>{formatDate(date, "LLLL")}</span>
      </div>

      <div className="avatar" href="#">
        <img src={avatar} width="35" alt="Profile Avatar" title={name} />
      </div>

      <section>
        {text}
        <CommentsButtons
          deleteComment={deleteComment}
          authId={authId}
          index={index}
          commentId={_id}
          loginInUser={loginInUser}
        />
      </section>
    </li>
  );
};

export default ShowComments;
