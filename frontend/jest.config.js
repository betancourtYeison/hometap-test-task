export default {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  moduleNameMapper: {
    "\\.svg": "<rootDir>/src/__mocks__/svgrMock.js",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
};
