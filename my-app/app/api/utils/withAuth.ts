import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      (req as any).user = decoded; // attach the decoded token to request
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}
