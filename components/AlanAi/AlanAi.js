import { useEffect } from "react";
import { useRouter } from "next/router";
import openPage from "components/AlanAi/openPage";

const AlanAi = () => {
  const router = useRouter();
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");

    alanBtn({
      key: process.env.ALAN_AI,
      rootEl: document.getElementById("alan-btn"),
      onCommand: ({ command, page, blog, repositoryLink, article }) => {
        switch (command) {
          case "project-open":
            router.push(`${process.env.BASE_URL}/projects`);
            break;

          case "project-current":
            let elemOld = document.getElementById(
              `${article > 0 ? article - 1 : article}projectcard`
            );
            elemOld.style.borderBottom = "none";

            let elemNew = document.getElementById(`${article}projectcard`);
            elemNew.scrollIntoView({
              behavior: "smooth",
            });
            elemNew.style.borderBottom = "10px solid #CCF11D";
            break;

          case "repository-open":
            console.log("repository-open");
            document
              .getElementById(`${repositoryLink}projectcard`)
              .getElementsByTagName("a")[0]
              .click();
            break;

          case "OpenPages":
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            const found = openPage(page);
            if (found) {
              router.push(`${process.env.BASE_URL}${found}`);
              alanBtn().playText(
                "(opening...|ok|yeah taking|working on it|alright)"
              );
            } else {
              alanBtn().playText("Sorry i can't take you there");
            }
            break;

          case "Blog":
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            router.push(`${process.env.BASE_URL}/blogs/${blog}`);

            alanBtn().play("(opening...|ok|yeah taking|working on it|alright)");
            break;

          case "theme-change":
            document.getElementById("themeChangeButtonId").click();
            break;
        }
      },
    });
  }, []);
  return null;
};

export default AlanAi;
