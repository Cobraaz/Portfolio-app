import axios from "axios";
import BaseApi from "./BaseApi";

class BlogCommentsApi extends BaseApi {
  constructor() {
    super("", "/blogcomments");
  }
  getAll(slug) {
    return axios.get(`${this.apiUrl}/comments/${slug}`);
  }

  update(slug, data) {
    return axios.patch(`${this.apiUrl}/${slug}`, data);
  }
  delete(blogcommentId, commentId) {
    axios.delete(`${this.apiUrl}/comments/${blogcommentId}/${commentId}`);
  }
}

export default BlogCommentsApi;
