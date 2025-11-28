import { connectDB } from "../../../../lib/db";
import Note from "../../../../lib/models/Note";
import { verifyToken } from "../../../../lib/auth";
//ADD NOTE API( PROTECTED )
export async function POST(req) {
    await connectDB();
    console.log("db connect bro");

    const userId = verifyToken(req);
    if (!userId) {
        return Response.json({error: 'Unauthorized'}, {status: 401});
    }

    const {title, content} = await req.json();

    const note = await Note.create({
        userId,
        title,
        content
    });

    return Response.json ({msg: "Note added", note});
}