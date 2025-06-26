// Imports
import React from 'react';

// Answer component, sends up to creationPage
const Answer = ({ inputMode, pollOptions, setPollOptions, category }) => {
  // Function for add option
  const handleAddOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  // Function for option change
  const handleOptionChange = (index, value) => {
    const newPollOptions = [...pollOptions];
    newPollOptions[index] = value;
    setPollOptions(newPollOptions);
  };

  // Function for option removal
  const handleRemoveOption = (index) => {
    const newPollOptions = pollOptions.filter((_, i) => i !== index);
    setPollOptions(newPollOptions);
  };

  // Function for multilines change, sends one input per "Enter"
  const handleMultiLineChange = (e) => {
    const options = e.target.value.split('\n').map(opt => opt.trim()).filter(opt => opt !== '');
    setPollOptions(options);
  };

  // Handles Enter keypress on multilines
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <>
    {/* If input mode is separate */}
      {inputMode === 'separate' ? (
        <>
          <div className="grid grid-cols-2 gap-x-60 gap-y-12">
            {pollOptions.map((option, index) => (
              <div className='flex'>
                <div className="flex flex-col" key={index}>
                  <div className='flex'>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="p-2 border text-white border-VizRtOrange border-1 bg-VizRtGray drop-shadow-lg"
                    />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveOption(index)} 
                    >
                      <img className='h-8 w-8 m-2 drop-shadow-lg'  src="/assets/images/RemoveOptionButton.png" alt="Remove Option"></img>
                    </button>
                  </div>
                  <div className='w-max'>
                  {category === 'poll' ? (
                    <span>Option {String.fromCharCode(65 + index)}</span>
                  ) : (
                    <span>{index === 0 ? 'Answer' : `Option ${String.fromCharCode(65 + index)}`}</span>
                  )}
                  </div>
                </div>
                

              </div>
            ))}
            {/* Add option button */}
            <div className='flex '>
              <button 
              type="button" 
              onClick={handleAddOption} 
              className="AddOptionButton text-xl p-2 w-60 h-12 bg-VizRtOrange text-VizRtGray border-2 border-VizRtGray drop-shadow-lg rounded-lg"
            >
              Add Option
            </button>
          </div>
        </div>
          
        {/* Text area for multilines */}
        </>
      ) : (
        <textarea
          value={pollOptions.join('\n')}
          onChange={handleMultiLineChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter options, one per line. Press Enter to add a new option."
          rows={pollOptions.length || 3}
          className="w-full p-2 border border-VizRtOrange bg-VizRtGray rounded drop-shadow-lg"
        />
      )}
    </>
  );
};

export default Answer;
