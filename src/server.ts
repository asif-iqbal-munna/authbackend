import mongoose from "mongoose";
import app from "./app";
import config from "./config";


const connectToDb = async () => {
  try {
    if(config.database_url){
      await mongoose.connect(config.database_url);

      console.log("connected to the db");

      app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`)
      })

    } else {
      console.log("db url needed");
    }
  } catch (error) {
    console.log("not able to connect with db")
  }
}

connectToDb()