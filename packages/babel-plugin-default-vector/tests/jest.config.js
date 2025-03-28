module.exports = {
  coverageReporters: ["json", "text", "lcov", "html"],
  globals: {
    "jest-html-reporters": {
      "runtimeOptions": {
        "allowProtoPropertiesByDefault": true,
        "allowProtoMethodsByDefault": true
      }
    }
  },
};
