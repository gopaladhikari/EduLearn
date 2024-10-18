# E-learning

E-learning is the software that allows teachers to upload courses and students to enroll in them. It provides a platform for managing course uploads, student enrollments, and caching for improved performance.

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
