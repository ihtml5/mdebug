const config = {
  reporters: ['default'],
  collectCoverage: true,
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  moduleFileExtensions: ['web.js', 'mjs', 'js', 'json', 'web.jsx', 'jsx', 'node'],
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', 'jest.config.js', '/mock/', '/__mocks__'],
  setupFiles: [],
<<<<<<< HEAD
=======
  setupTestFrameworkScriptFile: '',
>>>>>>> 28a7a30729b34f5bb5d1c44409df8cdaa4cc3f41
  testMatch: ['<rootDir>/__tests__/**/*.test.{js,jsx,mjs}'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '~/(.*)$': '<rootDir>/__mocks__/$1',
  },
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};

module.exports = config;
