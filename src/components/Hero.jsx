import React from "react";

const Hero = ({ content }) => {
  return (
    <section className="max-w-4xl pt-8 lg:pt-0">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-100 mb-6 leading-[1.1]">
        {content.personal.headline.split(" ").map((word, i, arr) => {
          if (i >= arr.length - 2) {
            return (
              <span
                key={i}
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200"
              >
                {word}{" "}
              </span>
            );
          }
          return word + " ";
        })}
      </h2>
      <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
        {content.personal.summary}
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          href="#experience"
          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1"
        >
          {content.nav.viewExp}
        </a>
        <a
          href="#projects"
          className="px-8 py-4 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 text-slate-100 font-medium rounded-2xl transition-all duration-300 border border-slate-700 hover:border-slate-500 hover:-translate-y-1"
        >
          {content.nav.viewProj}
        </a>
      </div>
    </section>
  );
};

export default Hero;
