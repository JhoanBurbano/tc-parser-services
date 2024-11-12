module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true, // Activa la recolección de cobertura
  coverageDirectory: 'coverage', // Especifica la carpeta de salida de la cobertura
  coverageReporters: ['text', 'lcov'], // Reporte de cobertura en texto y formato lcov para CI/CD
  testMatch: [
    '**/__tests__/**/*.test.ts', // Asegura que solo los archivos .test.ts sean ejecutados
    '**/__tests__/**/*.spec.ts',
    '**/e2e/**/*.test.ts',
    '**/e2e/**/*.spec.ts',
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json', // Ruta al archivo de configuración de TypeScript
      },
    ],
  },
};
