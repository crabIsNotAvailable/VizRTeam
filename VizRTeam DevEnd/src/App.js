// Imports
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Modules/HomePage';
import CreationPage from './Modules/creationPage';
import HowToPage from './Modules/HowToPage';

// css
import './App.css';

// Custom fonts
import '@fontsource/overpass';
import '@fontsource/smooch-sans';
import '@fontsource/inter';
import "@fontsource/noto-sans";
import "@fontsource/noto-sans/400-italic.css";

// App function
function App() {
  return (
    <div className="App">
      {/* Router to the different pages */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreationPage />} />
          <Route path="/guide" element={<HowToPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
