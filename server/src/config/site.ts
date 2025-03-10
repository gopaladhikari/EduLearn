import type { CookieOptions } from 'express';

export const site = {
  name: 'EduLearn',
  domain: {
    admin:
      process.env.NODE_ENV === 'production'
        ? 'https://admin-edulearn.netlify.app'
        : 'http://localhost:3001',
    user:
      process.env.NODE_ENV === 'production'
        ? 'https://user-edulearn.netlify.app'
        : 'http://localhost:3002',
  },
} as const;

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 7,
};
