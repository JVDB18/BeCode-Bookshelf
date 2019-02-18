/* becodeorg/bookshelf
 *
 * /src/server/authentication.js - Authentication logic
 *
 * coded by Tanguy@Team Noix
 * started at 15/02/2019
 */

import jwt from "jsonwebtoken";

export const verifyToken = function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                reject(err);
            }

            resolve(decodedToken);
        });
    });
};

export const createToken = function(sessionData) {
    const options = {
        expiresIn: 3600, // Expiration time in second
        algorithm: "HS256",
    };
    let token = jwt.sign({data: sessionData}, process.env.AUTH_SECRET, options);

    return token;
};

export const authMiddleware = function(request, response, next) {
    // get token from localstorage
    let token = req.body.token;

    verifyToken(token)
        .then(decodedToken => {
            request.user = decodedToken.data;
            next();
        })
        .catch(error => {
            console.error(error);
            res.json(error);
        });
};

export default {
    verifyToken,
    createToken,
    authMiddleware,
};
