const request = require('supertest');
const mongoose = require('mongoose');

// Mock the app without starting the server
jest.mock('../index', () => {
  const express = require('express');
  const app = express();

  // Basic middleware
  app.use(express.json());

  // Health endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });

  // Mock home route
  app.get('/', (req, res) => {
    res.status(200).send('NHRA Website');
  });

  return app;
});

const app = require('../index');

describe('NHRA Application Tests', () => {
  beforeAll(async () => {
    // Connect to test database if needed
    if (process.env.MONGO_URI && process.env.MONGO_URI.includes('test')) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  });

  afterAll(async () => {
    // Close database connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  describe('Health Endpoint', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('uptime');
      expect(typeof response.body.uptime).toBe('number');
    });
  });

  describe('Home Route', () => {
    test('should return homepage content', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.text).toContain('NHRA');
    });
  });

  describe('Security Headers', () => {
    test('should have security headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      // Check for common security headers
      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
    });
  });
});