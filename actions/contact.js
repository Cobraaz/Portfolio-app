import axios from "axios";
import { useApiHandler } from "actions";

const contactMe = (data) => axios.post("/api/v1/contact", data);

export const useContactMe = () => useApiHandler(contactMe);
