import Feedback from "../models/feedBackSchema.js";


export async function createFeedback(req, res) {
  try {
    const { name, message } = req.body;
    const feedback = new Feedback({ name, message });
    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback saved successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ success: false, error: 'Failed to save feedback' });
  }
}

export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    console.log(feedback)
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};
