import React from "react";

const Experience = ({ content }) => {
  return (
    <section id="experience">
      <h3 className="text-3xl font-bold text-slate-100 mb-12 flex items-center gap-4">
        <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
        {content.nav.workExp}
      </h3>

      <div className="space-y-6">
        {content.experience.map((exp) => (
          <div
            key={exp.id}
            className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 lg:p-8 rounded-[2rem] border border-slate-800 hover:border-slate-700 bg-slate-800/20 hover:bg-slate-800/40 transition-all duration-300 group transform hover:scale-[1.01]"
          >
            <div className="md:w-1/4 shrink-0">
              <span className="text-emerald-500 font-mono text-sm tracking-tight bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 inline-block">
                {exp.date}
              </span>
            </div>
            <div className="md:w-3/4">
              <h4 className="font-bold text-2xl text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                {exp.title}
              </h4>
              <span className="text-lg text-slate-400">{exp.company}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
