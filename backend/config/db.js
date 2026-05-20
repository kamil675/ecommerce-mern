import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected ");
  } catch (error) {
    console.log("DB Connection Error");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDb;
