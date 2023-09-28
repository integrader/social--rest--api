import express from 'express';
import {
    getAllUser,
    signIn,
    signup
} from '../controllers/user-controller.js';




const router = express.Router();
router.get('/', getAllUser)
router.post('/signup', signup)
router.post('/login', signIn)

export default router