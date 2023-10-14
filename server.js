const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectDatabase = require("./config/DBconnect.js");
const userRouter = require("./Routes/userRoute.js");
const paymentRouter = require("./Routes/paymentRoute.js");

// Connection to the Database
connectDatabase();

const app = express();

app.use(cors("*"));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

// ROUTES
app.use("/api", userRouter);

// PAYMENT ROUTES
app.use("/api/payment", paymentRouter);

app.listen(process.env.PORT, async () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});