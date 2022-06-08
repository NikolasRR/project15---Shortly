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

}

export { signUp, signIn }