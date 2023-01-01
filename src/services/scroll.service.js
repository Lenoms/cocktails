export const scrollToHeight = (height, behaviour = "auto") => {
  const el = document.getElementById("app-header-and-body");
  el.scrollTo(0, height, behaviour);
};
