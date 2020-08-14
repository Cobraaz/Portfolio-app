import Contact from "lib/api/contact";

export default async function contactMe(req, res) {
  try {
    const json = await new Contact().create(req.body);
    return res.json(json.data);
  } catch (e) {
    return res.status(e.status || 422).json(e.response.data);
  }
}
