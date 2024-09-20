import { Router } from "express";
import {
  getStories,
  addStory,
  deleteStory,
  updateStory,
} from "../../controllers/admin/story.controller";
import { verifyCustomer } from "../../middlewares/customer.middleware";
import { upload } from "../../middlewares/multer.middleware";

const storyRouter = Router();

storyRouter.route("/get").get(verifyCustomer, getStories);

storyRouter
  .route("/create")
  .post(upload.single("story"), verifyCustomer, addStory);

storyRouter
  .route("/update/:storyId")
  .put(upload.single("story"), verifyCustomer, updateStory);

storyRouter.route("/delete/:storyId").delete(verifyCustomer, deleteStory);

export { storyRouter };
