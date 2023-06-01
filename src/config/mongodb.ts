import mongoose, { ConnectOptions } from 'mongoose';

let database: mongoose.Connection;

export const connectionDB = async () => {
  const uri = process.env.DATABASE_URL;

  if (database) {
    return;
  }
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions);

  database = mongoose.connection;

  database.once('open', async () => {
    console.log("Connected to the database successfully! It's time to work!");
  });

  database.on('error', async () => {
    console.log(`Connection error, please verify the credentials`);
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  mongoose.disconnect();
};
