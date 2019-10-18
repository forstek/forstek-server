const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

// Import Routes
const authRoute = require("./routes/AuthRoute")
const customerRoute = require("./routes/CustomerRoute")

dotenv.config()

// DB Connection
mongoose.connect( process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log("connected to db")
)

// Middleware
app.use(express.json())
app.use(cors({origin: true}))

// Route Middleware
app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);

app.listen(1111, () => console.log("server up and running"))