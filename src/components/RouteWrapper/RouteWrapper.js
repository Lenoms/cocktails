import React from "react";
import { motion } from "framer-motion";
import { RouteAnimation } from "../../animations/RouteAnimation";

function RouteWrapper({ children, className, direction = "left", ...props }) {
  const animation = RouteAnimation[direction];

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default RouteWrapper;
