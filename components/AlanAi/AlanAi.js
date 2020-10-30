import { useEffect } from "react";
import { useRouter } from "next/router";
import openPage from "components/AlanAi/openPage";

const AlanAi = () => {
  const router = useRouter();
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    let moving = 150;
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
              window.scroll(0, moving);
              moving = moving + 400;
            } else {
              if (article % 3 === 0) {
                window.scroll(0, article * 150);
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
