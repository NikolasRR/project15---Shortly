import express from "express";

const usersRouter = express.Router();

usersRouter.get("/users/:id");
usersRouter.get("/open/ranking");


export default usersRouter;