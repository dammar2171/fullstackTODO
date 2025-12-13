import express from "express";
import { insertUser ,loginUser} from "../controllers/user_controller.js";
const router = express.Router();

router.post("/insertUser",insertUser);
router.post("/loginUser",loginUser);

export default router;