/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const { defaults: tsjPreset } = require('ts-jest/presets');

export default {
  collectCoverage: false,
  globalSetup: '<rootDir>/tests/infra/envConfig.ts',
  moduleNameMapper: {
    '@domain/(.*)': '<rootDir>/lib/domain/$1',
    '@application/(.*)': '<rootDir>/lib/application/$1',
    '@infra/(.*)': '<rootDir>/lib/infra/$1',
    '@main/(.*)': '<rootDir>/lib/main/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/tests/'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    ...tsjPreset.transform,
  },
};
