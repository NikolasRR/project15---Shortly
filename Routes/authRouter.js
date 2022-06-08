import express from "express";

import { signIn, signUp } from "../Controllers/authController.js";
import { signUpDataVerification, singInDataValidation } from "../Middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUpDataVerification, signUp);
authRouter.post("/signin", singInDataValidation, signIn);

export default authRouter;