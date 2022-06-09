import express from "express";

import tokenVerifier from "../Middleware/tokenMiddleware.js";
import { postedURLVerifier } from "../Middleware/urlsMiddleware.js";
import { shortenURL, getThisURL, openThisURL, deleteThisURL } from "../Controllers/urlsController.js";

const urlsRouter = express.Router();

urlsRouter.post("/urls/shorten", tokenVerifier, postedURLVerifier, shortenURL);
urlsRouter.get("/urls/:id", getThisURL);
urlsRouter.get("/urls/open/:shortUrl", openThisURL);
urlsRouter.delete("/urls/:id", deleteThisURL);


export default urlsRouter;