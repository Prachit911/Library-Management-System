import express from 'express';
import { borrowBookController } from '../controllers/borrow.controller.js';

const router=express.Router();

router.get('/test',(req,res)=>{
    res.send("This is a test route");
});

router.post('/borrow', borrowBookController);

export default router;