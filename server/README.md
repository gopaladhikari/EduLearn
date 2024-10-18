# E-learning

E-learning is the software that allows teachers to upload courses and students to enroll in them. It provides a platform for managing course uploads, student enrollments, and caching for improved performance.

## Requirements

- Node.js
- MongoDB
- npm

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:gopaladhikari/e-learning.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following variables:

```bash
MONGO_URI= # mongodb URI goes here
JWT_SECRET= # JWT secret goes here
TWILIO_ACCOUNT_SID= # Twilio account SID goes here
TWILIO_AUTH_TOKEN= # Twilio auth token goes here
TWILIO_PHONE_NUMBER= # Twilio phone number goes here
DB_NAME= # Database name goes here
RAZORPAY_ID_KEY= # Razorpay ID key goes here
RAZORPAY_SECRET_KEY= # Razorpay secret key goes here
```

4. Start the server:

```bash
npm start
```

## Project Structure

```bash
├── controllers        # Controllers for handling API requests
├── middleware         # Custom middleware for authentication and validation
├── models             # Mongoose models for Courses, Users, Enrollments
├── routes             # API route definitions
├── utils              # Helper functions (e.g., dbHandler)
├── schemas            # zod validations
└── db                 # Database connection
├── app.ts             # All routes, middlewares configured here
└── index.ts           # Entry point of the application and database inilialization
```
