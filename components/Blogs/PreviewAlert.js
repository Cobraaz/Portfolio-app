import { Alert } from "reactstrap";

export default function PreviewAlert() {
  return (
    <Alert color="secondary">
      This is the preview mode!{" "}
      {/* TODO: This will lead me to API route that will remove preview cookies */}
      <a href="/api/v1/blogs/exit-preview">Leave preview mode</a>
    </Alert>
  );
}
