import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import BlogHeader from "components/Blogs/BlogHeader";
import { Row, Col, Container } from "reactstrap";
import { useGetUser } from "actions/user";
import { getBlogBySlug, getAllBlogs } from "lib/api/blogs";
import PreviewAlert from "components/Blogs/PreviewAlert";
import BlogContent from "components/Blogs/BlogContent";
import { formatDate } from "helpers/functions";
import { urlFor } from "lib/api/blogs";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import Fallback from "components/Blogs/Fallback";

const BlogDetail = ({ blog, preview }) => {
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />;
  }

  if (router.isFallback) {
    console.log("Loading fallback page");
    return <Fallback />;
  }

  const { data, loading } = useGetUser();
  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage
        title="Newest BLogs - Anuj Bansal"
        className="blog-detail-page"
      >
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            {preview && <PreviewAlert />}
            <BlogHeader
              title={blog.title}
              subtitle={blog.subtitle}
              coverImage={urlFor(blog.coverImage).height(600).url()}
              author={blog.author}
              date={formatDate(blog.date, "LL")}
            />
            <hr />
            {blog.content && <BlogContent content={blog.content} />}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  // Todo: pass preview to getBlogBySlug and fetch draft blog
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: { blog, preview },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
  return {
    paths,
    fallback: true,
  };
}

export default BlogDetail;
