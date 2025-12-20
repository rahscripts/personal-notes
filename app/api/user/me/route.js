import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("name email");

    return Response.json(user);
    
  } catch (err) {
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}
