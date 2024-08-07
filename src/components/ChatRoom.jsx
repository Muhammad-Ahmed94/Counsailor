import React, { useState } from "react";
import SignOut from "./SignOut";
import { auth } from "../config/firebaseConfig";
import { sendMessageToGemini } from "../config/geminiConfig";
import { marked } from "marked";

//* Icons
import { RxSpeakerLoud } from "react-icons/rx";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  const handleTextToSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const plainText = response.replace(/[#*]/g, ""); //* Replace markdown for better HTML context and readability.
    const utterance = new SpeechSynthesisUtterance(plainText); //* New Speech Instance.
    const voices = window.speechSynthesis.getVoices(); //* Getting voice styles.

    const femaleVoice = voices.find(
      (voice) => voice.name.includes("female") || voice.name.includes("Woman")
    ); //* Female Voice.

    if (femaleVoice) {
      utterance.voice = femaleVoice; //* Setting the default speaking style.
    } else {
      console.log("female voice not found. using default vocie");
    }

    utterance.rate = 1;
    utterance.pitch = 1;

    setSpeaking(true);
    window.speechSynthesis.speak(utterance); //* Starts actual speaking.

    utterance.onend = () => {
      //* Stop speaking when the text ends.
      setSpeaking(false);
    };
  };

  const renderMarkdown = (markdown) => {
    //* marked lib converts Markdown text to HTML. **abc** to <bold>abc</bold>
    const html = marked(markdown);
    return {
      __html: html,
    }; /* *Returns object with a property __html containing HTML string.
                                dangerouslySetInnerHTML is used to set HTML directoly from the string.
                                This propertry ensures the content that is insserted is sanitized and safe
                                as it could lead to XSS attacks by directoly implementing string to the DOM. */
  };

  const handleStopSpeaking = () => {
    //* Function to stop speaking.
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const handleSendMessage = async () => {
    try {
      const reply = await sendMessageToGemini(message);
      setResponse(reply);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  if (auth.currentUser) {
    console.log(`${auth.currentUser.email} \n ${auth.currentUser.displayName}`);
  }
  return (
    <div className="min-h-screen bg-slate-500 flex flex-col justify-between">
      <div className="min-h-20 w-full">
        <nav className=" bg-stone-500 p-4 flex justify-between items-center text-2xl font-bold gap-3">
          <div className="flex gap-2 items-center">
            <img
              className="h-20 w-20 rounded-full p-2"
              src={auth.currentUser.photoURL}
              alt="user-image"
            />
            <header>Welcome, {auth.currentUser.displayName}</header>
          </div>
          <SignOut />
        </nav>
      </div>

      <main className="h-[25rem] w-1/2 mx-auto">
        {response && (
          <div className="bg-white p-4 rounded shadow-md relative overflow-y-auto">
            <div>
              <div dangerouslySetInnerHTML={renderMarkdown(response)}></div>
              {/* <p>{response}</p> */}
            </div>
            <button onClick={handleTextToSpeech} className="absolute right-0">
              <RxSpeakerLoud className="text-right h-10 w-10 font-bold text-2xl bg-stone-500 text-white p-3 rounded" />
            </button>
            <button className="text-2xl" onClickCapture={handleStopSpeaking}>
              🔇
            </button>
          </div>
        )}
      </main>
      <div className="flex justify-center">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="bottom-0 w-1/2 mx-auto p-2 focus-within:outline-none rounded"
          type="text"
          placeholder="tell me something..."
        />
        <button onClick={handleSendMessage}>send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
