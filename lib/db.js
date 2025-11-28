import mongoose from "mongoose";

export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return ;

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: 'notesVault'
        });
        console.log('Database connected');
    } catch (err) {
        console.log("DB Error", err)
    }
}