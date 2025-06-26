import logo from './logo.svg';
import './App.css';
import QuizPage from "./QuizPage";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (

  
    <BrowserRouter>
<div className='Main'>

    <div className= "MainMenu">
          
          </div>
         

      <Routes className="routeDesign">
        <Route path="/" element={<QuizPage />} ></Route>        
      </Routes>
      </div>
    </BrowserRouter>
 

  
  );
}

export default App;



