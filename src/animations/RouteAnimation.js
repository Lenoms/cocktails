export const RouteAnimation = {
  initial: {
    x: "-100vw",
  },
  animate: { x: 0, transition: { duration: 0.5 } },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  infoInitial: {
    x: "100vw",
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  infoExit: {
    x: "100vw",
    transition: { ease: "easeInOut", duration: 0.5 },
  },
};
