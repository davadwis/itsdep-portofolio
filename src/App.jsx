import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { data } from "./data";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import Experience from "./components/Experience";
import { validatePortfolioData } from "./data/utils/validateData";

function App() {
  const [lang, setLang] = useState(() => {
    const selectedLang = new URLSearchParams(window.location.search).get(
      "lang",
    );
    return selectedLang === "id" || selectedLang === "en"
      ? selectedLang
      : "en";
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSearch, setCurrentSearch] = useState(() => window.location.search);
  const content = data[lang];
  const siteUrl = "https://itsdep.space/";
  const enUrl = siteUrl;
  const idUrl = `${siteUrl}?lang=id`;
  const currentPageUrl = lang === "id" ? idUrl : enUrl;
  const ogLocale = lang === "id" ? "id_ID" : "en_US";
  const searchParams = new URLSearchParams(currentSearch);
  const hasProjectStateParams =
    searchParams.has("projectFilter") || searchParams.has("projectSort");
  const robotsContent = hasProjectStateParams
    ? "noindex,follow,max-image-preview:large"
    : "index,follow,max-image-preview:large";
  const projectsData = content.projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    description: project.desc,
    url: project.liveUrl || siteUrl,
    image: `${siteUrl}${project.thumbnail.replace(/^\//, "")}`,
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: content.personal.fullName,
        jobTitle: content.personal.role,
        url: siteUrl,
        email: `mailto:${content.personal.email}`,
        sameAs: [
          `https://${content.personal.linkedin}`,
          `https://${content.personal.github}`,
        ],
      },
      {
        "@type": "WebSite",
        name: content.seo.title,
        url: siteUrl,
        inLanguage: lang,
      },
      {
        "@type": "ItemList",
        name: lang === "id" ? "Proyek Pilihan" : "Featured Projects",
        itemListElement: projectsData.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: project,
        })),
      },
    ],
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://ui-avatars.com/api/?name=Dava+Dwi&background=10b981&color=fff&size=200";
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const notifyUrlChange = () => {
      window.dispatchEvent(new Event("urlchange"));
    };

    window.history.pushState = function patchedPushState(...args) {
      originalPushState.apply(window.history, args);
      notifyUrlChange();
    };

    window.history.replaceState = function patchedReplaceState(...args) {
      originalReplaceState.apply(window.history, args);
      notifyUrlChange();
    };

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  useEffect(() => {
    const handleUrlChange = () => setCurrentSearch(window.location.search);

    window.addEventListener("urlchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("urlchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      validatePortfolioData(data);
    }
  }, []);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    if (lang === "id") {
      currentUrl.searchParams.set("lang", "id");
    } else {
      currentUrl.searchParams.delete("lang");
    }

    const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
    const existingUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (nextUrl !== existingUrl) {
      window.history.replaceState({}, "", nextUrl);
    }
  }, [lang]);

  useEffect(() => {
    const handlePopState = () => {
      const selectedLang = new URLSearchParams(window.location.search).get(
        "lang",
      );
      const nextLang = selectedLang === "id" || selectedLang === "en" ? selectedLang : "en";
      setLang(nextLang);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col lg:flex-row">
      <Helmet>
        <html lang={lang} />
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
        <meta name="robots" content={robotsContent} />
        <meta name="author" content={content.personal.fullName} />
        <link rel="canonical" href={currentPageUrl} />
        <link rel="alternate" hrefLang="id" href={idUrl} />
        <link rel="alternate" hrefLang="en" href={enUrl} />
        <link rel="alternate" hrefLang="x-default" href={enUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:url" content={currentPageUrl} />
        <meta property="og:image" content={`${siteUrl}og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.seo.title} />
        <meta name="twitter:description" content={content.seo.description} />
        <meta name="twitter:image" content={`${siteUrl}og-image.png`} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
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
