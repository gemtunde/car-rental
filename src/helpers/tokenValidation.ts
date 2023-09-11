import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function validateTokenAndGetUserId(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  try {
    if (!token) {
      throw new Error("No token found");
    }

    // Verify token
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decodedToken._id;

    return userId;
  } catch (error) {
    return error;
  }
}
