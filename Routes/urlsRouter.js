import express from "express";

import tokenVerifier from "../Middleware/tokenMiddleware.js";
import { postedURLVerifier } from "../Middleware/urlsMiddleware.js";
import { shortenURL, getThisURL, openThisURL, deleteThisURL } from "../Controllers/urlsController.js";

const urlsRouter = express.Router();

urlsRouter.post("/url/shorten", tokenVerifier, postedURLVerifier, shortenURL);
urlsRouter.get("/url/:id", getThisURL);
urlsRouter.get("/open/:shortUrl", openThisURL);
urlsRouter.delete("/url/:id", deleteThisURL);


export default urlsRouter;