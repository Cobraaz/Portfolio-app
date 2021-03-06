import { useState } from "react";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import { useGetUser } from "actions/user";
import { Row, Button } from "reactstrap";
import FilteringMenu from "components/Blogs/FilteringMenu";
import PreviewAlert from "components/Blogs/PreviewAlert";

import { useGetBlogsPages } from "actions/pagination";
import { getPaginatedBlogs } from "lib/api/blogs";
import { motion } from "framer-motion";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Blogs({ blogs, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  });
  const { data, loading } = useGetUser();

  // loadMore: to load more data
  // isLoadingMore: is true whenever we are making request to fetch data
  // isReachingEnd: is true when we loaded all of the data, data is empty (empty array)

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  });

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage title="Newest Blogs - Anuj Bansal" className="" linkFont>
        <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
          {preview && <PreviewAlert />}
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            <FilteringMenu
              filter={filter}
              onChange={(option, value) => {
                setFilter({ ...filter, [option]: value });
              }}
            />
          </motion.div>
          <hr />
          <motion.div variants={stagger}>
            <Row className="mb-5">{pages}</Row>
          </motion.div>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={loadMore}
              disabled={isReachingEnd || isLoadingMore}
              size="lg"
              outline
              color="secondary"
            >
              {isLoadingMore
                ? "..."
                : isReachingEnd
                ? "No more blogs"
                : "More Blogs"}
            </Button>
          </div>
        </motion.div>
      </BasePage>
    </BaseLayout>
  );
}

export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });
  return {
    props: {
      blogs,
      preview,
    },
    revalidate: 1,
  };
}

export default Blogs;
