const express= require("express");
const app = express();
const dotenv  = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const connectToMongoDB = require("./db/connectToMongoDB");

dotenv.config();
const PORT= process.env.PORT || 5000;


app.use(express.json()); // req.body
// app.get("/", (req,res)=> {
//     res.send("HELLO MA MAAATESS");
// });

app.use("/api/auth", authRoutes);

app.listen(PORT, () => { 
    connectToMongoDB();
    console.log(`Server Running on PORT ${PORT}`);
}) ;
