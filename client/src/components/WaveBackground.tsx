import { motion } from "framer-motion";

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          d="M 0 400 C 400 300, 800 500, 1440 400 V 800 H 0 Z"
          className="fill-primary/10"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.15 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.2 }}
          d="M 0 500 C 600 400, 1000 600, 1440 500 V 800 H 0 Z"
          className="fill-primary/5"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.4 }}
          d="M 0 600 C 200 500, 1200 700, 1440 600 V 800 H 0 Z"
          className="fill-primary/10"
        />
      </motion.svg>
    </div>
  );
}
