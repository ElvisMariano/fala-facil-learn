module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  verbose: true,
  testTimeout: 10000,
  transform: {},
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
}; 