import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await connectDB();
    console.log('signup api hit');
    const {name, email, password} = await req.json();

    //check existing user
    const exists = await User.findOne({ email });
    if (exists){
        return Response.json({error: 'User already exists'}, {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return Response.json({message: 'signup successfull', userId: user._id}); 
}

