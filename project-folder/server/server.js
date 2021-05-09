const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./config/db");
//connect to database
connectDB();

app.use(express.json({ extended: true }));
app.use(cors());

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/cart", require("./routes/cart"));
app.use("/products", require("./routes/product"));
app.use("/order", require("./routes/order"));
app.use("/payment", require("./routes/payment"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
