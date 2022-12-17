module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/setup.ts'],
  roots: ['src'],
};
