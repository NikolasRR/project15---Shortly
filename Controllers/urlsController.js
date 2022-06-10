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

        delete result.rows[0].createdAt;
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
        
        console.log(result.rows[0].url);
        res.redirect(result.rows[0].url);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function deleteThisURL (req, res) {
    const userId = res.locals.user.id;
    const urlId = req.params.id;

    try {
        const result = await db.query(`
            DELETE FROM urls
            WHERE id = $1 AND "userId" = $2
            RETURNING *
        `, [urlId, userId]);
        
        if (!result.rows[0]) {
            const newResult = await db.query(`SELECT * FROM urls WHERE id = $1`, [urlId]);

            if (!newResult.rows[0]) {
                return res.status(404).send('URL does not exist');
            }

            return res.status(401).send('URL does not belong to user');
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error)
        console.log(error);
    }
}

export { shortenURL, getThisURL, openThisURL, deleteThisURL };