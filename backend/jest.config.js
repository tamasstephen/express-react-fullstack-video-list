module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 100,
      lines: 70,
      statements: -2,
    },
    "./src/calculator.js": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: -10,
    },
  },
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "./output/code-coverage/",
};
