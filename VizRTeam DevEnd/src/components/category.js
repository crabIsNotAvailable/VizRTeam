// Imports
import React, { useState } from 'react';

// Category selection component
const Category = ({ index, inputMode, setInputMode, handleRemoveQuestion }) => {
  // Field for menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Sets mode for creationPage
  const handleCategoryChange = (mode) => {
    setInputMode(index, mode);
    setMenuOpen(false);
  };

  // functino for question delete
  const handleDeleteQuestion = () => {
    handleRemoveQuestion(index);
    setMenuOpen(false);
  };


  return (
    <div className="relative inline-block text-left">
      {/* Button for burger menu */}
      <button 
        type="button" 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="inline-flex justify-center h-12 w-12 drop-shadow-lg"
      >
        <img src="/assets/images/CategorySelectionButton.png" alt="Menu" />
      </button>
      {/* Shows when menu is opened */}
      {menuOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-VizRtOrange bg-VizRtGray z-50">
          <div className="py-1">
            {/* Changes question type to quiz */}
            <button 
              type="button" 
              onClick={() => handleCategoryChange('standard')} 
              className={`block px-4 py-2 text-sm ${inputMode === 'standard' ? 'bg-gray-100' : ''}`}
              >
              Quiz
            </button>
            <div className="border-t border-black mx-3 drop-shadow-xl"></div>
              {/* Changes question type to poll */}
            <button 
              type="button" 
              onClick={() => handleCategoryChange('poll')} 
              className={`block px-4 py-2 text-sm ${inputMode === 'poll' ? 'bg-gray-100' : ''}`}
              >
              Poll
            </button>
            <div className="border-t border-black mx-3 drop-shadow-xl"></div>
              {/* Changes question type to multilines */}
            <button 
              type="button" 
              onClick={() => handleCategoryChange('multilines')} 
              className={`block px-4 py-2 text-sm ${inputMode === 'multilines' ? 'bg-gray-100' : ''}`}
              >
              Multilines
            </button>
            <div className="border-t border-black mx-3 drop-shadow-xl"></div>
            {/* Deletes selected question */}
            <button 
              type="button" 
              onClick={handleDeleteQuestion} 
              className="block px-4 py-2 text-sm text-red-600"
            >
              Delete Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// export
export default Category;
