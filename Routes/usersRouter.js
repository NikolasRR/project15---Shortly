import express from "express";

import { getRanking, getUserURLs } from "../Controllers/usersController.js";
import tokenVerifier from "../Middleware/tokenMiddleware.js";

const usersRouter = express.Router();

usersRouter.get("/users/:id", tokenVerifier, getUserURLs);
usersRouter.get("/ranking", getRanking);


export default usersRouter;