import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        console.log("MongoDb Connected!");
        return await mongoose.connect(process.env.MONGO_URI as string);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default connectDB