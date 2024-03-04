const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit();
    }
}

module.exports = connectDB;