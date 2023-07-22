import React, { useEffect, useState } from "react";
import "../Animate/Animate.css";
import { motion, useScroll } from "framer-motion";

export const Animate = () => {
  return (
    <>
      <div className="animate-container-box">
        <motion.div
          className="animate-container2"
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 0.4,
            delay: 0.8,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="animate-container3"
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: "linear",
          }}
        ></motion.div>
        <motion.div
          className="animate-container"
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: "linear",
          }}
        ></motion.div>
      </div>
    </>
  );
};
