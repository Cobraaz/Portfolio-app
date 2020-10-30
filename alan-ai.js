visualHints(
  'Say "What can I do here?"',
  'Say "How does this work?"',
  'Say "What does this app do?"',
  'Say "Order coffee"',
  'Say "How should I use this?"'
);

const URL = "https://portfolio-anujbansal-api.herokuapp.com/api/v1";
let projectsData = [];

intent("open (the|) page (projects|project)", async (p) => {
  const getProjects = async () => {
    const json = await api.axios.get(`${URL}/projects`);
    projectsData = json.data;
    p.play({ command: "project-open" });
  };
  await getProjects();
  await p.play("(OK|yeah sure|working on it)");
  p.play("These are the all solo project of (Anuj|Cobraaz)");
  p.play("Would you like me to read the name of projects?");
  p.then(projectConfirmation);
  return;
});

const projectConfirmation = context(() => {
  intent("(yes|sure)", async (p) => {
    await projectsData.forEach((data, i) => {
      p.play({ command: "project-current", article: i });
      p.play(`${data.title}`);
    });
    p.play("Do you want me to open any repository?");
    p.then(projectRepository);
    return;
  });

  intent("no", (p) => {
    p.play("Sure, sounds good to me.");
  });
});

const projectRepository = context(() => {
  intent("(yes|sure)", (p) => {
    p.play("Which one?");
    p.then(RepositoryOpen);
  });
  intent("no", (p) => {
    p.play("Sure, sounds good to me.");
  });
  return;
});

const RepositoryOpen = context(() => {
  let repositoryList =
    "blogs app|blogs|devconnector|connector|instagram clone|instagram|clone|crwnclothing|smart|smart|brain|smart brain|corona tracker|corona|tracker|realtime chat application|realtime|chat|application|password|checker|password checker";

  //    let repositoryList = [];
  //   projectsData.forEach(({ title }) => {
  //     repositoryList.push(title);
  //   });
  //   repositoryList = repositoryList.join("|").toLowerCase();
  //   repositoryList += repositoryList.replace(/ /g, "|");
  //     console.log(repositoryList);

  intent(`$(repository ${repositoryList})`, async (p) => {
    const repository = p.repository.value.toLowerCase();
    let repositoryLink = "";

    projectsData.forEach((data) => {
      var middle = Math.floor(repository.length / 2);
      var before = repository.lastIndexOf(" ", middle);
      var after = repository.indexOf(" ", middle + 1);

      if (before == -1 || (after != -1 && middle - before >= after - middle)) {
        middle = after;
      } else {
        middle = before;
      }

      var leftSlice = repository.substr(0, middle);
      var rightSlice = repository.substr(middle + 1);

      if (
        data.title.toLowerCase().includes(leftSlice) ||
        data.title.toLowerCase().includes(rightSlice)
      ) {
        repositoryLink = data.github;
        return;
        //             p.play({ command: "repository-open", repositoryLink });
        //             p.play("");
      }
      return "";
    });
    if (repositoryLink) {
      p.play({ command: "repository-open", repositoryLink });
      p.play("opening");
      //               break;
      return;
    }
    p.play("");
    return;
  });
});

intent("hello world", (p) => {
  p.play("(hello|hi there)");
});

// What this app do
intent(
  "What does this app do?",
  "What can I do here?",
  reply("This is a porfolio website")
);

// intent('Start a command',(p)=>{
//     p.play({command:"testCommand"});
// })

const pagesList =
  "index|home|homepage|about|portfolio|portfolios|blog|blogs|CV|cv|contact|login";

intent(
  `open (the|) (page|) $(page ${pagesList})`,
  `take (me|) (to|) $(page ${pagesList}) (page|)`,
  `can you (open|take|) (for|) (me|) $(page ${pagesList}) (page|)`,
  (p) => {
    const page = p.page.value.toLowerCase();
    p.play({ command: "OpenPages", page });
  }
);

intent(
  "theme change",
  "(alan|) change the theme",
  "(please|) change the theme (for me|)",
  (p) => {
    p.play({ command: "theme-change" });
    p.play("(OK|yeah sure|working on it)");
  }
);

intent(
  "open (the|) (blog) $(blog* (.*))",
  "take (me|) (to|) $(page* (.*)) (blog|)",
  "can you (open|take|) (for|) (me|) $(page* (.*)) (blog|)",
  (p) => {
    const blog = p.blog.value
      .toLowerCase()
      .replace(".", "")
      .split(" ")
      .join("-");
    p.play({ command: "Blog", blog });
    //     p.play('opening...');
  }
);
