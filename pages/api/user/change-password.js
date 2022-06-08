import { getSession } from "next-auth/client";

async function handler(req, res) {
  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
}
export default handler;
