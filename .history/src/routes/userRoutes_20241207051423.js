import { Router } from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { createUser } from "../controllers/user/createUserDef.js"; 
import { getAllUserDef } from "../controllers/user/getAllUserDef.js";
import { authorize, protect } from "../middlewares/authMiddlewares.js";

const router = Router();

//GET
router.get('/', protect, getAllUsersDef)


//POST

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/', createUser);

export default router;