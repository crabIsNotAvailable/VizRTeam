// Imports
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './Images/vizrtlogo.png';
import gameLogo from './Images/gamelogo.png';
import { db } from './firebase/firebaseConfig';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import "./QuizPage.css";

const QuizPage = () => {
  // State variables
  const [filteredDataQuiz, setFilteredDataQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState('');
  const [pin, setPin] = useState(['', '', '', '']);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const navigate = useNavigate();
  const pinRefs = useRef([]);

  // Firestore collection references
  const gameCollectionRef = collection(db, "GameInstance");
  const quizCollectionRef = collection(db, "Quiz");

  // Function to fetch quiz items based on PIN
  const getQuizItems = async () => {
    const pinEnter = pin.join('');
    console.log("Entered PIN:", pinEnter);
    try {
      const data = await getDocs(quizCollectionRef); // Fetch quiz collection
      const data2 = await getDocs(gameCollectionRef); // Fetch game instance collection

      const filteredDataPin = data2.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let quizPinActual = "";

      // Find matching quiz ID for entered PIN
      filteredDataPin.forEach((item) => {
        if (item.pin === pinEnter) {
          quizPinActual = item.quizID;
        }
      });

      if (!quizPinActual) {
        console.log("No matching quiz pin found.");
        setPinError(true);
        return;
      }

      const filteredDataGame = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      let quizIDGathered = "";
      filteredDataGame.forEach((item) => {
        if (item.quizID && item.quizID === quizPinActual) {
          quizIDGathered = item.quizID;
        }
      });

      const formatSubcollectionName = (subcollectionName) => {
        return subcollectionName.replace(/[^A-Za-z0-9]+/g, '_');
      };

      // Function to fetch the quiz data
      const getQuizActual = async () => {
        try {
          const quizDocRef = doc(db, "Quiz", quizIDGathered);
          const quizDoc = await getDoc(quizDocRef);

          if (quizDoc.exists()) {
            let subcollectionName = quizDoc.data().title;

            if (subcollectionName) {
              subcollectionName = formatSubcollectionName(subcollectionName);

              const subcollectionRef = collection(quizDocRef, subcollectionName);
              const subcollectionSnapshot = await getDocs(subcollectionRef);

              const filteredDataQuiz = subcollectionSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }));

              setFilteredDataQuiz(filteredDataQuiz);
              setCurrentQuestionIndex(0);
              setIsQuizActive(true);
              setPinError(false);
            } else {
              console.log("No subcollection name found in quiz document.");
            }
          } else {
            console.log("No such document!");
          }
        } catch (err) {
          console.error("Error accessing subcollection:", err);
        }
      };

      await getQuizActual();
    } catch (err) {
      console.error("Error fetching quiz items:", err);
    }
  };

  // Handle change in PIN input
  const handleChange = (e, index) => {
    const newPin = [...pin];
    newPin[index] = e.target.value;
    setPin(newPin);
    setPinError(false);

    if (e.target.value !== '' && index < pinRefs.current.length - 1) {
      pinRefs.current[index + 1].focus();
    }
  };

  // Handle PIN submit
  const handlePinSubmit = async (e) => {
    e.preventDefault();
    try {
      await getQuizItems();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle option click
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowAnswer(true);

    // Check if the selected option is correct
    if (option === correctOption) {
      setCorrectAnswers((prevCount) => prevCount += 1);
    } else {
      setWrongAnswers((prevCount) => prevCount += 1);
    }

    setTimeout(() => {
      setSelectedOption('');
      setShowAnswer(false);
      // Move to the next question after 2 seconds
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 2000);
  };

  // Shuffle options and set the correct option for the current question
  useEffect(() => {
    if (currentQuestionIndex !== null && currentQuestionIndex < filteredDataQuiz.length) {
      const currentQuestion = filteredDataQuiz[currentQuestionIndex];
      const correctOption = currentQuestion.options[0];
      const shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);
      console.log("Current Question:", currentQuestion);
      setCorrectOption(correctOption);
      setShuffledOptions(shuffledOptions);
    }
  }, [currentQuestionIndex, filteredDataQuiz]);

  const currentQuestion = currentQuestionIndex !== null && currentQuestionIndex < filteredDataQuiz.length ? filteredDataQuiz[currentQuestionIndex] : null;

  return (
    <div className="quiz-container flex flex-col justify-start items-center mt-10">
      {!isQuizActive ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center mb-5 mt-2">
            <img src={logo} alt="Logo" className="h-16 md:h-24" />
          </div>
          <h2 className="mb-5 text-3xl md:text-5xl text-customOrange">ENTER PIN</h2>
          <div className="flex max-w-xs mb-2">
            {pin.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-16 md:w-20 md:h-24 text-2xl md:text-4xl text-center border-2 border-customOrange bg-customGray text-white focus:outline-none mx-1 px-2"
                ref={(el) => (pinRefs.current[index] = el)}
              />
            ))}
          </div>
          {pinError && (
            <div className="text-red-500 text-sm mb-5">Invalid PIN. Please try again.</div>
          )}
          <button
            onClick={handlePinSubmit}
            className="px-5 py-2 text-xs md:text-xl text-white bg-customOrange rounded-full focus:outline-none drop-shadow-xl"
          >
            JOIN
          </button>
        </div>
      ) : currentQuestion ? (
        <div className="text-center w-64 md:w-96">
          <div className="flex flex-col items-center justify-center mb-5 mt-2">
            <img src={gameLogo} alt="Gamelogo" className="h-12 md:h-20" />
          </div>
          <h2 className="text-2xl md:text-4xl font-thin mb-4">{currentQuestion.question}</h2>
          <div className="options grid grid-cols-1 md:grid-cols-2 gap-2">
            {shuffledOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={showAnswer}
                className={`py-2 md:py-4 px-4 md:px-8 rounded-md border border-customOrange text-white w-full
                ${
                  showAnswer
                    ? option === correctOption
                      ? 'bg-green-500'
                      : option === selectedOption
                      ? 'bg-red-500'
                      : 'bg-customGray'
                    : 'bg-customGray'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center w-64 md:w-96">
          <div className="flex flex-col items-center justify-center mb-5 mt-2">
            <img src={gameLogo} alt="Gamelogo" className="h-12 md:h-20" />
          </div>
          <h2 className="text-2xl md:text-4xl font-thin mb-4">Quiz Completed!</h2>
          <p className="text-xl md:text-2xl mb-2">Correct Answers: {correctAnswers}</p>
          <p className="text-xl md:text-2xl mb-4">Wrong Answers: {wrongAnswers}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
