export const RouteAnimation = {
  left: {
    initial: {
      x: "-100vw",
    },
    animate: { x: 0, transition: { duration: 0.5 }, transitionEnd: { x: 0 } },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  },
  right: {
    initial: {
      x: "100vw",
      transition: { ease: "easeInOut", duration: 0.5 },
    },
    animate: { x: 0, transition: { duration: 0.5 }, transitionEnd: { x: 0 } },
    exit: {
      x: "100vw",
      transition: { ease: "easeInOut", duration: 0.5 },
    },
  },
};
