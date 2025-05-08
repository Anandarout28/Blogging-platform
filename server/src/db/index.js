import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Use only MONGODB_URI since it already includes the database name
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB
