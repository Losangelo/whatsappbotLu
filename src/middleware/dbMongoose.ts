import * as dotConf from "dotenv";
import mongoose from "mongoose";
dotConf.config();

// const VV =  "mongodb+srv://losangelo:olegnasol@cluster0.lsx7k.mongodb.net/dbEmpreenderComFestas?retryWrites=true&w=majority",
export default async function runDB(): Promise<void> {
  let connection = mongoose.connection;

  try{
      // console.log("######################################");
      // console.info(`${process.env.MONGODB_URI}`);
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


