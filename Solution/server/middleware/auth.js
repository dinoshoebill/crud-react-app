import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const isGoogleAuth = token.length > 500;

        let data;

        if (token && !isGoogleAuth) {
            data = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = data?.id;
        } else {
            data = jwt.decode(token);

            req.userId = data?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;