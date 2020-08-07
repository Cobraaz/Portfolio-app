export const particlesOptionsIndex = {
  particles: {
    number: {
      value: 110,
      density: {
        enable: false,
      },
    },
    size: {
      value: 7,
      random: true,
    },
    move: {
      direction: "bottom",
      out_mode: "out",
    },
    line_linked: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "remove",
      },
    },
    modes: {
      remove: {
        particles_nb: 10,
      },
    },
  },
};

export const ROLES = ["Developer", "MERN", "React.js", "Node.js", "Next.js"];

export const particlesOptionsProjects = {
  particles: {
    number: {
      value: 250,
      density: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1.5,
      direction: "top",
      out_mode: "out",
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble",
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 550,
        duration: 5,
        size: 0,
        opacity: 1,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};
