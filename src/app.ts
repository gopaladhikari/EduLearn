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

// Routes declaration
app.use("/api/v1/contactus", contactUsRouter);
app.use("/api/v1/lessons", lessonRouter);

export { app };
