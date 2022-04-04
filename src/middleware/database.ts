import dotConf, { config } from "dotenv";
import { Db, MongoClient } from "mongodb";
dotConf.config();

interface ConnectType {
  db: Db;
  client: MongoClient;
}

// process.env.MONGODB_URI
const client = new MongoClient(
  "coloqueoseupath",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export default async function dbConnect(): Promise<ConnectType> {
  if (!client.isConnected()) await client.connect();
  const db = client.db(process.env.MONGODB_DB);
  // console.log('process.env.MONGODB_URI: ', process.env.MONGODB_URI)
  console.log("DB is up!");
  return { db, client };
}
