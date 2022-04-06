import express from "express";
import UsersController from '../controllers/user.controller'

const router = express.Router(); 

router.get('/me', UsersController.getUser);

export default router;