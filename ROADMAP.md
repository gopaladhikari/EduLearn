# 🗺️ Edulearn Master Roadmap

This roadmap follows a **vertical slice architecture**, completing each feature end-to-end across the **Express Backend**, **FastAPI AI Service**, and **React Router 7 Frontend**.

---

## 📦 Phase 1: The Content Pipeline & AI Generation

_Goal: Enable instructors to build courses manually or generate structured curriculum and assets using AI._

### Backend (Express & FastAPI)

- [ ] **Lecture CRUD & Video Uploads:** Implement Express endpoints to upload lecture videos to Cloudinary, track duration, and manage ordering.
- [ ] **AI Course Outline Generator (FastAPI):** Create a `/generate-course` endpoint utilizing the Google GenAI SDK and Pydantic schema validation to produce structured JSON course outlines (title, description, modules, lectures).
- [ ] **AI Thumbnail Generator (FastAPI & Cloudinary):** Build an endpoint to generate promotional course imagery via an image generation model and stream directly to Cloudinary.

### Frontend (React Router 7)

- [ ] **Multipart Form Integration:** Refactor `CreateCoursePage` with `FormData` to transmit files to the Express server.
- [ ] **"Draft with AI" Modal:** Add a UI trigger allowing instructors to generate entire course structures and auto-populate form fields.
- [ ] **Curriculum Manager:** Build drag-and-drop lecture ordering, video upload progress bars, and publish/draft toggles.

---

## 💳 Phase 2: Discovery, Monetization & 24/7 AI Support

_Goal: Provide semantic course search, seamless checkout, and an autonomous platform chatbot._

### Backend (Express & FastAPI)

- [ ] **Edulearn-Aware RAG Chatbot (FastAPI):** Build a vector-search Q&A engine loaded with platform policies, FAQs, and course catalog metadata.
- [ ] **Semantic & Keyword Search API (Express):** Implement course catalog filtering by category, level, price, and semantic similarity.
- [ ] **Stripe Webhook & Fulfillment:** Create `/api/v1/payments/webhook` with `express.raw()` to handle `checkout.session.completed` and trigger confirmation emails.

### Frontend (React Router 7)

- [ ] **Homepage Chatbot Widget:** Build a floating chat component backed by a Zustand message store for instant customer support.
- [ ] **Course Catalog & Filtering:** Implement the `/courses` page with URL-driven search and category filters.
- [ ] **Cart & Checkout Integration:** Connect the shopping cart to Stripe Checkout sessions.

---

## 🎓 Phase 3: The Classroom & Contextual AI Tutor

_Goal: Deliver video playback, progress tracking, and an in-player AI learning assistant._

### Backend (Express & FastAPI)

- [ ] **Learning Progress API (Express):** Track watch time, lecture completion status, and dynamic completion percentage calculation.
- [ ] **In-Video AI Tutor (FastAPI):** Build a RAG assistant that answers student questions specifically using the active lecture transcript.
- [ ] **Auto-Quiz Generator (FastAPI):** Create an endpoint to generate multiple-choice quizzes and summaries from lecture transcripts.

### Frontend (React Router 7)

- [ ] **Course Player Layout:** Build a full-screen player with a collapsible playlist sidebar and progress checkboxes.
- [ ] **Progress Sync (Heartbeat):** Implement a background fetcher syncing video watch time every 15 seconds.
- [ ] **Player AI Assistant Tab:** Add an embedded chat panel inside the player for real-time lecture Q&A.

---

## ⭐ Phase 4: Social Proof, Moderation & Insights

_Goal: Maintain platform quality with AI content moderation, student reviews, and analytics._

### Backend (Express & FastAPI)

- [ ] **Automated Review Moderation (FastAPI):** Classify incoming course reviews and contact inquiries for toxicity and spam before persistence.
- [ ] **Reviews & Ratings Engine (Express):** Implement review submission and a Mongoose aggregation pipeline for average rating calculations.
- [ ] **Platform Analytics API (Express):** Provide aggregated metrics for revenue, active enrollments, and user growth.

### Frontend (React Router 7)

- [ ] **Course Details Page:** Display instructor credentials, course curriculum, and verified student reviews.
- [ ] **Admin Dashboard UI:** Implement data tables and charts for revenue tracking, application reviews, and user moderation.
- [ ] **Instructor Analytics UI:** Build a dashboard tracking course performance, student engagement, and payout balances.
