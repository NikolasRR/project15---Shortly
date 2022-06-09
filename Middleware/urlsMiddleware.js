import joi from "joi";

async function postedURLVerifier (req, res, next) {
    const { url } = req.body;

    if (!url) {
        return res.status(422).send("URL faltando");
    }

    const correctFormat = url.startsWith('http://') || url.startsWith('https://');
    if (!correctFormat) {
        return res.status(422).send('A url precisa começar com "https://" ou "http://"');
    }
    next();
}

export { postedURLVerifier }