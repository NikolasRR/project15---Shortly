import { nanoid } from "nanoid";

import db from "../database.js";

async function shortenURL (req, res) {
    const { id } = res.locals.user;

    try {
        const shortURL = nanoid(8);

        await db.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`, [req.body.url, shortURL, id]);
        res.status(201).send({ shortURL: shortURL });

    } catch (error) {
        res.sendStatus(500);
    }
}

async function getThisURL (req, res) {
    const { id } = req.params;

    try {
        const result = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if (!result.rows[0]) {
            return res.status(404).send('URL with passed ID does not exist');
        }

        delete result.rows[0].clicks;
        delete result.rows[0].userId;
        return res.send(result.rows[0]);

    } catch (error) {
        if (error.code === '22P02') {
            return res.status(422).send('ID must be a integer');
        }
        res.sendStatus(500);
    }
}

async function openThisURL (req, res) {
    const { shortUrl } = req.params;

    try {
        const result = await db.query(`
            UPDATE urls 
            SET clicks = clicks + 1 
            WHERE "shortUrl" = $1
            RETURNING *
        `, [shortUrl]);

        if (!result.rows[0]) {
            return res.status(404).send('ShortUrl not found');
        }

        res.redirect(result.rows[0].url);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function deleteThisURL (req, res) {

}

export { shortenURL, getThisURL, openThisURL, deleteThisURL };