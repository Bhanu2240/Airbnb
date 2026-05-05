import express from 'express';
import { createBooking, getUserTrips, getOwnerReservations } from '../controllers/booking.controller.js';
import isAuth from '../middleware/isAuth.js';

const router = express.Router();

router.post('/', isAuth, createBooking);
router.get('/trips', isAuth, getUserTrips);
router.get('/reservations', isAuth, getOwnerReservations);

export default router;
