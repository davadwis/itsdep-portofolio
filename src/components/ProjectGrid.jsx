import React from "react";

const ProjectGrid = ({ content }) => {
  return (
    <section id="projects">
      <h3 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-4">
        <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
        {content.nav.featuredProj}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
        {content.projects.map((proj) => (
          <div
            key={proj.id}
            className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-[2rem] p-8 hover:bg-slate-800/60 transition-all duration-500 shadow-lg relative overflow-hidden transform hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
            <h4 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-emerald-400 transition-colors relative z-10">
              {proj.title}
            </h4>
            <p className="text-base text-slate-400 leading-relaxed mb-8 relative z-10">
              {proj.desc}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
              {proj.tech.split(" | ").map((t, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
