import React, { useEffect, useState } from "react";

const VALID_FILTERS = ["all", "live", "ongoing", "private"];
const VALID_SORTS = ["newest", "az", "liveFirst"];

const ProjectGrid = ({ content }) => {
  const getFallbackImage = (title) =>
    `https://placehold.co/1200x700/0f172a/10b981?text=${encodeURIComponent(
      title,
    )}`;
  const sortedProjects = [...content.projects].sort((a, b) => b.id - a.id);
  const [activeFilter, setActiveFilter] = useState(() => {
    const filterParam = new URLSearchParams(window.location.search).get(
      "projectFilter",
    );
    return VALID_FILTERS.includes(filterParam) ? filterParam : "all";
  });
  const [activeSort, setActiveSort] = useState(() => {
    const sortParam = new URLSearchParams(window.location.search).get(
      "projectSort",
    );
    return VALID_SORTS.includes(sortParam) ? sortParam : "newest";
  });
  const statusMap = {
    live: {
      label: content.nav.statusLive,
      className: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    },
    ongoing: {
      label: content.nav.statusOngoing,
      className: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    },
    private: {
      label: content.nav.statusPrivate,
      className: "text-slate-300 border-slate-500/40 bg-slate-600/20",
    },
  };
  const filterOptions = [
    { key: "all", label: content.nav.filterAll || "All" },
    { key: "live", label: content.nav.filterLive || content.nav.statusLive },
    {
      key: "ongoing",
      label: content.nav.filterOngoing || content.nav.statusOngoing,
    },
    {
      key: "private",
      label: content.nav.filterPrivate || content.nav.statusPrivate,
    },
  ];
  const filterCounts = {
    all: sortedProjects.length,
    live: sortedProjects.filter((proj) => proj.status === "live").length,
    ongoing: sortedProjects.filter((proj) => proj.status === "ongoing").length,
    private: sortedProjects.filter((proj) => proj.status === "private").length,
  };
  const filteredProjects = sortedProjects.filter(
    (proj) => activeFilter === "all" || proj.status === activeFilter,
  );
  const visibleProjects = [...filteredProjects].sort((a, b) => {
    if (activeSort === "az") {
      return a.title.localeCompare(b.title);
    }

    if (activeSort === "liveFirst") {
      const order = { live: 0, ongoing: 1, private: 2 };
      const statusDiff =
        (order[a.status || "private"] ?? 99) -
        (order[b.status || "private"] ?? 99);
      if (statusDiff !== 0) {
        return statusDiff;
      }
      return b.id - a.id;
    }

    return b.id - a.id;
  });

  useEffect(() => {
    const currentUrl = new URL(window.location.href);

    if (activeFilter === "all") {
      currentUrl.searchParams.delete("projectFilter");
    } else {
      currentUrl.searchParams.set("projectFilter", activeFilter);
    }

    if (activeSort === "newest") {
      currentUrl.searchParams.delete("projectSort");
    } else {
      currentUrl.searchParams.set("projectSort", activeSort);
    }

    const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
    const existingUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== existingUrl) {
      window.history.replaceState({}, "", nextUrl);
    }
  }, [activeFilter, activeSort]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const filterParam = params.get("projectFilter");
      const sortParam = params.get("projectSort");

      setActiveFilter(VALID_FILTERS.includes(filterParam) ? filterParam : "all");
      setActiveSort(VALID_SORTS.includes(sortParam) ? sortParam : "newest");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <section id="projects">
      <h3 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-4">
        <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
        {content.nav.featuredProj}
      </h3>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setActiveFilter(option.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-colors ${
                activeFilter === option.key
                  ? "text-slate-900 bg-emerald-400 border-emerald-300"
                  : "text-slate-300 bg-slate-800/40 border-slate-600 hover:border-emerald-500/50"
              }`}
            >
              {option.label} ({filterCounts[option.key] ?? 0})
            </button>
          ))}
        </div>

        <div className="w-full md:w-auto">
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="w-full md:w-[220px] px-3 py-2 rounded-xl text-sm bg-slate-800/50 border border-slate-600 text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="newest">{content.nav.sortNewest || "Newest"}</option>
            <option value="az">{content.nav.sortAZ || "A-Z"}</option>
            <option value="liveFirst">
              {content.nav.sortLiveFirst || "Live First"}
            </option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
        {visibleProjects.map((proj) => (
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

            <div className="mb-3 relative z-10">
              <span
                className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${statusMap[proj.status || "private"].className}`}
              >
                {statusMap[proj.status || "private"].label}
              </span>
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
