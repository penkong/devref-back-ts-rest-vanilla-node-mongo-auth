module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./test/config/setup.ts'],
  testEnvironment: 'node'
}
