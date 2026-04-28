"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { Element } from "react-scroll";
import { Github, Linkedin, Mail, FileDown, ArrowRight } from "lucide-react";

/* ================= ORBIT ================= */

const tech = [
  { label: "Node.js", angle: 0 },
  { label: "React", angle: 60 },
  { label: "TypeScript", angle: 120 },
  { label: "MongoDB", angle: 180 },
  { label: "Next.js", angle: 240 },
  { label: "Express", angle: 300 },
];

const Orbit = () => {
  const rotate = useMotionValue(0);

  useEffect(() => {
    const loop = setInterval(() => {
      rotate.set(rotate.get() + 0.1);
    }, 16);
    return () => clearInterval(loop);
  }, [rotate]);

  return (
    <motion.div
      drag
      onDrag={(e, info) => {
        rotate.set(rotate.get() + info.delta.x * 0.4);
      }}
      style={{ rotate }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {tech.map((t, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            transform: `rotate(${t.angle}deg) translate(170px) rotate(-${t.angle}deg)`,
          }}
        >
          <div className="px-3 py-1 rounded-lg text-xs border border-white/10 bg-white/5 backdrop-blur-md shadow-xl">
            {t.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

/* ================= HERO ================= */

export default function Hero() {
  return (
    <Element name="home">
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-16">

        {/* Background glow */}
        <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-primary/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-primary/10 blur-[120px]" />

        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT ================= */}
          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/30 bg-white/5 backdrop-blur-md text-xs text-primary">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              AVAILABLE FOR NEW OPPORTUNITIES
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-white">
              I build scalable, <br />
              high-performance{" "}
              <span className="text-primary">web applications.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-gray-400 max-w-lg text-base leading-relaxed">
              Full-stack engineer with <span className="text-primary">4+ years</span> of experience building AI-driven and real-time applications that solve real-world problems.
            </p>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-4">
              <a className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-semibold hover:scale-105 transition">
                🚀 View My Work <ArrowRight size={16} />
              </a>

              <a className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-primary transition">
                <FileDown size={16} /> Download Resume
              </a>
            </div>

            {/* Social */}
            <div className="mt-8 flex items-center gap-4 text-gray-400">
              <span>Let’s connect</span>
              <Github size={18} />
              <Linkedin size={18} />
              <Mail size={18} />
            </div>

          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative flex justify-center">

            {/* Orbit */}
            <Orbit />

            {/* Rings */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-white/5"></div>
            <div className="absolute w-[450px] h-[450px] rounded-full border border-white/5"></div>

            {/* Image */}
            <div className="relative z-10 w-[320px] md:w-[380px]">
              <img
                src="/profile.png"
                className="w-full object-contain"
                alt="profile"
              />
            </div>

            {/* Open to work */}
            <div className="absolute bottom-6 right-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-sm">
              🟢 Open to Work <br />
              Remote • Full-time
            </div>

          </div>

        </div>

        {/* ================= STATS ================= */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <div>
            <p className="text-xl font-bold text-white">40+</p>
            <p className="text-xs text-gray-400">Projects Completed</p>
          </div>

          <div>
            <p className="text-xl font-bold text-white">4+</p>
            <p className="text-xs text-gray-400">Years Experience</p>
          </div>

          <div>
            <p className="text-xl font-bold text-white">10x</p>
            <p className="text-xs text-gray-400">Performance Boost</p>
          </div>

          <div>
            <p className="text-xl font-bold text-white">100%</p>
            <p className="text-xs text-gray-400">Client Satisfaction</p>
          </div>

        </div>

      </section>
    </Element>
  );
}
