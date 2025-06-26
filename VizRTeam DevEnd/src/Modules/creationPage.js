//imports
import React, { useState } from 'react';
import { db } from '../Firebase/firebaseConfig';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import Category from '../components/category';
import Question from '../components/question';
import Answer from '../components/answer';
import Template from '../components/template';
import SubmissionMessage from '../components/submissionMessage';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';


const CreationPage = () => {

  //Fields
    const [templateSelected, setTemplateSelected] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState(null);
    const [gameTitle, setGameTitle] = useState('');
    const [questions, setQuestions] = useState([{ question: '', options: [''], category: 'standard' }]);
    const [inputModes, setInputModes] = useState(['separate']);
    
    // Handles Template selection logic
    const handleTemplateSelection = (template) => {
      // When a template is selected
      setTemplateSelected(true);
      // Standard quiz is selected
      if (template === 'standardQuiz') {
          setQuestions([{ question: '', options: ['', '', '', ''], category: 'standard' }]);
          setInputModes(['separate']);
      }
      // Multilines is selected 
      else if (template === 'multilines') {
          setQuestions([{ question: '', options: [''], category: 'multilines' }]);
          setInputModes(['single']);
      }
      // Poll is selected
      else if (template === 'poll') {
          setQuestions([{ question: '', options: ['', ''], category: 'poll' }]);
          setInputModes(['separate']);
      }
  };

    // Add question function
    const handleAddQuestion = () => {
        // Adds a new question to the components
        setQuestions([...questions, { question: '', options: [''], category: 'standard' }]);
        // Makes the input mode separate
        setInputModes([...inputModes, 'separate']);
    };

    // Remove question function
    const handleRemoveQuestion = (index) => {
        // Finds the questions and options in the function
        const newQuestions = [...questions];
        const newInputModes = [...inputModes];
        // removes the data selected
        newQuestions.splice(index, 1);
        newInputModes.splice(index, 1);
        // Sets the questions/options to the new values
        setQuestions(newQuestions);
        setInputModes(newInputModes);
    };

    // Handles category selection
    const handleCategoryChange = (index, category) => {
        // Finds the question selected
        const newQuestions = [...questions];
        // Finds the category field for the question selected
        newQuestions[index].category = category;

        // changes the option fields
        newQuestions[index].options = category === 'multilines' ? [''] : category === 'poll' ? ['', ''] : ['', '', '', ''];
        setQuestions(newQuestions);

        // logic for wether it's multilines or separate
        const newInputModes = [...inputModes];
        newInputModes[index] = category === 'multilines' ? 'single' : 'separate';
        setInputModes(newInputModes);
    };

    // Logic for game submission
    const handleSubmit = async (e) => {
        // wrong submission handling
        e.preventDefault();

        // Creates a unique ID for quizID
        var quizID = uuidv4();
        // sanitizes the uploaded name to not have special characters
        var quizTitleSanitized = gameTitle.replace(/[^a-zA-Z0-9]/g, '_'); // Replace special characters with underscores

        try {
            // Create the quiz metadata document in the Quizzes collection
            await setDoc(doc(db, 'Quiz', quizID), {
                quizID: quizID,
                title: gameTitle,
            });

            // Add questions to the subcollection named after the sanitized quiz title
            await Promise.all(questions.map(async (q) => {
                await addDoc(collection(db, `Quiz/${quizID}/${quizTitleSanitized}`), {
                    question: q.question,
                    category: q.category,
                    options: q.options,
                });
            }));

            // field for pin
            var pin = "";
            // charset for pin to make sure it has capital letters and numbers
            var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            // For loop to create a 4 digit pin
            for (var i = 0; i < 4; i++)
                pin += charset.charAt(Math.floor(Math.random() * charset.length));

            // Add the game instance document in the GameInstance collection
            await addDoc(collection(db, 'GameInstance'), {
                pin: pin,
                quizID: quizID,
            });

            // sends logic to submission message
            setSubmissionMessage({ gameTitle, pin });

            // Reset form inputs
            setGameTitle('');
            setQuestions([{ question: '', options: [''], category: 'standard' }]);
            setInputModes(['separate']);
        } catch (error) {
            console.error("Error adding documents: ", error);
        }
    };

    return (
      <div>
        <div className='flex justify-center'>
          {/* Link to home page */}
          <Link to="/">
           <img className='w-80 drop-shadow-lg' src="/assets/images/VizRTeamLogo.png" alt="VizRTeam and VizRt logo"></img>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mt-8 text-white">
          {/* Template selection, changes when setTemplateSelected is true */}
          {!templateSelected ? (
            <div>
              <Template handleTemplateSelection={handleTemplateSelection} />
            </div>
          ) : (
            <div className="relative" style={{ width: 'calc(44%)' }} >
              <button onClick={() => setTemplateSelected(false)} className="absolute top-0 left-0">
                <img className='w-24 drop-shadow-lg' src="/assets/images/BackButton.png" alt="Back to Templates"></img>
              </button>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Game Title"
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                  required
                  className="p-2 border text-white border-VizRtOrange border-2 bg-VizRtGray drop-shadow-lg"
                />
                {/* Question map, loads question components */}
                {questions.map((q, index) => (
                  <div  key={index}>
                    <div  className="flex justify-center items-center w-full relative">
                      <div className="flex-1 flex justify-center">
                        <Question
                          question={q.question}
                          setQuestion={(value) => {
                            const newQuestions = [...questions];
                            newQuestions[index].question = value;
                            setQuestions(newQuestions);
                          }}
                        />
                      </div>
                      {/* Category component */}
                      <div className="absolute right-0 mr-44">
                        <Category
                          index={index}
                          inputMode={inputModes[index]}
                          setInputMode={handleCategoryChange}
                          handleRemoveQuestion={handleRemoveQuestion}
                        />
                      </div>
                    </div>
                    {/* Answer component */}
                    <Answer
                      inputMode={inputModes[index]}
                      pollOptions={q.options}
                      setPollOptions={(options) => {
                        const newQuestions = [...questions];
                        newQuestions[index].options = options;
                        setQuestions(newQuestions);
                      }}
                    />
                  </div>
                ))}
                {/* Add question button */}
                <div>
                <button type="button" onClick={handleAddQuestion}>
                 <img className='w-60 m-16 drop-shadow-lg' src="/assets/images/AddQuestionButton.png" alt="Add question button" />
               </button>
               </div>
               {/* Submission button */}
               <div>
                <button type="submit"><img className='w-40' src="/assets/images/DoneButton.png" alt="Finish button"></img></button>
                </div>
              </form>
            </div>
          )}
          {/* Submission message component */}
          <div className='border-1 border-VizRtOrange rounded'>
            {submissionMessage && (
              <SubmissionMessage
              gameTitle={submissionMessage.gameTitle}
              pin={submissionMessage.pin}
              onClose={() => {
                setSubmissionMessage(null);
                setTemplateSelected(false);
              }}
              />
            )}
          </div>
        </div>
      </div>
    );
};

// Export
export default CreationPage;
