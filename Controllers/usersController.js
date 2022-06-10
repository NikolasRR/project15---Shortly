import db from "../database.js";

async function getUserURLs (req, res) {
    const { id } = req.params;

    try {
        const result = await db.query(`
        SELECT users.id, users.name, SUM(clicks) AS "visitCount", json_agg(json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls.clicks)) AS "urls"
        FROM users
        JOIN urls ON users.id = urls."userId"
        WHERE users.id = $1
        GROUP BY users.id
        `, [id]);

        if (!result.rows[0]) {
            const newResult = await db.query(`
                SELECT id, name FROM users WHERE id = $1
            `, [id]);
            if (!newResult.rows[0]) {
                return res.status(404).send('User does not exist');
            }

            newResult.rows[0].visitCount = 0;
            newResult.rows[0].shortenedUrl = [];

            return res.send(newResult.rows[0]);
        }
        res.send(result.rows);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function getRanking (req, res) {
    
}

export { getUserURLs, getRanking };