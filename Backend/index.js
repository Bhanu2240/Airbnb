import express from 'express';
import dotenv from 'dotenv';
import prisma from './config/prisma.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import listingRouter from './routes/listing.route.js';

dotenv.config();

let port = process.env.PORT || 6000;
let app = express();

// ✅ CORS FIRST
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5175"],
  credentials: true
}));

// ✅ THEN cookie parser
app.use(cookieParser());

// ✅ THEN body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

// Test route
app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      message: "Server + DB working ✅",
      data: users
    });
  } catch (err) {
    res.status(500).json({
      message: "DB Connection Failed ❌",
      error: err.message
    });
  }
});

app.listen(port, () => {
  console.log("Server started on port", port);
});