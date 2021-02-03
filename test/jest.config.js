module.exports = {
  rootDir: path.resolve(__dirname, "../../"),
  moduleFileExtensions: ["js", "json"],
  transformIgnorePatterns: "<rootDir>/node_modules",
  setupFiles: ["<rootDir>/test/unit/setup"],
  testEnvironment: "jest-environment-node",
  transform: {},
};
