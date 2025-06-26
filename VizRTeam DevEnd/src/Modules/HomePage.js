import React from 'react';
import backgroundImage from '../assets/images/background.png'; // Import the background image
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div 
      className="flex items-center justify-center h-screen text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported background image
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute top-4 right-8 m-4">
        <img src="/assets/images/VizRTeamLogo.png" alt="Logo" className="h-16"/>
      </div>
      <div className="absolute top-4 left-8 m-4 text-xl">
        No | En
      </div>
      <div className=" text-center text-lg max-w-lg p-4">
        <div className="absolute left-12 p-4 font-thin text-left bg-black bg-opacity-20 rounded">
          <p>
            Immerse yourself in a revolutionary TV<br/> 
            experience. Imagine a world where your<br/> 
            television not only entertains but connects you<br/> 
            deeply with the program you're watching. Explore <br/> 
            a cutting-edge interface that seamlessly <br/> 
            integrates real-time information, interactive polls, <br/> 
            behind-the-scenes footage, and curated content related to the show.
          </p>
        </div>
        <div className="mt-4 pt-72">
        <Link to="/create">
          <button className="bg-black py-5 px-16 rounded-full text-2xl border border-VizRtOrange  m-4 font-medium italic font-cursive">
            Get Started
          </button>
        </Link>
        <Link to="/guide">
          <a href="#" className="block text-sm font-thin underline">
            How to guide
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
