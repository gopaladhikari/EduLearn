# 🗺️ Edulearn Master Roadmap

This roadmap follows a **vertical slice architecture**, meaning we build one complete feature end-to-end (from the database to the React Router 7 UI) before moving to the next.

## 📦 Phase 1: The Content Pipeline (Course & Lecture Builder)

_Goal: Enable instructors to successfully upload and sequence their teaching materials[cite: 6]._

### Backend (Express)

- [ ] **Lecture Model & Controller:** Build the controller to accept video files via Multer, upload them to Cloudinary, and extract the video duration.
- [ ] **Lecture CRUD Endpoints:** Implement `POST`, `PATCH`, `DELETE`, and `GET` for lectures tied to a specific `courseId`[cite: 6].
- [ ] **Ordering Endpoint:** Build a `PATCH /reorder` endpoint that accepts an array of lecture IDs and updates their sequence in bulk.

### Frontend (React Router 7)

- [ ] **Multipart Form Upgrade:** Refactor `CreateCoursePage` to use `FormData` and `encType="multipart/form-data"` so the thumbnail file transmits to the backend correctly.
- [ ] **Curriculum Manager UI:** Build the instructor dashboard view to drag-and-drop lectures, upload videos, and trigger the publish/draft course states.

---

## 💳 Phase 2: Discovery & Monetization (Catalog & Checkout)

_Goal: Allow students to find courses and successfully pay for them via Stripe[cite: 6]._

### Backend (Express)

- [ ] **Search & Filter API:** Enhance the `getCourses` endpoint to accept query parameters for text search, categories, difficulty levels, and price filtering.
- [ ] **Stripe Webhook:** Implement the `/api/v1/payments/webhook` route using `express.raw()` to securely listen for `checkout.session.completed` events.
- [ ] **Payment Fulfillment:** Write the webhook logic to update the `CourseEnrollment` status to `COMPLETED` and trigger the Resend success email.

### Frontend (React Router 7)

- [ ] **Course Catalog UI:** Build the public `/courses` page with a search bar and sidebar filters that instantly update the URL search parameters.
- [ ] **Checkout Integration:** Connect the `CartPage` checkout button to the `/api/v1/enrollments/:courseId` endpoint to redirect the user to the Stripe hosted checkout.

---

## 🎓 Phase 3: The Classroom (Player & Progress)

_Goal: Deliver the core learning experience and track student progression[cite: 6]._

### Backend (Express)

- [ ] **Progress API:** Build the controllers for the `CourseProgress` model to record watch time and toggle a lecture's `isCompleted` status[cite: 6].
- [ ] **Completion Math:** Implement backend logic to calculate the `completionPercentage` and mark the course as fully completed when it hits 100%[cite: 6].

### Frontend (React Router 7)

- [ ] **Course Player Layout:** Design the learning dashboard featuring the main video player and a collapsible sidebar containing the lecture playlist.
- [ ] **State Syncing (Heartbeat):** Implement a background `useFetcher` that pings the backend every 15 seconds to save the student's video timestamp so they can resume exactly where they left off[cite: 6].

---

## ⭐ Phase 4: Social Proof & Moderation (Reviews & Trust)

_Goal: Drive course sales through student feedback and maintain platform quality[cite: 6]._

### Backend (Express)

- [ ] **Review Engine:** Create a `Review` Mongoose model and endpoints for enrolled students to leave a 1-5 star rating and text review[cite: 6].
- [ ] **Rating Aggregation:** Write a Mongoose aggregation pipeline that automatically recalculates a course's overall average rating on new review submissions.
- [ ] **User Moderation API:** Finalize the admin endpoints to mute, temporarily ban, or permanently ban malicious users.

### Frontend (React Router 7)

- [ ] **Course Details Page:** Design the public-facing landing page for individual courses, displaying the curriculum, instructor bio, and aggregated student reviews.
- [ ] **Review Form:** Add a modal for students who have completed a course to submit their rating.

---

## 📈 Phase 5: Insights & Dashboards

_Goal: Provide users with the data they need to track their success and platform metrics[cite: 6]._

### Backend (Express)

- [ ] **Admin Analytics API:** Create endpoints aggregating total platform revenue, active users, and pending instructor applications[cite: 6].
- [ ] **Instructor Analytics API:** Create endpoints aggregating individual course sales, total enrollments, and revenue splits.

### Frontend (React Router 7)

- [ ] **Admin Dashboard UI:** Populate the placeholder `/admin` routes with data tables and charts showing platform growth.
- [ ] **Instructor Dashboard UI:** Build the UI showing instructors their revenue metrics and top-performing courses.
