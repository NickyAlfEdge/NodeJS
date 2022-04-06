import express from "express";
import UsersController from '../controllers/user.controller'

const router = express.Router(); 

router.get('/test', UsersController.getTest);

export default router;