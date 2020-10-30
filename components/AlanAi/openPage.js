const openPage = (page) => {
  if (page.includes("index") || page.includes("home")) {
    return "/";
  } else if (page.includes("about")) {
    return "/about";
  } else if (page.includes("port")) {
    return "/portfolios";
  } else if (page[0] === "b") {
    return "/blogs";
  } else if (page.includes("cv")) {
    return "/cv";
  } else if (page.includes("con")) {
    return "/contact";
  } else if (page.includes("login")) {
    console.log("from login");
    return "/api/v1/login";
  } else {
    return null;
  }
};

export default openPage;
