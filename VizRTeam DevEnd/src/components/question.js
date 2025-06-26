// Imports
import React from 'react';

// Component for Question input field
const Question = ({ question, setQuestion }) => {
  return (
    <input
      type="text"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Enter your question"
      className="p-2 m-16 w-80 border text-white border-VizRtOrange border-2 bg-VizRtGray drop-shadow-lg"
    />
  );
};

// export
export default Question;
