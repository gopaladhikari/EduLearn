import { Router } from "express";
import {
  getStories,
  addStory,
  deleteStory,
  updateStory,
} from "../../controllers/admin/story.controller";
import { verifyJWT } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer.middleware";

const storyRouter = Router();

storyRouter.route("/get").get(verifyJWT, getStories);

storyRouter
  .route("/create")
  .post(upload.single("story"), verifyJWT, addStory);

storyRouter
  .route("/update/:storyId")
  .put(upload.single("story"), verifyJWT, updateStory);

storyRouter.route("/delete/:storyId").delete(verifyJWT, deleteStory);

export { storyRouter };
