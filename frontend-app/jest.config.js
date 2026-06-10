module.exports = {
  preset: "jest-expo",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ["**/src/**/*.test.ts", "**/src/**/*.test.tsx"]
};
