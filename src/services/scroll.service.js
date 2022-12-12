export const scrollToHeight = (height, behaviour = "auto") => {
  console.log("Scrolling", height);
  const el = document.getElementById("app-header-and-body");
  el.scrollTo(0, height, behaviour);
};
