import mongoose from "mongoose"
import { Env } from "./app.config.js"

export const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(Env.MONGO_URI)
        console.log(`🟢 Successfully connected to Mongo Database`)

    }catch(error) {
        console.log(`🔴 Erorr connecting to Mongo Database : ${error}`)
        process.exit(1)
    }
}