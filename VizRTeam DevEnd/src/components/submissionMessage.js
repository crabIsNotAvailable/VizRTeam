// Imports
import React, { useRef, useState } from 'react';

const SubmissionMessage = ({ gameTitle, pin, onClose }) => {
    // field for copy paste
    const [copySuccess, setCopySuccess] = useState('');

    // Reads pin
    const textAreaRef = useRef(null);

    // function for copy button
    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand('copy');
        setCopySuccess('Copied!');
    };

    return (
        <div>
            <p>{gameTitle} has been submitted!</p>
            <p>Access the game on "not yet created website"!</p>
            <div className='flex justify-center place-items-center m-1'>
                <p className='text-lg'>PIN: {pin}</p> 
                <button className='mx-4 p-1 border rounded border-VizRtOrange text-lg' onClick={copyToClipboard}>Copy</button> 
                {copySuccess}
            </div>
            <p>You can track the data on "not yet created website2" by using the PIN above</p>
            <button className='m-4 p-1 border rounded border-VizRtOrange text-lg' onClick={onClose}>Create New Game</button>
            <textarea
                ref={textAreaRef}
                style={{ position: 'absolute', left: '-9999px', opacity: '0' }}
                readOnly
                value={pin}
            />
        </div>
    );
};

// export
export default SubmissionMessage;
