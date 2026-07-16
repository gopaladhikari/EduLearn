# 🎓 Edulearn

A modern full-stack Learning Management System (LMS) built with React Router 7, Express 5, TypeScript, MongoDB, Redis, and Stripe.

Edulearn enables instructors to create and publish courses while allowing students to enroll, learn, and track their progress through a clean and scalable platform.

---

# ✨ Features

## Authentication

- Register & Login
- JWT Authentication
- Refresh Token Authentication
- Email Verification
- Forgot Password
- Change Password
- Secure HttpOnly Cookies

---

## Authorization

- Student
- Instructor
- Admin

Role-based access control (RBAC) throughout the application.

---

## Instructor Application

Students can apply to become instructors.

Features include:

- Submit instructor application
- Admin review dashboard
- Approve / Reject applications
- Email notifications
- Automatic instructor role upgrade

---

## Course Management

- Create Course
- Edit Course
- Delete Course
- Publish Course
- Draft Course
- Course Thumbnail Upload
- Categories
- Difficulty Level
- Language
- Pricing

---

## Lecture Management

- Create Lectures
- Upload Videos
- Preview Lectures
- Lecture Ordering
- Resources

---

## Enrollment

- Free Courses
- Paid Courses
- Stripe Payments
- Prevent Duplicate Enrollments

---

## Learning

- Course Player
- Lecture Progress
- Resume Learning
- Course Completion
- Progress Tracking

---

## Admin Dashboard

- Manage Users
- Manage Courses
- Review Instructor Applications
- Platform Analytics

---

# 🚀 Tech Stack

## Frontend

- React 19
- React Router 7
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios

---

## Backend

- Node.js 24
- Express 5
- TypeScript
- MongoDB Atlas
- Mongoose
- Passport.js
- JWT
- Redis
- Zod
- Multer
- Cloudinary
- Resend
- Arcjet

---

## Security

- JWT Authentication
- Refresh Tokens
- Passport.js
- Role-Based Access Control
- Helmet
- HPP
- Zod Validation
- Arcjet Bot Protection
- Rate Limiting
- HttpOnly Cookies

---

## Infrastructure

- MongoDB Atlas
- Redis
- Docker
- Netlify (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```
edulearn
│
├── client
│   ├── app
│   ├── routes
│   ├── components
│   ├── hooks
│   └── lib
│
├── server
│   ├── controllers
│   ├── models
│   ├── middlewares
│   ├── routes
│   ├── schemas
│   ├── utils
│   ├── emails
│   └── services
│
└── docker-compose.yml
```

---

# ⚡ Architecture

```
React Router 7

        │

Axios

        │

Express API

        │

Controllers

        │

MongoDB Atlas
        │
Redis Cache

        │

Cloudinary
Resend
Stripe
```

---

# ⚙️ Environment Variables

## Backend

```
PORT=

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

REDIS_URL=

ARCJET_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RESEND_API_KEY=

STRIPE_SECRET_KEY=

CLIENT_URL=
```

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/gopaladhikari/edulearn.git
```

Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

Start Redis

```bash
docker compose up -d
```

Run backend

```bash
npm run dev
```

Run frontend

```bash
npm run dev
```

---

# 📋 Roadmap

## ✅ Completed

- Authentication
- RBAC
- Email Verification
- Forgot Password
- Redis Integration
- Instructor Applications
- Admin Dashboard
- API Validation
- Docker Development
- Global Error Handling
- Redis Caching

---

## 🚧 In Progress

- Course CRUD
- Lecture CRUD
- Cloudinary Uploads

---

## 📅 Planned

- Stripe Payments
- Student Dashboard
- Instructor Dashboard
- Course Player
- Reviews
- Ratings
- Certificates
- Wishlist
- Analytics
- Notifications
- Testing

---

# 📄 License

MIT License
