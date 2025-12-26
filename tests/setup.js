// Test setup file
process.env.NODE_ENV = 'test';
process.env.MONGO_URI = 'mongodb://localhost:27017/nhra_test';
process.env.SESSION_SECRET = 'test-session-secret';
process.env.LOG_LEVEL = 'error'; // Reduce log noise during tests

// Mock Puppeteer to avoid browser dependencies in tests
jest.mock('puppeteer', () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      setContent: jest.fn(),
      pdf: jest.fn().mockResolvedValue(Buffer.from('mock-pdf')),
      close: jest.fn()
    }),
    close: jest.fn()
  })
}));

// Mock QRCode
jest.mock('qrcode', () => ({
  toDataURL: jest.fn().mockResolvedValue('mock-qr-code-url')
}));

// Mock mailer
jest.mock('../utils/mailer', () => ({
  sendMail: jest.fn().mockResolvedValue(true)
}));

// Global test utilities
global.testUtils = {
  createMockReq: (overrides = {}) => ({
    body: {},
    params: {},
    query: {},
    user: null,
    session: {},
    get: jest.fn(),
    ...overrides
  }),

  createMockRes: (overrides = {}) => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    render: jest.fn().mockReturnThis(),
    redirect: jest.fn().mockReturnThis(),
    ...overrides
  }),

  createMockNext: () => jest.fn()
};