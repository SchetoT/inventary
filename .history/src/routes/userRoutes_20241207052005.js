import { Router } from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { authorize, protect } from "../middlewares/authMiddlewares.js";

const router = Router();

//GET



//POST

router.post('/register', registerController);
router.post('/login', loginController);


export default router;