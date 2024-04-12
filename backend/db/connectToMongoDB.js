const mongoose = require("mongoose");

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected To DB")
    } catch (error) {
        console.log(`Error Connecting to DB ${error.message}`)
    }
}

module.exports = connectToMongoDB; 