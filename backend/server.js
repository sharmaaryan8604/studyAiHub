import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"
import errorMiddleware from "./middleware/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";
import uploadRoutes from "./routes/upload.routes.js";



dotenv.config();

connectDb();
const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);

app.use(errorMiddleware);
app.use("/api/user", userRoutes);

app.use("/api/notes",noteRoutes);
app.use("/api/upload", uploadRoutes);



app.get('/',(req,res)=>{
    res.json({
        success:"true",
        message:"Study Hub backend running",
    });
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});