import { connectDB } from "../../../../lib/db";
import Note from "../../../../lib/models/Note";
import { verifyToken } from "../../../../lib/auth";

export async function GET(req) {
    await connectDB();
    console.log("get db connented");

    const userId = verifyToken(req);

    if (!userId) {
        return Response.json({error: "unauthorized"}, {status: 401});
    }

    const notes = await Note.find({userId}).sort({createdAt: -1});

    return Response.json({notes});
}