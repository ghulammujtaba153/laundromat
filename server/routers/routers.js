import express from 'express';
import { login, signup } from '../controllers/customerControllers.js';
import { addItem, changeItemStatus, deleteMachineById, getAllItems, itemDetails } from '../controllers/itemsController.js';
import { createBooking, getAllBookingsByUserId, updateBookingTimeAndDay } from '../controllers/bookingControllers.js';
import { checkOut } from '../controllers/stripeController.js';
import { createFeedback, getAllFeedback } from '../controllers/feedbackController.js';


const customerRouter = express.Router();


customerRouter.post('/signup', signup);
customerRouter.post('/login', login);
customerRouter.post('/additem', addItem)
customerRouter.get('/getitems', getAllItems)
customerRouter.put('/:id/change-status', changeItemStatus);
customerRouter.get('/item/:id', itemDetails);
customerRouter.post('/booking', createBooking)
customerRouter.put('/update-booking', updateBookingTimeAndDay);
customerRouter.get("/bookings/user/:userId", getAllBookingsByUserId);
customerRouter.post('/create-checkout-session', checkOut)
customerRouter.post('/feedback', createFeedback);
customerRouter.get('/feedback', getAllFeedback);
customerRouter.delete('/item/:id', deleteMachineById);

export default customerRouter;
