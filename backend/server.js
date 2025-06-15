const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const userRoutes = require("./routes/userRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Auth API running"));

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
