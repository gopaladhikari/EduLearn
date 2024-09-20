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

// Routes declaration

app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/admin", mainAdminRouter);

export { app };
