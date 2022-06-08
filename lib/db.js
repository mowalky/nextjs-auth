import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nextjs.iimds.mongodb.net/auth-demo?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  );
  return client;
}
