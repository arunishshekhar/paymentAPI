import express from "express";
import { cardChecker } from "../controllers/allAPIFunction.js";


const router = express.Router();

router.post("/card-checker",cardChecker);

export default router;