import { createAuthenticatedFunction } from '@/utils/creators/auth.creator';
import { logger } from '@/utils/logger.util';

interface GetUserRequest {
  userId: string;
}

interface GetUserResponse {
  id: string;
  name: string;
  email?: string;
}

export const getUser = createAuthenticatedFunction<GetUserRequest, GetUserResponse>(
  async (data, context) => {
    logger.info('Getting user', { userId: data.userId });
    
    return {
      id: data.userId,
      name: 'Demo User',
      email: 'demo@example.com',
    };
  }
);
