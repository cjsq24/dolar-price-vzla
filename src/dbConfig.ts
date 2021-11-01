import mongoose from 'mongoose';

export default async function dbConfig() {
   try {
      await mongoose.connect(process.env.DB_CONNECTION, {});
      console.log('>>> MongoDB Connected');
   } catch (error) {
      console.log('>>> ERROR with MongDB Connection');
      console.log(error);
   }
}
