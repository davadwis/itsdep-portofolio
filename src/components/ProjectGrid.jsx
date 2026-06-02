import React from "react";

const ProjectGrid = ({ content }) => {
  const getFallbackImage = (title) =>
    `https://placehold.co/1200x700/0f172a/10b981?text=${encodeURIComponent(
      title,
    )}`;
  const sortedProjects = [...content.projects].sort((a, b) => b.id - a.id);

  return (
    <section id="projects">
      <h3 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-4">
        <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
        {content.nav.featuredProj}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
        {sortedProjects.map((proj) => (
          <div
            key={proj.id}
            className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-[2rem] p-5 md:p-6 hover:bg-slate-800/60 transition-all duration-500 shadow-lg relative overflow-hidden transform hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>

            <div className="relative z-10 mb-5 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/70">
              <img
                src={proj.thumbnail || getFallbackImage(proj.title)}
                alt={proj.title}
                loading="lazy"
                className="w-full h-44 md:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = getFallbackImage(proj.title);
                }}
              />
            </div>

            <h4 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-emerald-400 transition-colors relative z-10">
              {proj.title}
            </h4>
            <p className="text-base text-slate-400 leading-relaxed mb-8 relative z-10">
              {proj.desc}
            </p>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              {proj.liveUrl ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  {content.nav.visitProject}
                </a>
              ) : (
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-slate-300 border border-slate-600 bg-slate-700/40">
                  {content.nav.screenshotOnly}
                </span>
              )}

              {proj.sourceUrl ? (
                <a
                  href={proj.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                >
                  {content.nav.viewSource}
                </a>
              ) : null}
            </div>

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
