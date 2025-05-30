import { NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export interface AuthRequest extends NextApiRequest {
  userId?: string;
}

export interface AuthRequest extends NextApiRequest {
  userId?: string;
}

export default function auth(
  req: AuthRequest,
  res: NextApiResponse,
  next: Function
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

export async function verifyJWT(req: NextRequest): Promise<string | null> {
  try {
    const authHeader = req.headers.get("authorization");
    console.log(authHeader, "authHeader");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    return payload.userId || null;
  } catch {
    return null;
  }
}
