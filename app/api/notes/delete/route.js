import { connectDB } from "@/lib/db";
import Note from "@/lib/models/Note";
import { verifyToken } from "@/lib/auth";

export async function DELETE(req) {
    await connectDB();
    console.log("delete db connect");

    const userId = verifyToken(req);
    if (!userId) {
        return Response.json({error: "Unauthorized"}, {status: 401})
    }

    const { id } = await req.json();

    await Note.deleteOne({_id: id, userId});

    return Response.json({msg: "Note deleted"});
}