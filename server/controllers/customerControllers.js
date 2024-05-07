import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';

export const signup = async (req, res) => {
  const { name, email, password, profilePicture } = req.body;
  console.log(req.body)
  try {
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      profilePicture,
    });

    await newCustomer.save();

    res.status(201).json({ success: true, message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    console.error('Error creating customer:', error.message);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message }); // Return the specific error message
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  try {
    // Check if the customer exists
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return success message with token, email, name, and profilePicture
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: customer._id,
        email: customer.email,
        name: customer.name,
        profilePicture: customer.profilePicture,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
