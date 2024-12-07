import { Router } from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { createUser } from "../controllers/user/createUser.js"; 
import { getAllUsers } from "../controllers/user/getAllUser.js";
import { authorize, protect } from "../middlewares/authMiddlewares.js";
import { getUserById } from "../controllers/user/getUserById.js";

const router = Router();

//GET
router.get('/', protect, getAllUsers)
//router.get('/:id', protect, getUserById)

//POST

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/', createUser);

export default router;