const pageName = (name) => {
  if (name.includes("portfolios")) {
    return "portfolios";
  } else if (name.includes("blogs")) {
    if (name.split("/")[1]) return name.split("/")[1].replace(/-/g, " ");
    return "blogs";
  } else {
    return name === "" ? "Home page" : name;
  }
};

export default pageName;
