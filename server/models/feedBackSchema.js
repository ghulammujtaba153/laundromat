import { Schema, model } from 'mongoose';

// Define the schema for feedback
const feedbackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

// Create a model for the feedback schema
const Feedback = model('Feedback', feedbackSchema);

export default Feedback;
