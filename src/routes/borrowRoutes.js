import express from "express";
import { borrowBookController } from "../controllers/borrow.controller.js";
import { validateBody } from "../middleware/validator.js";
import { borrowBookSchema } from "../validators/borrowValidator.js";

const router = express.Router();

router.post("/borrow", validateBody(borrowBookSchema), borrowBookController);

export default router;
