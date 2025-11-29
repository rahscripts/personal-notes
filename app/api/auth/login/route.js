import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';

export async function POST(req) {
    await connectDB();
    console.log('db connected');

    const {email, password} = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
        return Response.json({error: 'User not found'}, {status: 400});

    };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return Response.json({error: "invalid password"}, {status: 400});
    };

    const token = jwt.sign(
        {userId: user._id.toString()},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    return Response.json({msg: 'Login succes', token});
};