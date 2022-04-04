import * as dotConf from "dotenv";
import mongoose from "mongoose";
dotConf.config();

export default async function runDB(): Promise<void> {
  let connection = mongoose.connection;

  try{
      const client = await mongoose
        .connect(`${process.env.MONGODB_URI}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        })
        .catch((error) => console.error(error));

      console.info("DB is up!");
  } catch(err: any){ console.error(err) }

}


