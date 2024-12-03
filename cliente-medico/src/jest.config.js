module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest', // Usa Babel para transformar archivos .js
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios|axios-mock-adapter)/)',
      '/node_modules/(?!(axios)/)', // Transforma axios y axios-mock-adapter
    ],
    testEnvironment: 'node',
  testTimeout: 30000, // Tiempo máximo para cada prueba
  };
  