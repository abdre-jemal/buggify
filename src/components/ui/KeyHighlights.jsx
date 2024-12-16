/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
// import Link from "react-router";
import { useState } from "react";

const items = [
  {
    title: "Interactive Practice",
    description: "Fix buggy React code snippets across a variety of topics.",
  },
  {
    title: "Skill-Based Learning",
    description:
      "Challenges tailored to your skill level, from beginner to advanced.",
  },
  {
    title: "Learn & Explore",
    description:
      "Get instant solutions and detailed explanations for each bug.",
  },
  {
    title: "AI-Powered Challenges",
    description: "Fresh and dynamic problems generated just for you.",
  },
];

export const KeyHighlights = ({ className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="flex justify-center items-center min-h-[100vh] w-full bg-slate-800">
      <div className="flex flex-col max-w-[80%] mx-auto">
        <h1 className="text-p1 text-5xl capitalize">What Makes It special</h1>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-4  py-10",
            className
          )}
        >
          {items.map((item, idx) => (
            <div
              href={item?.link}
              key={item?.link}
              className="relative group  block p-2 h-full w-full cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Card>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-p1 font-bold tracking-wide mt-4 text-xl", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
