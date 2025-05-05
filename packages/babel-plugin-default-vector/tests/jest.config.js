module.exports = {
  coverageReporters: ['text', 'html', 'lcov', 'clover'],
  globals: {
    "jest-html-reporters": {
      "runtimeOptions": {
        "allowProtoPropertiesByDefault": true,
        "allowProtoMethodsByDefault": true
      }
    }
  },
};
