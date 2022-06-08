import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid email or password",
    });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();
  const users = db.collection("users");

  const existingUser = await users.findOne({ email });

  if (!existingUser) {
    const hashedPassword = await hashPassword(password);

    const results = await users.insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created",
      userId: results.insertedId,
    });
  } else {
    res.status(422).json({
      message: "User already exists",
    });
  }
}

export default handler;
