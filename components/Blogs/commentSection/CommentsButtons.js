import { Button } from "reactstrap";

const CommentsButtons = ({
  index,
  deleteComment,
  loginInUser,
  authId,
  commentId,
}) => {
  return (
    <>
      <span className="blog-likes-text">
        <span style={{ fontWeight: "500" }}>Likes </span>
        {index}
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
      </div>
    </>
  );
};

export default CommentsButtons;
