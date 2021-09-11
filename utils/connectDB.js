import mongoose from "mongoose";

const connectDB = () => {
    return new Promise(resolve => {
        if(mongoose.connections[0].readyState){
            resolve("already connected")
        }
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, err => {
            if(err) throw err;
            resolve("connected to mongodb") 
        })
    })
}


export default connectDB;
