// jest.config.js
export default {
  testEnvironment: 'node',  // Configura el entorno de prueba como 'node'
  transform: {
    '^.+\\.js$': 'babel-jest',  // Usar babel-jest para transformar los archivos .js
  },
  transformIgnorePatterns: [
    '/node_modules/(?!supertest)/',  // Si usas alguna librería de node_modules que también use ESM
  ],
};
