import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../database.js";


async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const encryptedPassword = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, encryptedPassword]);
        res.sendStatus(201);

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).send('O e-mail informado já está cadastrado');
        }
        res.sendStatus(500);
    }
}

async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!user.rows[0]) {
            return res.status(401).send("Email inválido");
        }
        if (!bcrypt.compareSync(password, user.rows[0].password)) {
            return res.status(401).send("Senha inválida");
        }

        delete user.rows[0].password;
        delete user.rows[0].id;

        const config = { expiresIn: 60*60 };
        const token = jwt.sign(user.rows[0], process.env.JWT_SECRET, config);
        res.send(token).status(200);

    } catch (error) {
        res.status(500).send(error);
    }
}

export { signUp, signIn }