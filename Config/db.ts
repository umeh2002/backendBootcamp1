import mongoose from "mongoose";
import env from "dotenv"
env.config()

const mongoose_string:string =process.env.MONGOOSE_STRING!

const db =()=>{
    mongoose.connect(mongoose_string).then(()=>{
        console.log("db connection established")
    })
}

export default db