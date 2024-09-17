
// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser")
// require("dotenv").config()
// const router = require("./routes/index");
// const connectDB = require("./config/db");

// const app = express();
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));


// app.use(express.json())
// app.use(cookieParser())
// app.use("/api" , router);

// const PORT = 8080 || process.env.PORT
// connectDB().then(()=>{
//     app.listen(PORT , ()=>{
//         console.log("connect to db")
//         console.log("server is running");
//     })
// })


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const router = require("./routes/index");
const connectDB = require("./config/db");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Use Express's built-in body parser for JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());
app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port", PORT);
    });
});

