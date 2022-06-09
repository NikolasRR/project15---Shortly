import jwt from "jsonwebtoken";

async function tokenVerifier(req, res, next) {
    const rawToken = req.headers.authorization;
    if (!rawToken) {
        return res.status(401).send('Token faltando')
    }

    try {
        const token = rawToken.replace("Bearer ", "");
        const user = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = user;

        next();
    } catch (error) {
        res.status(401).send('Token inválido ou expirado');
    }
}

export default tokenVerifier;