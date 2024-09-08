import mongoose, { connection } from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        })

        connection.on("error", (error) => {
            console.log("MongoDB connection error, Please make sure mongoDb is running. ", error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong, Please Try again later ");
        console.log(error);
    }
}