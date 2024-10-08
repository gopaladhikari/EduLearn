import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Import statements for router

import { customerRouter } from "./routes/customer/index.routes";
import { mainAdminRouter } from "./routes/admin/index.routes";
import { ApiSuccess } from "./utils/apiResponse";

// Routes declaration

app.get("/", (req, res) => {
  res.status(200).json(new ApiSuccess("Welcome to E-learning", null));
});

app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/admin", mainAdminRouter);

export { app };
