"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { Element } from "react-scroll";
import { FileText } from "lucide-react";

/* ============================= */
/* 🔁 ORBIT COMPONENT            */
/* ============================= */

const Orbit = () => {
  const rotate = useMotionValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      rotate.set(rotate.get() + 0.15);
    }, 16);
    return () => clearInterval(interval);
  }, [rotate]);

  const icons = [
    "Node.js",
    "React",
    "TypeScript",
    "MongoDB",
    "Next.js",
  ];

  return (
    <motion.div
      drag="x"
      onDrag={(e, info) => {
        rotate.set(rotate.get() + info.delta.x * 0.5);
      }}
      style={{ rotate }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {icons.map((text, i) => {
        const angle = (360 / icons.length) * i;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              transform: `rotate(${angle}deg) translate(130px) rotate(-${angle}deg)`,
            }}
          >
            <div className="px-3 py-1 text-xs rounded-full border border-primary/30 bg-background/80 backdrop-blur-md shadow-lg">
              {text}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

/* ============================= */
/* 🔥 HERO COMPONENT             */
/* ============================= */

const Hero = () => {
  return (
    <Element name="home">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

        {/* 🌌 Background Glow */}
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center z-10">

          {/* ================= LEFT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-1 text-xs font-mono text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              AVAILABLE FOR OPPORTUNITIES
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              I build scalable,
              <br />
              high-performance{" "}
              <span className="text-primary">web applications.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-xl">
              Full-stack engineer with 4+ years of experience building AI-driven
              and real-time systems using modern web technologies.
            </p>

            {/* Proof */}
            <p className="mt-4 text-sm text-primary font-mono">
              40+ Projects • 4+ Years Experience • Real-time systems (~80ms latency)
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:scale-105 transition"
              >
                🚀 View My Work
              </a>

              <a
                href="/cv.pdf"
                target="_blank"
                className="px-6 py-3 border border-gray-600 rounded-xl flex items-center gap-2 hover:border-primary transition"
              >
                <FileText size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* ================= RIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            {/* Orbit */}
            <Orbit />

            {/* Avatar */}
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-full overflow-hidden border border-primary/30 shadow-2xl z-10">
              <img
                src="/profile.jpg" // 🔁 replace with your image path
                alt="Sazzad Hossain"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl z-0" />

            {/* Open to Work Card */}
            <div className="absolute bottom-0 translate-y-1/2 bg-black/60 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-xl text-sm">
              🟢 Open to Work • Remote / Full-time
            </div>
          </motion.div>

        </div>
      </section>
    </Element>
  );
};

export default Hero;
