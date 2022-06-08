import express from "express";
import cors from "cors";
import chalk from "chalk";
import "dotenv/config";

import authRouter from "./Routes/authRouter.js";
import urlsRouter from "./Routes/urlsRouter.js";
import usersRouter from "./Routes/usersRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlsRouter);
app.use(usersRouter);

app.listen(process.env.PORT, () => console.log(chalk.bold.blue(`Server running at port ${process.env.PORT}`)));