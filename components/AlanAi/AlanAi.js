import { useEffect } from "react";
import { useRouter } from "next/router";
import openPage from "components/AlanAi/openPage";

const AlanAi = () => {
  const router = useRouter();
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    // let moving = 150;
    alanBtn({
      key: process.env.ALAN_AI,
      rootEl: document.getElementById("alan-btn"),
      onCommand: ({ command, page, blog, repositoryLink, article }) => {
        switch (command) {
          case "project-open":
            router.push(`${process.env.BASE_URL}/projects`);
            break;
          case "project-current":
            let isMobile = /iPhone|iPad|iPod|Android/i.test(
              navigator.userAgent
            );
            if (isMobile) {
              // document.getElementById("themeChangeButtonId").click();
              let elem = document.getElementById(`${article}projectcard`);
              elem.scrollIntoView({
                behavior: "smooth",
              });
              // window.scrollTo({
              //   top: moving,
              //   behavior: "smooth",
              // });
              // moving = moving + 400;
            } else {
              if (article % 3 === 0) {
                // window.scrollTo({
                //   top: article * 150,
                //   behavior: "smooth",
                // });
                let elem = document.getElementById(`${article}projectcard`);
                elem.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }

            break;
          case "repository-open":
            console.log("repository-open");
            window.open(repositoryLink, "_blank");
            break;

          case "OpenPages":
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
