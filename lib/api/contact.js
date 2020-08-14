import axios from "axios";

class Contact {
  constructor() {
    this.apiUrl = process.env.PORTFOLIO_API_URL + "/contact";
  }

  create(data) {
    return axios.post(this.apiUrl, data);
  }
}

export default Contact;
