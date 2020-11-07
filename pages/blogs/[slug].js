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
import Modal from "components/Modal";

import { useGetUser } from "actions/user";
import { getBlogBySlug, getAllBlogs } from "lib/api/blogs";
import BlogCommentsApi from "lib/api/blogComments";
import { formatDate } from "helpers/functions";
import { urlFor } from "lib/api/blogs";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
// import axios from "axios";

const BlogDetail = ({
  blog,
  preview,
  slug,
  blogCommentData,
  blogcommentId,
}) => {
  const [comments, setComments] = useState(blogCommentData);
  const router = useRouter();
  const { data, loading } = useGetUser();
  const { register, handleSubmit } = useForm();
  const [showModal, setShowModal] = useState(false);

  const toggle = () => setShowModal(false);

  useEffect(() => {
    let navbar = document.getElementsByClassName("port-navbar");
    navbar[0].style.position = "fixed";
    return () => {
      navbar[0].style.position = "";
    };
  }, []);

  useEffect(() => {
    if (!loading && !window.__isModalLoaded) {
      window.__isModalLoaded = true;
      {
        !data && setTimeout(() => setShowModal(true), 5000);
      }
    }
  }, [loading]);

  const onSubmit = async (d, e) => {
    const errorMessage = () => {
      if (!d.comment) {
        return "Please first enter comment";
      } else if (!data) {
        setShowModal(true);
        return "";
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
      if (errorMessage().length > 0) {
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
    }
  };

  const _deleteComment = async (e, commentId) => {
    e.stopPropagation();
    const isConfirm = confirm("Are you sure you want to delete this comment?");
    if (isConfirm) {
      await new BlogCommentsApi().delete(blogcommentId, commentId);

      setComments(comments.filter((p) => p._id !== commentId));
    }
  };

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />;
  }

  if (router.isFallback) {
    console.log("Loading fallback page");
    return <Fallback />;
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div onClick={() => showModal && toggle()}>
      <Modal showModal={showModal} />
      <button size="sm" onClick={scrollToTop} className="scrollToTop">
        <i className="ri-arrow-up-s-fill"></i>
      </button>
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
              <hr />
              <h1>Development Mode</h1>
              <ul className="comment-section">
                {!_.isEmpty(comments) &&
                  comments.map((comment, index) => (
                    <div key={index}>
                      <ShowComments
                        comments={comment}
                        index={index}
                        deleteComment={_deleteComment}
                        loginInUser={data ? data.sub : ""}
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
    </div>
  );
};

export async function getStaticProps({ params, preview = false, previewData }) {
  // Todo: pass preview to getBlogBySlug and fetch draft Blog, Comments
  const blog = await getBlogBySlug(params.slug, preview);
  const { data } = await new BlogCommentsApi().getAll(params.slug);
  const slug = params.slug;
  let [blogComments] = data;
  let blogCommentData = blogComments ? blogComments.comments : [];
  let blogcommentId = blogComments ? blogComments._id : "";
  return {
    props: { blog, preview, slug, blogCommentData, blogcommentId },
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
