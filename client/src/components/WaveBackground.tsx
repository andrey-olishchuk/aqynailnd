import { motion } from "framer-motion";

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated 3D Grid Lines */}
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="stroke-primary/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          d="M -100,100 L 1540,100 M -100,300 L 1540,300 M -100,500 L 1540,500"
        />
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="stroke-primary/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 0.5 }}
          d="M 100,-100 L 100,900 M 500,-100 L 500,900 M 900,-100 L 900,900 M 1300,-100 L 1300,900"
        />

        {/* Diagonal Animated Lines */}
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="stroke-primary/30"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          d="M -100,0 L 300,800 M 300,0 L 700,800 M 700,0 L 1100,800 M 1100,0 L 1500,800"
        />

        {/* Floating Curves */}
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="stroke-primary/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          d="M -100,200 C 200,100 400,300 600,200 S 800,100 1000,200 S 1200,300 1540,200"
        />
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="stroke-primary/40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1 }}
          d="M -100,400 C 200,300 400,500 600,400 S 800,300 1000,400 S 1200,500 1540,400"
        />

        {/* Dynamic Circles */}
        <motion.circle
          cx="200"
          cy="200"
          r="50"
          className="stroke-primary/30"
          fill="none"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="1200"
          cy="400"
          r="70"
          className="stroke-primary/30"
          fill="none"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.svg>
    </div>
  );
}