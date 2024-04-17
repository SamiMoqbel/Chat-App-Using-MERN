const express= require("express");
const dotenv  = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const messageRoutes = require("./routes/message.routes");
const usersRoutes = require("./routes/users.routes");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./db/connectToMongoDB");
const { app, server } = require("./socket/socket");
const path = require("path");


const PORT= process.env.PORT || 5000;

// const __dirname = path.resolve();

dotenv.config();


app.use(express.json()); // req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", usersRoutes);

// console.log("dirname", __dirname);
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

server.listen(PORT, () => { 
    connectToMongoDB();
    console.log(`Server Running on PORT ${PORT}`);
}) ;
