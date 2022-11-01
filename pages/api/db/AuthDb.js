import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.send({
      content: "Not authorized",
    });
  }
  if (req.method === "GET") {
    const user_id = req.query.id

    return res.send({
      message: user_id
    })
  }
}