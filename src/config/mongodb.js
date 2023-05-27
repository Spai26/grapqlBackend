import mongoose from "mongoose";

const connectionDB = async () => {
  const conn = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to the database successfully! It's time to work!");

  if (!conn) {
    console.log(`Connection error, please verify the credentials`);
  }
};

export default connectionDB;
