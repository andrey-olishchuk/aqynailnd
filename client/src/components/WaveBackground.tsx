import { motion } from "framer-motion";

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background waves */}
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

        {/* 3D Lines Overlay */}
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="stroke-primary/20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          d="M 100,100 C 200,100 300,200 400,100 S 500,0 600,100 S 700,200 800,100"
        />
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="stroke-primary/15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.5 }}
          d="M 0,200 C 100,200 200,300 300,200 S 400,100 500,200 S 600,300 700,200"
        />
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="stroke-primary/25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1 }}
          d="M 200,300 C 300,300 400,400 500,300 S 600,200 700,300 S 800,400 900,300"
        />

        {/* Diagonal Lines */}
        <motion.line
          x1="0" y1="0"
          x2="200" y2="200"
          stroke="currentColor"
          strokeWidth="1"
          className="stroke-primary/10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
        />
        <motion.line
          x1="1200" y1="0"
          x2="1000" y2="200"
          stroke="currentColor"
          strokeWidth="1"
          className="stroke-primary/10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.5 }}
        />

        {/* Curved Lines */}
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="stroke-primary/20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          d="M 0,400 Q 400,350 800,400 T 1440,400"
        />
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="stroke-primary/15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1 }}
          d="M 0,450 Q 400,400 800,450 T 1440,450"
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