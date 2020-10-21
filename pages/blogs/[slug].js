import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Row, Col } from "reactstrap";
import _ from "lodash";

import BaseLayout from "components/layouts/BaseLayout";
import BasePage from "components/layouts/BasePage";
import BlogHeader from "components/Blogs/BlogHeader";
import ShowComments from "components/Blogs/commentSection/ShowComments";
import BlogContent from "components/Blogs/BlogContent";
import PreviewAlert from "components/Blogs/PreviewAlert";
import Fallback from "components/Blogs/Fallback";

import { useGetUser } from "actions/user";
import { getBlogBySlug, getAllBlogs } from "lib/api/blogs";
import BlogCommentsApi from "lib/api/blogComments";
import { formatDate } from "helpers/functions";
import { urlFor } from "lib/api/blogs";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import axios from "axios";

const BlogDetail = ({ blog, preview, slug, commentData }) => {
  // console.log(commentData[0]);
  // const {
  //   [0]: { comments: commentData1 },
  // } = commentData;
  // console.log("comments", commentData1);
  const [comments, setComments] = useState(
    commentData && (commentData[0] || {})
  );
  const router = useRouter();
  const { data, loading } = useGetUser();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (d, e) => {
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
      const json = await new BlogCommentsApi().update(slug, combine);

      setComments(json.data);
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
            <ul className="comment-section">
              {!_.isEmpty(comments) &&
                comments.comments.map((comment, index) => (
                  <div key={index}>
                    <ShowComments
                      comments={comment}
                      index={index}
                      extra={Boolean(index % 2)}
                    />
                  </div>
                ))}
              <li className="write-new">
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
  const json = await new BlogCommentsApi().getAll(params.slug);
  const slug = params.slug;
  const commentData = {
    ...json.data,
  };
  return {
    props: { blog, preview, slug, commentData },
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
