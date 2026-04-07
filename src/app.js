import express from 'express';
import dotenv from 'dotenv';
import routes from "./routes/index.js";
dotenv.config();

const app=express();

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Routes
app.use('/api',routes);

app.get("/",(req,res)=>{
    res.send("It is working fine");
});

export default app;