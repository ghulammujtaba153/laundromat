import { config } from 'dotenv';
import stripe from 'stripe';

// Load environment variables from .env file
config();

// Initialize Stripe with the secret key from environment variables
const stripeInstance = new stripe(process.env.STRIPE_SECRET);

export const checkOut = async (req, res) => {
    const product = req.body;
    
    
    const products = [product];
    console.log(products)
    const lineItems = products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data:{
            name:product.itemName,
            images:[product.picture]
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity:product.cycles,
      }));

    try {
        // Create a new Stripe checkout session
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/home',
            cancel_url: 'http://localhost:5173/cancel',
        });

        // res.redirect(303, session.url);
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
};
