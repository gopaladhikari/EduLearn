import { Router } from "express";
import {
  getStories,
  addStory,
  deleteStory,
  updateStory,
} from "../../controllers/admin/story.controller";
import { verifyJwt } from "../../middlewares/verifyJwt";
import { upload } from "../../middlewares/multer.middleware";

const storyRouter = Router();

storyRouter.route("/").get(verifyJwt, getStories);

storyRouter
  .route("/create")
  .post(upload.single("story"), verifyJwt, addStory);

storyRouter
  .route("/update/:storyId")
  .put(upload.single("story"), verifyJwt, updateStory);

storyRouter.route("/delete/:storyId").delete(verifyJwt, deleteStory);

export { storyRouter };
