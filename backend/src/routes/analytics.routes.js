import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { click, getStats } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/click/:id", click);
router.get("/stats", auth, getStats);

export default router;