import { Button } from "reactstrap";
import { useRouter } from "next/router";

export const CardEditButton = ({ to, data }) => {
  const router = useRouter();
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/${to}/[id]/edit`, `/${to}/${data._id}/edit`);
      }}
      className="mr-2"
      color="warning"
      size="sm"
    >
      <i className={`ri-edit-2-fill clickable icons `}></i>
    </Button>
  );
};

export const CardDeleteButton = ({ data, deleteCard }) => (
  <Button onClick={(e) => deleteCard(e, data._id)} color="danger" size="sm">
    <i className={`ri-delete-bin-2-fill clickable icons `}></i>
  </Button>
);
