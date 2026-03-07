import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['test/**/*-test.js'],
    globals: true,
    testTimeout: 5000,
    hookTimeout: 5000,
    passWithNoTests: true
  }
})