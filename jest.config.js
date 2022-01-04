module.exports = {
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  testMatch: [
    '**/**/test/**/*.spec.ts'
  ],
  bail: true,
  clearMocks: true,
  testEnvironment: "node",
  moduleFileExtensions: ['ts', 'js'],
  globalTeardown: './test-teardown-globals.js',
  modulePaths: [
    "<rootDir>",
    "./src",
    "./test",
  ],
  moduleDirectories: [
    "node_modules",
    "/src"
  ],
  transformIgnorePatterns: [
    "node_modules/"
  ]
};