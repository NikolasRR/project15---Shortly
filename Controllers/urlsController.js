import { nanoid } from "nanoid";

import db from "../database.js";

async function shortenURL(req, res) {
    const { id } = res.locals.user;

    try {
        const shortURL = nanoid(8);

        await db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`, [req.body.url, shortURL, id]);
        res.status(201).send({ shortURL: shortURL });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).send('URL já cadastrada');
        }
        res.sendStatus(500);
    }
}

async function getThisURL(req, res) {

}

async function openThisURL(req, res) {

}

async function deleteThisURL(req, res) {

}

export { shortenURL, getThisURL, openThisURL, deleteThisURL };