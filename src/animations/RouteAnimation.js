export const RouteAnimation = {
  initial: {
    opacity: 0,
    x: "-200vw",
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: {
    opacity: 0,
    x: "-200vw",
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  infoInitial: {
    opacity: 0,
    x: "200vw",
    transition: { ease: "easeInOut", duration: 0.5 },
  },
  infoExit: {
    opacity: 0,
    x: "200vw",
    transition: { ease: "easeInOut", duration: 0.5 },
  },
};
