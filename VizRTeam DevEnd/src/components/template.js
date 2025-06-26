// import
import React from 'react';

// Template selection, gets sent up to creationPage
const Template = ({ handleTemplateSelection }) => {
  return (
    <div>
      <h2 className='Template text-7xl text-VizRtOrange tracking-wider m-8 drop-shadow-lg'>TEMPLATES</h2>
      <div className='flex mt-20'>
  <div className='flex flex-col m-4 mt-8'>
    {/* standard quiz selected */}
    <button 
      onClick={() => handleTemplateSelection('standardQuiz')} 
      className="hover:scale-110 hover:drop-shadow-xl"
      >
      <img className="h-60 w-60 drop-shadow-lg" src="/assets/images/TemplateQuizButton.png" alt="Quiz Template" />
      <p className='TemplateSelection m-2'>QUIZ</p>
    </button>
  </div>
  <div className='flex flex-col m-4 mt-8'>
      {/* poll selected */}
    <button 
      onClick={() => handleTemplateSelection('poll')} 
      className="hover:scale-110 hover:drop-shadow-xl"
      >
      <img className="h-60 w-60 drop-shadow-lg" src="/assets/images/TemplatePollButton.png" alt="Poll Template" />
      <p className='TemplateSelection m-2'>POLL</p>
    </button>
  </div>
  <div className='flex flex-col m-4 mt-8'>
      {/* multilines selected */}
    <button 
      onClick={() => handleTemplateSelection('multilines')} 
      className="hover:scale-110 hover:drop-shadow-xl"
      >
      <img className="h-60 w-60 drop-shadow-lg" src="/assets/images/TemplateListButton.png" alt="List Template" /> 
      <p className='TemplateSelection m-2'>LIST</p>
    </button>
  </div>
  <img className='h-80 mx-8' src="/assets/images/OrangeLine.png" alt="Orange Line" />
  <div className='flex flex-col m-4 mt-8'>
    {/* empty selected */}
    <button 
      onClick={() => handleTemplateSelection('fromScratch')} 
      className="hover:scale-110 hover:drop-shadow-xl"
    >
      <img className="h-60 w-60 drop-shadow-lg" src="/assets/images/TemplateCreateNewButton.png" alt="Create Template" />
      <p className='TemplateSelection m-2'>CREATE</p>
    </button>
  </div>
</div>

    </div>
  );
};

export default Template;
