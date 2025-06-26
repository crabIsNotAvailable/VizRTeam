// Imports
import React from 'react';
import backgroundImage from '../assets/images/HowToGuide.png';
import { Link } from 'react-router-dom';

// Page that shows an image of a How to guide
function HowToPage() {
    return(
        <div 
      className="flex items-center justify-center h-screen text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported background image
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
        {/* Links back to the Home page */}
        <Link to="/">
            <img className='w-24 drop-shadow-lg absolute top-4 left-4' src="/assets/images/BackButton.png" alt="Back to Home Page"></img>
        </Link>
    </div>
    )
}

// export
export default HowToPage;