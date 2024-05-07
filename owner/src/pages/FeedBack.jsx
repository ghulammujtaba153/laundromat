import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedBack = () => {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/feedback");
        console.log(response.data);
        setFeedbackList(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="containerr flex-col mx-12 mt-8">
      <h2 className="text-4xl w-full h-24 font-bold mb-4 mt-8 text-center text-primary-darkblue font-railextra">Customer Feedback</h2>
      <div className="grid grid-cols-1 gap-4">
        {feedbackList.map((feedback, index) => (
          <div
            key={feedback._id}
            className="bg-primary-bg rounded-lg shadow-md p-6 border border-gray-300"
            style={{ width: "100%" }}
          >
            <p className="font-bold mb-2 font-railextra">{feedback.name}</p>
            <p className="font-railregular">{feedback.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedBack;
