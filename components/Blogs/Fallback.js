import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/BasePage";
import { useGetUser } from "actions/user";

const Fallback = () => {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage
        title={`Blogs - Anuj Bansal`}
        className="page-wrapper blog-detail-page"
        linkFont
      >
        Loading...
      </BasePage>
    </BaseLayout>
  );
};

export default Fallback;
