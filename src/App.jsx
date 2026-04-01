import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { data } from "./data";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import Experience from "./components/Experience";

function App() {
  const [lang, setLang] = useState("en");
  const [isLoaded, setIsLoaded] = useState(false);
  const content = data[lang];

  const handleImageError = (e) => {
    e.target.src =
      "https://ui-avatars.com/api/?name=Muhamad+Dava&background=10b981&color=fff&size=200";
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col lg:flex-row">
      <Helmet>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>

      <Sidebar
        content={content}
        lang={lang}
        setLang={setLang}
        isLoaded={isLoaded}
        handleImageError={handleImageError}
      />

      <div className="flex-1 bg-slate-900/50 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto p-6 md:p-10 lg:p-16 xl:py-20 flex flex-col gap-16 lg:gap-24 relative z-10">
          <Hero content={content} />
          <ProjectGrid content={content} />
          <Experience content={content} />

          <footer className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>
              © {new Date().getFullYear()} {content.personal.name}. All Rights
              Reserved.
            </p>
            <p>Designed with smooth & clean UI. Built with React.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
