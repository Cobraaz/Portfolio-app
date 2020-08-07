import BaseApi from "./BaseApi";

class ProjectApi extends BaseApi {
  constructor() {
    super(null, "/projects");
  }
}

export default ProjectApi;
