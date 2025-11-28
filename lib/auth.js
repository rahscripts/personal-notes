import * as jwt from "jsonwebtoken";
//file of creating middleware to verify jwt

export function verifyToken(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    if (!token) return null;
    //connecting token with generated token;something idk learning
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch (err) {
        console.log(err)
    }
}