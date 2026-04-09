module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");

  // Essays collection — sorted by date descending
  eleventyConfig.addCollection("essays", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/essays/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Limit filter for collections
  eleventyConfig.addFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  // Date formatting filter
  eleventyConfig.addFilter("date", function(dateVal, format) {
    const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
    if (format === "YYYY") return d.getFullYear().toString();
    if (format === "MMMM YYYY") {
      return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    }
    return d.toLocaleDateString('en-GB');
  });

  // Reading time filter
  eleventyConfig.addFilter("readingTime", function(content) {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
