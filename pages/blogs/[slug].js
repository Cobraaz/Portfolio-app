import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Row, Col } from "reactstrap";
import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import BlogHeader from "components/Blogs/BlogHeader";
import ShowComments from "components/Blogs/commentSection/ShowComments";
import BlogContent from "components/Blogs/BlogContent";
import PreviewAlert from "components/Blogs/PreviewAlert";
import Fallback from "components/Blogs/Fallback";

import { useGetUser } from "actions/user";
import { getBlogBySlug, getAllBlogs } from "lib/api/blogs";
import { formatDate } from "helpers/functions";
import { urlFor } from "lib/api/blogs";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import axios from "axios";

const BlogDetail = ({ blog, preview, slug }) => {
  const [comments, setComments] = useState();

  useEffect(async () => {
    const commentData = await axios.get(
      `http://localhost:3001/api/v1/Blogcomments/getcomment/${slug}`
    );
    // console.log(...commentData.data);
    setComments(commentData.data[0]);
  }, []);

  // console.log(comments);
  const router = useRouter();
  const { data, loading } = useGetUser();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (d, e) => {
    // console.log("d", d);
    const errorMessage = () => {
      if (!d.comment) {
        return "Please first enter comment";
      } else if (!data) {
        return "You are not login";
      } else {
        return "Server Error";
      }
    };

    e.target.reset();
    const combine = {
      ...d,
      data,
      slug,
    };

    if (data && d.comment) {
      const res = await axios.post(
        `http://localhost:3001/api/v1/Blogcomments/${slug}`,
        combine
      );
      // console.log(res.data);
      setComments(res.data);
    } else {
      toast.error(`${errorMessage()}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />;
  }

  if (router.isFallback) {
    console.log("Loading fallback page");
    return <Fallback />;
  }

  return (
    <BaseLayout user={data} loading={loading}>
      <BasePage title="Newest BLogs - Anuj Bansal" className="blog-detail-page">
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
            <hr />
            <ul class="comment-section">
              {/* {console.log("Comments", comments.comments && comments.comments)} */}
              {comments &&
                comments.comments.map((comment, index) => (
                  <ShowComments comments={comment} index={Boolean(index % 2)} />
                ))}
              <li class="write-new">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    placeholder="Write your comment here"
                    name="comment"
                    ref={register}
                  ></textarea>

                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </li>
            </ul>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  // Todo: pass preview to getBlogBySlug and fetch draft Blog, Comments
  const blog = await getBlogBySlug(params.slug, preview);
  // const comments = await axios.get(
  //   `http://localhost:3001/api/v1/Blogcomments/getcomment/${params.slug}`
  // );
  // console.log(comments.data);
  const slug = params.slug;
  // const commentData = comments.data;
  return {
    props: { blog, preview, slug },
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
