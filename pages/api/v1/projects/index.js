import ProjectApi from "lib/api/projects";
import auth0 from "@/utils/auth0";

export default async function createProject(req, res) {
  try {
    const { accessToken } = await auth0.getSession(req);
    const json = await new ProjectApi(accessToken).create(req.body);
    return res.json(json.data);
  } catch (e) {
    return res.status(e.status || 422).json(e.response.data);
  }
}
