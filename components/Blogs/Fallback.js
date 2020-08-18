import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { useGetUser } from "actions/user";

const Fallback = () => {
  const { data, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage
        title={`Blogs - Anuj Bansal`}
        className="blog-detail-page"
        linkFont
      >
        Loading...
      </BasePage>
    </BaseLayout>
  );
};

export default Fallback;
