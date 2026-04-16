import express from 'express';
import borrowRoutes from './borrowRoutes.js';

const router=express.Router();

router.get('/test',(req,res)=>{
    res.send("This is a test route");
});

router.use('/', borrowRoutes);

export default router;