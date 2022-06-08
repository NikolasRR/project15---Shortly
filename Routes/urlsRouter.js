import express from "express";

const urlsRouter = express.Router();

urlsRouter.post("/url/shorten");
urlsRouter.get("/url/:id");
urlsRouter.get("/open/:shortUrl");
urlsRouter.delete("/url/:id");


export default urlsRouter;