import React, { useState } from "react";

const App = () => {
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US"; // Set language to English

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Transcript:", transcript);
      setTranscript(transcript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setIsSupported(false);
    };

    recognition.start();
  };

  const stopRecognition = () => {
    window.webkitSpeechRecognition.abort();
    setListening(false);
  };

  return (
    <div>
      {isSupported ? (
        <div>
          <button onClick={startRecognition} disabled={listening}>
            Start Listening
          </button>
          <button onClick={stopRecognition} disabled={!listening}>
            Stop Listening
          </button>
          <div id="result">{transcript}</div>
        </div>
      ) : (
        <div>Speech recognition is not supported in this browser.</div>
      )}
    </div>
  );
};

export default App;
