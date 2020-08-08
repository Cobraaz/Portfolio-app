import axios from "axios";
import BaseApi from "./BaseApi";

class ProjectApi extends BaseApi {
  constructor(accessToken) {
    super(accessToken, "/projects");
  }

  delete(id) {
    return axios.delete(`${this.apiUrl}/${id}`, this.config);
  }
}

export default ProjectApi;
