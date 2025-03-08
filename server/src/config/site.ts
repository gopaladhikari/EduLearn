import type { CookieOptions } from 'express';

export const site = {
  name: 'EduLearn',
  domain: [
    'http://localhost:3001',
    'http://localhost:3002',
    'https://admin-edulearn.netlify.app',
  ],
};

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
};
