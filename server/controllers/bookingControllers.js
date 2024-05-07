import Customer from "../models/Customer.js";
import Booking from "../models/bookingSchema.js";

// Controller function to create a new booking
export async function createBooking(req, res) {
  try {
    const { userId, itemName, picture,category, price, status, selectedDate, selectedTime, cycles } = req.body;

    // Check if user exists
    const user = await Customer.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newBooking = new Booking({
      userId,
      itemName,
      picture,
      category,
      price,
      status,
      selectedDate,
      selectedTime,
      cycles,
    });

    await newBooking.save();

    res.status(201).json({ success: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllBookingsByUserId (req, res) {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.find({ userId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateBookingTimeAndDay = async (req, res) => {
  try {
      const { _id, newTime, newDate } = req.body;
      
      const updatedBooking = await Booking.findByIdAndUpdate(
          _id,
          { selectedTime: newTime, selectedDate: newDate },
          { new: true }
      );

      if (updatedBooking) {
          return res.status(200).json(updatedBooking);
      } else {
          return res.status(404).json({ error: 'Booking not found' });
      }
  } catch (error) {
      console.error('Error updating booking:', error);
      return res.status(500).json({ error: 'Failed to update booking' });
  }
};
