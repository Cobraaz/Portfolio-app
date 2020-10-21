import axios from "axios";
import BaseApi from "./BaseApi";

class BlogCommentsApi extends BaseApi {
  constructor() {
    super("", "/blogcomments");
  }
  getAll(slug) {
    return axios.get(`${this.apiUrl}/getcommentsbyslug/${slug}`);
  }

  update(slug, data) {
    return axios.patch(`${this.apiUrl}/${slug}`, data);
  }
}

export default BlogCommentsApi;
