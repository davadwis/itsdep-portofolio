import React from "react";

const Sidebar = ({ content, lang, setLang, isLoaded, handleImageError }) => {
  const handleShare = async () => {
    const shareData = {
      title: `${content.personal.name} - Portfolio`,
      text: content.personal.headline,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(
        lang === "id"
          ? "Link portofolio berhasil disalin ke clipboard!"
          : "Portfolio link copied to clipboard!",
      );
    }
  };

  return (
    <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-slate-900/80 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-800/80 lg:h-screen lg:sticky lg:top-0 z-20 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.2)]">
      <div className="p-6 flex justify-between items-center border-b border-slate-800/50">
        <div className="text-xl font-bold tracking-tighter text-slate-100">
          ItsDep<span className="text-emerald-500">.</span>
        </div>
        <div className="flex bg-slate-800/80 rounded-full p-1 border border-slate-700/50 shadow-inner">
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              lang === "en"
                ? "bg-emerald-500 text-slate-900 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("id")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              lang === "id"
                ? "bg-emerald-500 text-slate-900 shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ID
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
        <div className="text-center mb-8">
          <div
            className="w-32 h-32 mx-auto rounded-full bg-slate-700 mb-6 border-4 border-slate-800 shadow-2xl overflow-hidden relative group animate-float"
            style={{ animationDuration: "6s" }}
          >
            <img
              src="/dava.jpeg"
              alt="Profile"
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 mb-2">
            {content.personal.name}
          </h1>
          <p className="text-sm font-medium text-emerald-400 mb-6">
            {content.personal.role}
          </p>

          <div className="flex justify-center gap-3 mb-6">
            <a
              href={`https://wa.me/${content.personal.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 bg-slate-800 rounded-2xl hover:bg-[#25D366] hover:text-white transition-all duration-300 border border-slate-700/50 hover:border-[#25D366] hover:-translate-y-1 shadow-lg group"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.224-3.669c1.524.905 3.125 1.382 4.771 1.383h.005c5.441 0 9.863-4.422 9.865-9.864.001-2.637-1.03-5.114-2.904-6.989-1.873-1.873-4.35-2.903-6.985-2.904-5.442 0-9.863-4.421-9.865 9.863-.001 1.742.453 3.441 1.316 4.965l-1.016 3.712 3.813-.999zm10.743-7.51c-.131-.219-.481-.351-.963-.591-.481-.241-2.846-1.403-3.286-1.562-.439-.159-.76-.241-1.08.241-.321.482-1.242 1.562-1.522 1.882-.281.321-.561.361-1.042.12-.482-.241-2.031-.749-3.869-2.39-1.43-1.275-2.394-2.85-2.675-3.33-.281-.481-.03-.741.21-.981.216-.216.481-.561.721-.842.24-.281.321-.482.482-.802.16-.321.08-.601-.04-.842-.12-.241-1.08-2.603-1.481-3.563-.391-.944-.781-.814-1.08-.83-.281-.013-.6-.013-.6-.013h-.001z" />
              </svg>
            </a>
            <a
              href={`https://${content.personal.github}`}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-slate-800 rounded-2xl hover:bg-emerald-500 hover:text-slate-900 transition-all duration-300 border border-slate-700/50 hover:border-emerald-500 hover:-translate-y-1 shadow-lg group"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={`https://${content.personal.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-slate-800 rounded-2xl hover:bg-emerald-500 hover:text-slate-900 transition-all duration-300 border border-slate-700/50 hover:border-emerald-500 hover:-translate-y-1 shadow-lg group"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href={`mailto:${content.personal.email}`}
              className="p-3 bg-slate-800 rounded-2xl hover:bg-emerald-500 hover:text-slate-900 transition-all duration-300 border border-slate-700/50 hover:border-emerald-500 hover:-translate-y-1 shadow-lg"
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
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </a>
          </div>

          <div className="px-4 flex flex-col gap-3">
            <a
              href={content.personal.cvFile}
              download
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold rounded-2xl hover:bg-emerald-500 hover:text-slate-900 transition-all duration-300 shadow-lg group"
            >
              <svg
                className="w-5 h-5 group-hover:animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {content.nav.downloadCV}
            </a>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800/80 border border-slate-700/50 text-slate-300 font-bold rounded-2xl hover:bg-slate-700 hover:text-white transition-all duration-300 shadow-lg group cursor-pointer"
            >
              <svg
                className="w-5 h-5 group-hover:-rotate-12 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              {lang === "id" ? "Bagikan Portofolio" : "Share Portfolio"}
            </button>
          </div>
        </div>

        <div className="space-y-4 text-sm bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 mb-10 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">{content.nav.location}</span>
            <span className="text-slate-200 font-medium text-right">
              {content.personal.city}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">{content.nav.experience}</span>
            <span className="text-slate-200 font-medium">
              {content.personal.yearsExp}
            </span>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xs font-bold text-slate-500 mb-5 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {content.nav.coreStacks}
          </h3>
          <div className="space-y-5">
            {content.coreStacks.map((skill, i) => (
              <div key={i} className="group">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-200 font-medium group-hover:text-emerald-400 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-slate-500 font-mono group-hover:text-emerald-400/80 transition-colors">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden shadow-inner relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-out relative"
                    style={{ width: isLoaded ? `${skill.percentage}%` : "0%" }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 rounded-full blur-[1px]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">
            {content.nav.otherSkills}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {content.otherSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 text-xs font-medium rounded-xl bg-slate-800/60 backdrop-blur-md border border-slate-700/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300 shadow-sm animate-float"
                style={{
                  animationDuration: `${3 + (i % 3)}s`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">
            {content.nav.softSkills}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {content.softSkills.map((skill, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 text-xs font-medium rounded-xl bg-slate-800/40 backdrop-blur-md border border-slate-700/40 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300 shadow-sm animate-float"
                style={{
                  animationDuration: `${4 + (i % 2)}s`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
