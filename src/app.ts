import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Import statements for routes
import { contactUsRouter } from "./routes/customer/contactus.routes";
import { lessonRouter } from "./routes/lesson.routes";
import { topReviewsRouter } from "./routes/customer/topReviews.routes";
import { userDetailsRouter } from "./routes/customer/userDetails.routes";
import { advertisementBannerRouter } from "./routes/admin/advertisementBanner.routes";
import { couponRouter } from "./routes/admin/coupon.routes";
import { currentPursuingRouter } from "./routes/admin/currentPursuing.routes";
import { mainCourseRouter } from "./routes/admin/mainCourse.routes";
import { universityRouter } from "./routes/admin/university.routes";
import { notificationRouter } from "./routes/customer/notification.routes";
import { libraryRouter } from "./routes/customer/library.routes";
import { tipsRouter } from "./routes/customer/tips.routes";
import { wishlistRouter } from "./routes/customer/wishlist.routes";
import { addNoteRouter } from "./routes/customer/addNote.routes";
import { storyRouter } from "./routes/admin/story.routes";
import { bookmarkRouter } from "./routes/customer/bookmark.routes";
import { walletRouter } from "./routes/customer/wallet.routes";
import { transactionRouter } from "./routes/customer/transaction.routes";
import { cartRouter } from "./routes/customer/cart.routes";

import { customerRouter } from "./routes/customer/index.routes";

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
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/library", libraryRouter);
app.use("/api/v1/tips", tipsRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/add-notes", addNoteRouter);
app.use("/api/v1/story", storyRouter);
app.use("/api/v1/bookmark", bookmarkRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/cart", cartRouter);

// Customer

app.use("/api/v1/customer", customerRouter);

export { app };
