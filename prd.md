# 📘 Product Requirements Document (PRD)

# Product

**Project:** Edulearn

**Version:** 1.0

**Type:** Full Stack Learning Management System (LMS)

---

# Vision

Build a modern LMS where instructors can easily create and monetize courses while students can learn through an engaging, secure, and scalable platform.

---

# Problem Statement

Many online learning platforms are expensive, difficult to manage, or lack proper learning analytics.

Edulearn aims to provide:

- Easy course creation
- Secure authentication
- Affordable learning
- Progress tracking
- Instructor management
- Scalable architecture

---

# Goals

## Students

- Register/Login
- Browse Courses
- Purchase Courses
- Learn
- Track Progress

---

## Instructors

- Apply to become instructor
- Create Courses
- Upload Lectures
- Publish Courses
- Manage Students

---

## Admin

- Manage Users
- Approve Instructor Applications
- Manage Courses
- Platform Monitoring

---

# User Roles

## Student

- Register
- Login
- Purchase Courses
- Watch Lectures
- Track Progress

---

## Instructor

- Course CRUD
- Lecture CRUD
- Publish Courses
- Draft Courses
- View Enrollments

---

## Admin

- User Management
- Course Management
- Instructor Review
- Platform Administration

---

# Core Modules

## Authentication

- Register
- Login
- Refresh Tokens
- Logout
- Forgot Password
- Reset Password
- Email Verification

---

## Instructor Applications

Student

↓

Submit Application

↓

Admin Review

↓

Approve / Reject

↓

Email Notification

↓

Instructor Role Assigned

---

## Course Management

- Create
- Update
- Delete
- Publish
- Draft
- Categories
- Levels
- Language
- Pricing

---

## Lecture Management

- Create Lecture
- Upload Video
- Upload Resources
- Preview Lecture
- Lecture Ordering

---

## Enrollment

### Free

Student

↓

Enroll

↓

Access Granted

---

### Paid

Student

↓

Stripe Checkout

↓

Payment Verification

↓

Enrollment Created

↓

Access Granted

---

## Learning

Student

↓

Open Course

↓

Watch Lecture

↓

Progress Saved

↓

Completion Updated

↓

Resume Learning

---

# Progress Tracking

Track

- Completed Lectures
- Watch Time
- Completion Percentage
- Last Watched Lecture

---

# Business Rules

- Email must be verified
- JWT required for protected routes
- Refresh Tokens required
- One enrollment per course
- Only instructors create courses
- Only owners/admin edit courses
- Published courses visible publicly
- Draft courses visible only to instructors/admin

---

# Security

- JWT Authentication
- Passport.js
- Refresh Tokens
- RBAC
- Helmet
- HPP
- Arcjet Protection
- Zod Validation
- HttpOnly Cookies

---

# Storage

## MongoDB Atlas

Stores

- Users
- Courses
- Lectures
- Instructor Applications
- Enrollments
- Progress

---

## Redis

Stores

- Email Verification Tokens
- Password Reset Tokens
- Cached Courses
- Cached Instructor Applications

---

## Cloudinary

Stores

- Course Thumbnails
- Lecture Videos
- Course Assets

---

# External Services

- Stripe
- Resend
- Cloudinary
- Arcjet

---

# High-Level Architecture

```
React Router

        │

Axios

        │

Express

        │

Controllers

        │

MongoDB
        │
Redis

        │

Cloudinary
Stripe
Resend
```

---

# Non-Functional Requirements

- Mobile Responsive
- Fast API Response (<300ms target)
- Scalable Architecture
- Secure Authentication
- Cache Frequently Accessed Data
- Strong Input Validation
- Clean API Design

---

# Success Metrics

- Registered Users
- Active Students
- Active Instructors
- Course Completion Rate
- Paid Enrollments
- Revenue
- Average Course Rating

---

# Future Roadmap

## Phase 1

- Authentication
- Instructor Applications
- Course CRUD
- Lecture CRUD

---

## Phase 2

- Payments
- Learning Dashboard
- Course Player
- Reviews

---

## Phase 3

- Certificates
- Instructor Analytics
- Student Analytics
- Notifications
- Wishlist
- Search
- AI Course Recommendations

---

# Current Development Status

## ✅ Completed

- Authentication
- Authorization
- Redis Integration
- Email System
- Instructor Applications
- Admin Dashboard
- Validation Layer
- Docker Development Setup
- Caching Layer

---

## 🚧 In Progress

- Course Module
- Lecture Module

---

## 📅 Planned

- Enrollment
- Payments
- Learning Progress
- Reviews
- Certificates
- Analytics
