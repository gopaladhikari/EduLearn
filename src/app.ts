import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Import statements for routes
import { contactUsRouter } from "./routes/user/contactus.routes";
import { lessonRouter } from "./routes/lesson.routes";
import { topReviewsRouter } from "./routes/user/topReviews.routes";
import { userDetailsRouter } from "./routes/user/userDetails.routes";
import { advertisementBannerRouter } from "./routes/admin/advertisementBanner.routes";
import { couponRouter } from "./routes/admin/coupon.routes";
import { currentPursuingRouter } from "./routes/admin/currentPursuing.routes";
import { mainCourseRouter } from "./routes/admin/mainCourse.routes";
import { universityRouter } from "./routes/admin/university.routes";
import { authRouter } from "./routes/auth.routes";
import { notificationRouter } from "./routes/user/notification.routes";
import { libraryRouter } from "./routes/user/library.routes";
import { tipsRouter } from "./routes/user/tips.routes";
import { wishlistRouter } from "./routes/user/wishlist.routes";
import { addNoteRouter } from "./routes/user/addNote.routes";
import { storyRouter } from "./routes/admin/story.routes";
import { bookmarkRouter } from "./routes/user/bookmark.routes";

// Routes declaration
app.use("/api/v1/contactus", contactUsRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/top-reviews", topReviewsRouter);
app.use("/api/v1/user-details", userDetailsRouter);
app.use("/api/v1/advertisement-banner", advertisementBannerRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/current-pursuing", currentPursuingRouter);
app.use("/api/v1/main-courses", mainCourseRouter);
app.use("/api/v1/university", universityRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/tips", tipsRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/add-notes", addNoteRouter);
app.use("/api/v1/story", storyRouter);
app.use("/api/v1/bookmark", bookmarkRouter);

export { app };
