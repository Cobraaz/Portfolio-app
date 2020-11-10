import { useState } from "react";
import { formatDate } from "helpers/functions";
import CommentsButtons from "./CommentsButtons";
import BlogCommentsApi from "lib/api/blogComments";
import { toast } from "react-toastify";

const ShowComments = ({
  comments: { text, name, avatar, date, _id, authId, likes },
  loginInUser,
  deleteComment,
  extra,
  blogcommentId,
}) => {
  const [commentLikes, setCommentLikes] = useState(likes);
  const [noOfLikes, setNoOfLikes] = useState(likes.length);

  const _likeComment = async (e, commentId, authId) => {
    e.stopPropagation();
    try {
      setNoOfLikes(noOfLikes + 1);
      setCommentLikes([{ user: authId }, ...commentLikes]);

      const { data: commentlikes } = await new BlogCommentsApi().like(
        blogcommentId,
        commentId,
        authId
      );

      setNoOfLikes(commentlikes.length);
      setCommentLikes(commentlikes);
    } catch (err) {
      console.error(err.message);
      toast.error(`Server Error`);
    }
  };

  const _unLikeComment = async (e, commentId, authId) => {
    e.stopPropagation();
    try {
      setNoOfLikes(noOfLikes - 1);
      const removeIndex = await commentLikes
        .map((like) => like.user.toString())
        .indexOf(authId);
      if (removeIndex !== -1) {
        setCommentLikes((commentLikes) =>
          commentLikes.filter((_, i) => i !== removeIndex)
        );
      }

      const { data: commentlikes } = await new BlogCommentsApi().unLike(
        blogcommentId,
        commentId,
        authId
      );

      setNoOfLikes(commentlikes.length);
      setCommentLikes(commentlikes);
    } catch (err) {
      console.error(err.message);
      toast.error(`Server Error`);
    }
  };

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
          commentId={_id}
          loginInUser={loginInUser}
          likeComment={_likeComment}
          likes={commentLikes}
          noOfLikes={noOfLikes}
          unLikeComment={_unLikeComment}
        />
      </section>
    </li>
  );
};

export default ShowComments;
