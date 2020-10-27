import React, { useEffect } from "react";
import { useRouter } from "next/router";

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
            let found = true;
            console.log(page[0]);
            if (page.includes("index") || page.includes("home")) {
              router.push(`${process.env.BASE_URL}`);
            } else if (page.includes("about")) {
              router.push(`${process.env.BASE_URL}/about`);
            } else if (page.includes("port")) {
              router.push(`${process.env.BASE_URL}/portfolios`);
            } else if (page.includes("pro")) {
              router.push(`${process.env.BASE_URL}/projects`);
            } else if (page[0] === "b") {
              router.push(`${process.env.BASE_URL}/blogs`);
            } else if (page.includes("cv")) {
              router.push(`${process.env.BASE_URL}/cv`);
            } else if (page.includes("con")) {
              router.push(`${process.env.BASE_URL}/contact`);
            } else if (page.includes("login")) {
              router.push(`${process.env.BASE_URL}/api/v1/login`);
            } else {
              found = Boolean(
                alanBtn().playText("Sorry i can't take you there")
              );
              console.log(found);
            }
            if (found) {
              alanBtn().playText(
                "(opening...|ok|yeah taking|working on it|alright)"
              );
            }
            break;
          case "Blog":
            router.push(`${process.env.BASE_URL}/blogs/${blog}`);

            alanBtn().play("(opening...|ok|yeah taking|working on it|alright)");
            break;
        }
      },
    });
  }, []);
  return <></>;
};

export default AlanAi;
