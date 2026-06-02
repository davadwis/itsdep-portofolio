const requiredProjectFields = [
  "id",
  "title",
  "desc",
  "tech",
  "status",
  "thumbnail",
  "liveUrl",
  "sourceUrl",
];

const requiredTopLevelFields = [
  "seo",
  "nav",
  "personal",
  "coreStacks",
  "otherSkills",
  "softSkills",
  "projects",
  "experience",
];

const validStatuses = ["live", "ongoing", "private"];

const validateLocaleContent = (locale, content) => {
  const errors = [];

  requiredTopLevelFields.forEach((field) => {
    if (!(field in content)) {
      errors.push(`[${locale}] Missing top-level field: ${field}`);
    }
  });

  if (!Array.isArray(content.projects)) {
    errors.push(`[${locale}] projects must be an array`);
    return errors;
  }

  content.projects.forEach((project, index) => {
    requiredProjectFields.forEach((field) => {
      if (!(field in project)) {
        errors.push(
          `[${locale}] Missing project field: ${field} at index ${index}`,
        );
      }
    });

    if (project.status && !validStatuses.includes(project.status)) {
      errors.push(
        `[${locale}] Invalid project status '${project.status}' at index ${index}`,
      );
    }
  });

  return errors;
};

export const validatePortfolioData = (source) => {
  const locales = Object.keys(source || {});
  const allErrors = locales.flatMap((locale) =>
    validateLocaleContent(locale, source[locale]),
  );

  if (allErrors.length > 0) {
    console.warn("Data validation warnings:", allErrors);
  }

  return allErrors;
};
