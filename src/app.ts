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

// Routes declaration
app.use("/api/v1/contactus", contactUsRouter);
app.use("/api/v1/lessons", lessonRouter);
app.use("/api/v1/top-reviews", topReviewsRouter);
app.use("/api/v1/user-details", userDetailsRouter);
app.use("/api/v1/advertisement-banner", advertisementBannerRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/current-pursuing", currentPursuingRouter);
app.use("/api/v1/main-courses", mainCourseRouter);

export { app };
