import { validateUserId, validateEmail, validatePhone } from '../utils/validators/user.validator';
import { HttpsError } from 'firebase-functions/v2/https';

// Mock HttpsError
jest.mock('firebase-functions/v2/https', () => ({
  HttpsError: jest.fn(),
}));

describe('User Validator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUserId', () => {
    it('should pass with valid user ID', () => {
      expect(() => validateUserId('user123')).not.toThrow();
    });

    it('should throw with empty user ID', () => {
      expect(() => validateUserId('')).toThrow();
    });

    it('should throw with short user ID', () => {
      expect(() => validateUserId('ab')).toThrow();
    });
  });

  describe('validateEmail', () => {
    it('should pass with valid email', () => {
      expect(() => validateEmail('test@example.com')).not.toThrow();
    });

    it('should pass with undefined email', () => {
      expect(() => validateEmail(undefined)).not.toThrow();
    });

    it('should throw with invalid email', () => {
      expect(() => validateEmail('invalid-email')).toThrow();
    });
  });

  describe('validatePhone', () => {
    it('should pass with valid phone', () => {
      expect(() => validatePhone('1234567890')).not.toThrow();
    });

    it('should throw with empty phone', () => {
      expect(() => validatePhone('')).toThrow();
    });

    it('should throw with short phone', () => {
      expect(() => validatePhone('123')).toThrow();
    });
  });
});
