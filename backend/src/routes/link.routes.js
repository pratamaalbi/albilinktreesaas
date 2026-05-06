import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { create, getMyLinks, remove } from "../controllers/link.controller.js";
import { getPublicLinks } from "../controllers/link.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/public/:username', getPublicLinks);
router.use(authMiddleware);
router.post("/", auth, create);
router.get("/", auth, getMyLinks);
router.delete("/:id", auth, remove);

export default router;