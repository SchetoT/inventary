import { Router } from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";

const router = Router();

//POST

router.post("/register", registerController);
router.post("/login", loginController);

export default router;