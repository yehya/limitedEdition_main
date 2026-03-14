import { HttpsError } from 'firebase-functions/v2/https';

export const validateUserId = (userId: string): void => {
  if (!userId || typeof userId !== 'string' || userId.length < 3) {
    throw new HttpsError('invalid-argument', 'Valid user ID is required');
  }
};

export const validateEmail = (email?: string): void => {
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpsError('invalid-argument', 'Valid email is required');
  }
};

export const validatePhone = (phone: string): void => {
  if (!phone || typeof phone !== 'string' || phone.length < 10) {
    throw new HttpsError('invalid-argument', 'Valid phone number is required');
  }
};
