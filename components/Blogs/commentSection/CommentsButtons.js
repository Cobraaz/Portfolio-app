import { Button } from "reactstrap";

const CommentsButtons = ({
  deleteComment,
  loginInUser,
  authId,
  commentId,
  likeComment,
  likes,
  noOfLikes,
  unLikeComment,
}) => {
  const showLikeUnlikeButton = () => {
    if (likes.filter((like) => like.user.toString() === authId).length > 0) {
      return (
        <button
          onClick={(e) => {
            e.preventDefault();
            unLikeComment(e, commentId, authId);
          }}
          className="btn btn-outline-secondary btn-sm justify-content-end blog-like-unlike"
        >
          <i className={`ri-thumb-down-fill clickable icons `}></i>
        </button>
      );
    }
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          likeComment(e, commentId, authId);
        }}
        className="btn btn-outline-secondary btn-sm blog-like-unlike"
      >
        <i className={`ri-thumb-up-fill clickable icons `}></i>
      </button>
    );
  };

  return (
    <>
      <span className="blog-likes-text">
        <span style={{ fontWeight: "500" }}>Likes </span>
        {noOfLikes}
      </span>
      <div style={{ justifyContent: "space-around" }}>
        {loginInUser === authId && (
          <Button
            onClick={(e) => {
              e.preventDefault();
              deleteComment(e, commentId);
            }}
            outline
            color="danger"
            size="sm"
            className="ml-2 justify-content-end blog-delete"
          >
            <i className={`ri-delete-bin-2-fill clickable icons `}></i>
          </Button>
        )}
        {showLikeUnlikeButton()}
      </div>
    </>
  );
};

export default CommentsButtons;
