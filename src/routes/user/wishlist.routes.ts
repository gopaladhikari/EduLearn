import { Router } from "express";
import {
  addWishlist,
  deleteWishlist,
  getWishlist,
} from "../../controllers/user/wishtlist.controller";

const router = Router();

router.get("/:userId", getWishlist);
router.post("/", addWishlist);
router.delete("/", deleteWishlist);

export { router as wishlistRouter };
