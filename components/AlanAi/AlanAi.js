import React, { useEffect } from "react";
import { useRouter } from "next/router";
import openPage from "components/AlanAi/openPage";

const AlanAi = () => {
  const router = useRouter();
  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: process.env.ALAN_AI,
      rootEl: document.getElementById("alan-btn"),
      onCommand: ({ command, page, blog }) => {
        switch (command) {
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
  return <></>;
};

export default AlanAi;
