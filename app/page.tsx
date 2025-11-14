"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Starfield } from "@/components/starfield";
import { TwinklingStars } from "@/components/twinkling-stars";
import { useRef } from "react";

function InteractiveImage() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden border border-gray-700/50 inline-block"
      style={{
        maxHeight: "80vh",
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale: 1.02,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <img
        src="/images/screenshot.png"
        alt="ClipCache Settings Window"
        className="h-auto object-contain pointer-events-none block"
        style={{ maxHeight: "80vh", width: "auto" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section - Full Height */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Starfield />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-black/20 to-gray-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 animate-pulse" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent tracking-tight">
              ClipCache
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto mb-1 leading-relaxed">
              Copy multiple clipboard items and paste them all at once.
            </p>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              Free forever and open source. For macOS 26.1+
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <motion.a
                href="https://github.com/w1lt/ClipCache/releases/latest/download/ClipCache.zip"
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-2 bg-gradient-to-r from-white to-gray-300 text-black rounded-lg font-semibold text-lg transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </motion.a>
              <motion.a
                href="https://github.com/w1lt/ClipCache"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  borderColor: "rgba(255, 255, 255, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-2 bg-gray-800/50 border border-gray-700 text-gray-200 rounded-lg font-semibold text-lg hover:bg-gray-700/50 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                View Source
              </motion.a>
            </div>

            {/* Installation Link */}
            <div className="mt-2">
              <a
                href="https://github.com/w1lt/ClipCache?tab=readme-ov-file#%EF%B8%8F-installation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors underline underline-offset-4"
              >
                Install Guide
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Content Sections */}
      <div className="relative z-10">
        {/* How It Works - Simple */}
        <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
          {/* Section Background */}
          <TwinklingStars />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/20 via-transparent to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.03),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03),transparent_60%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="relative max-w-6xl mx-auto min-h-screen flex items-center justify-center py-16 px-6">
            <div className="w-fit mx-auto">
              <div className="flex lg:flex-row flex-col gap-8 lg:gap-20 items-center">
                {/* Left Column - Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="max-w-lg"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
                  >
                    How It Works
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-400 mb-8"
                  >
                    Copy multiple items and paste them all at once.
                  </motion.p>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Copy",
                        desc: "Copy images and text within a 30-second window. Each additional copy resets the timer.",
                      },
                      {
                        title: "Cache",
                        desc: "Items are automatically stored temporarily. You can paste them all at once with a single shortcut.",
                      },
                      {
                        title: "Paste",
                        desc: "Press Cmd+Shift+X to paste all items at once. Your Cache persists until start copying again.",
                      },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="relative bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-white/30 transition-all"
                      >
                        <div>
                          <h3 className="text-xl font-semibold mb-2 text-white">
                            {step.title}
                          </h3>
                          <p className="text-gray-400 text-md">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Column - Screenshot */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="relative flex items-center justify-center flex-shrink-0"
                  style={{ perspective: "1000px" }}
                >
                  <InteractiveImage />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* CTA Section */}
        <section className="relative w-full min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
          {/* Section Background */}
          <TwinklingStars />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/30 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="relative max-w-4xl mx-auto min-h-screen flex items-center justify-center py-32 px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
              >
                Want to try it out?
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex justify-center"
              >
                <motion.a
                  href="https://github.com/w1lt/ClipCache/releases/latest/download/ClipCache.zip"
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-2 bg-gradient-to-r from-white to-gray-300 text-black rounded-lg font-semibold text-xl transition-all"
                >
                  <motion.svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </motion.svg>
                  Download
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
