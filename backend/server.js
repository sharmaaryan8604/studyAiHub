import "./config/env.js";
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import errorMiddleware from "./middleware/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import aiRoutes from "./routes/ai.routes.js";

connectDb();
const app=express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://study-ai-hub-psi.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth',authRoutes);


app.use("/api/user", userRoutes);

app.use("/api/notes",noteRoutes);
app.use("/api/upload", uploadRoutes);


app.use("/api/ai", aiRoutes);




app.get('/',(req,res)=>{
    res.json({
        success:"true",
        message:"Study Hub backend running",
    });
})
app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
