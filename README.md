# E-learning

This repository contains the backend code for an E-Learning Platform built using Node.js and Express. It provides functionality for managing course uploads by teachers, student enrollments, and caching for improved performance.

## Features

- Teacher Uploads: Teachers can upload courses including course details and content.

- Student Enrollment: Students can browse available courses and enroll in the ones they are interested in.

- Caching: To improve performance, a simple caching system is implemented using node-cache for frequently accessed data.

- Single Seller: The platform supports only one teacher/seller to upload and manage courses.

## Tech Stack

- Backend Framework: Node.js with Express.js
- Database: MongoDB
- Caching: node-cache for in-memory caching
- Authentication: JSON Web Tokens (JWT) for secure access and authorization.
- Validation: zod for input validation.

## Requirements

- Node.js
- MongoDB
- npm

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/gopuadks/e-learning.git
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
├── app.js             # Entry point to the application
└── server.js          # Server configuration and setup
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you encounter any bugs or have feature requests.

## LICENSE

License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/gopaladhikari/e-learning?tab=MIT-1-ov-file) file for details.
