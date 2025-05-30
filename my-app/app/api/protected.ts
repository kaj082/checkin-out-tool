import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "./utils/withAuth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = (req as any).user;
  res.status(200).json({ message: "Access granted", user });
}

export default withAuth(handler);
