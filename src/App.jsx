// import { useState, useRef } from 'react'
// import { FaSun, FaMoon, FaPaperPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import './App.css'

// function App() {
//   const [lightMode, setLightMode] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [translated, setTranslated] = useState(false);
//   const [summarize, setSummarize] = useState(false)
//   const [loading, setLoading] = useState(false);
//   const [chosenLanguage, setChosenLanguage] = useState('English')
//   const [conversations, setConversations] = useState([
//     {
//       text : 'My name is Emonefe Ovie Ezekiel, body done dey pepper me, Helpppppp!!!',
//       languageDetected : 'english',
//       translation : 'edkmedikem enfldekde djfnifemifmeidmeide dfejee',
//     },
//     {
//       text : 'Understanding is paramount, i am stressed, need Helpppppp!!!!!',
//       languageDetected : 'spanish',
//       translation : 'edkmedikem enfldekde djfnifemifmeidmeide dfejee',
//     },
//     {
//       text : 'I wonder when all these will go away, honestly',
//       languageDetected : 'french',
//       translation : 'edkm edikem enfldekde djfnifemifmeidmeide dfejee enfldekde sgwudhduj  ejejeje ejejedjd djeje',
//     },
//   ])

//   const textField = useRef();

//   const languages = [ 'english', 'spanish', 'russian', 'japanese', 'Portuguese' ]

//   const addNewConversation = (newLanguageDetected, newTranslation) => {
//     const newConversation = {
//       text : textField.current.value,
//       languageDetected : newLanguageDetected,
//       translation : newTranslation,
//     }

//     setConversations([ ...conversations, newConversation ])
//   }

//   return (
//     <>
//       <div className={`container ${lightMode ? 'light-mode' : ''}`}>
//         <section className="header">
//           <h1>AI-Powered Text Processing Interface</h1>
//           {!lightMode ? 
//               <FaMoon className='light-dark-mode' onClick={() => {setLightMode(!lightMode)}} />
//           :
//               <FaSun className='light-dark-mode' onClick={() => {setLightMode(!lightMode)}} />
//           }
//         </section>
//         <section className="display">
//           {conversations.map((item, index) => (
//             <div key={index} className="conversation">
//               <h5>{item.text}</h5>
//               <p>language detected :: {item.languageDetected}</p>
//               {translated ? 
//                 <h4>{item.translation}</h4>
//               : 
//                 <button className={loading ? 'loading' : ''}>{loading ? 'translating . . .' : 'translate'}</button>
//               }
//             </div>
//           ))}
//         </section>
//         <section className="input-section">
//           <div className="buttons">
//             <div className="drop-down" onClick={() => setIsOpen(!isOpen)} >
//               <section className={`select ${isOpen ? 'up-up' : ''}`}>
//                 {languages.map((item, index) => (
//                   <h6 onClick={() => {setChosenLanguage(item)}} key={index}>{item}</h6>
//                 ))}
//               </section>
//               <section className='chosen'>
//                 <h6>{chosenLanguage}</h6>
//                 {isOpen ? <FaChevronUp className='up-down' /> : <FaChevronDown className='up-down'  />}
//               </section>
//             </div>
//           </div>
//           <div className='form' action="POST">
//             <textarea ref={textField} placeholder='Oya Oya, Lets hear it...' type="text" />
//             <button onClick={() => {addNewConversation()}}>
//               <FaPaperPlane size={30}  className='plane' />
//             </button>
//           </div>
//         </section>
//       </div>
//     </>
//   )
// }

// export default App


// import { useState, useRef } from 'react';
// import { FaSun, FaMoon, FaPaperPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import './App.css';

// // Although Chrome’s built‑in AI APIs typically do not require API keys,
// // we keep these in our .env file if you plan to integrate with a third‑party service.
// const summarizerApiKey = import.meta.env.VITE_SUMMARIZER_API_KEY;
// const translatorApiKey = import.meta.env.VITE_TRANSLATOR_API_KEY;
// const languageDetectionApiKey = import.meta.env.VITE_LANGUAGE_DETECTION_API_KEY;

// function App() {
//   const [lightMode, setLightMode] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [chosenLanguage, setChosenLanguage] = useState('english');
//   const textField = useRef();

//   // Updated languages array
//   const languages = ['english', 'spanish', 'russian', 'japanese', 'Portuguese'];

//   // Conversations state
//   const [conversations, setConversations] = useState([
//     {
//       text: 'My name is Emonefe Ovie Ezekiel, body done dey pepper me, Helpppppp!!!',
//       languageDetected: 'english',
//       translation: 'edkmedikem enfldekde djfnifemifmeidmeide dfejee',
//       translated: true,
//     },
//     {
//       text: 'Understanding is paramount, i am stressed, need Helpppppp!!!!!',
//       languageDetected: 'spanish',
//       translation: 'edkmedikem enfldekde djfnifemifmeidmeide dfejee',
//       translated: true,
//     },
//     {
//       text: 'I wonder when all these will go away, honestly',
//       languageDetected: 'french',
//       translation: 'edkm edikem enfldekde djfnifemifmeidmeide dfejee enfldekde sgwudhduj ejejeje ejejedjd djeje',
//       translated: true,
//     },
//   ]);

//   // Helper function to add a new conversation message
//   const addNewConversation = (newText, newLanguageDetected, newTranslation, isTranslated = false) => {
//     const newConversation = {
//       text: newText,
//       languageDetected: newLanguageDetected,
//       translation: newTranslation,
//       translated: isTranslated,
//     };
//     setConversations([...conversations, newConversation]);
//   };

//   // API function: Detect language using Chrome’s native AI API
//   const detectLanguage = async (text) => {
//     try {
//       // The API call may vary—check the latest documentation.
//       const result = await chrome.ai.languageDetection.detect({ text });
//       // Assume the returned object has a property called "language"
//       return result.language || 'unknown';
//     } catch (error) {
//       console.error("Language detection error:", error);
//       return 'unknown';
//     }
//   };

//   // API function: Summarize text using Chrome’s native AI Summarizer API
//   const summarizeText = async (text) => {
//     try {
//       const result = await chrome.ai.summarizer.summarize({ text });
//       // Assume the returned object has a "summary" property
//       return result.summary;
//     } catch (error) {
//       console.error("Summarization error:", error);
//       return text; // Fallback to original text if an error occurs
//     }
//   };

//   // API function: Translate text using Chrome’s native AI Translator API
//   const translateText = async (text, targetLanguage) => {
//     try {
//       const result = await chrome.ai.translator.translate({ text, targetLanguage });
//       // Assume the returned object has a "translation" property
//       return result.translation;
//     } catch (error) {
//       console.error("Translation error:", error);
//       return text;
//     }
//   };

//   // Handle sending a new message
//   const handleSend = async () => {
//     const text = textField.current.value;
//     if (!text) return;
//     setLoading(true);

//     // Detect the language of the input text
//     const languageDetected = await detectLanguage(text);
//     let resultText = text;

//     // If the text is in English and longer than 150 characters, summarize it
//     if (text.length > 150 && languageDetected.toLowerCase() === 'english') {
//       resultText = await summarizeText(text);
//     }
    
//     // Add new message as untranslated by default
//     addNewConversation(text, languageDetected, resultText, false);
//     setLoading(false);
//     textField.current.value = "";
//   };

//   // Handle translating a specific conversation message
//   const handleTranslateMessage = async (index) => {
//     setLoading(true);
//     const conversationToTranslate = conversations[index];
//     // Translate the conversation text using the chosen language
//     const newTranslation = await translateText(conversationToTranslate.text, chosenLanguage);
//     // Update only the selected conversation
//     const updatedConversation = {
//       ...conversationToTranslate,
//       translation: newTranslation,
//       translated: true,
//     };
//     const updatedConversations = conversations.map((conv, i) =>
//       i === index ? updatedConversation : conv
//     );
//     setConversations(updatedConversations);
//     setLoading(false);
//   };

//   return (
//     <div className={`container ${lightMode ? 'light-mode' : ''}`}>
//       <section className="header">
//         <h1>AI-Powered Text Processing Interface</h1>
//         {!lightMode ? 
//           <FaMoon className='light-dark-mode' onClick={() => setLightMode(!lightMode)} />
//         :
//           <FaSun className='light-dark-mode' onClick={() => setLightMode(!lightMode)} />
//         }
//       </section>
//       <section className="display">
//         {conversations.map((item, index) => (
//           <div key={index} className="conversation">
//             <h5>{item.text}</h5>
//             <p>Language detected: {item.languageDetected}</p>
//             {item.translated ? (
//               <h4>{item.translation}</h4>
//             ) : (
//               <button 
//                 className={loading ? 'loading' : ''}
//                 onClick={() => handleTranslateMessage(index)}
//               >
//                 {loading ? 'processing . . .' : 'translate'}
//               </button>
//             )}
//           </div>
//         ))}
//       </section>
//       <section className="input-section">
//         <div className="buttons">
//           <div className="drop-down" onClick={() => setIsOpen(!isOpen)}>
//             <section className={`select ${isOpen ? 'up-up' : ''}`}>
//               {languages.map((item, index) => (
//                 <h6 key={index} onClick={() => setChosenLanguage(item)}>
//                   {item}
//                 </h6>
//               ))}
//             </section>
//             <section className='chosen'>
//               <h6>{chosenLanguage}</h6>
//               {isOpen ? <FaChevronUp className='up-down' /> : <FaChevronDown className='up-down' />}
//             </section>
//           </div>
//         </div>
//         <div className='form'>
//           <textarea ref={textField} placeholder='Oya Oya, Lets hear it...' />
//           <button onClick={handleSend}>
//             <FaPaperPlane size={30} className='plane' />
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default App;


import { useState, useRef, useEffect } from 'react';
import { FaSun, FaMoon, FaPaperPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";
import './App.css';

function App() {
  const summarizerApiKey = import.meta.env.VITE_SUMMARIZER_API_KEY;
  const translatorApiKey = import.meta.env.VITE_TRANSLATOR_API_KEY;
  const languageDetectionApiKey = import.meta.env.VITE_LANGUAGE_DETECTION_API_KEY;

  const [lightMode, setLightMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chosenLanguage, setChosenLanguage] = useState('english');
  const [conversations, setConversations] = useState([
    {
      text: 'My name is Emonefe Ovie Ezekiel, body done dey pepper me, Helpppppp!!!',
      languageDetected: 'english',
      translation: 'edkmedikem enfldekde djfnifemifmeidmeide dfejee',
      translated: true,
    },
    {
      text: 'Understanding is paramount, i am stressed, need Helpppppp!!!!!',
      languageDetected: 'spanish',
      translation: 'edkmedikem enfldekde djfnifemifmeidmeide dfejee',
      translated: true,
    },
  ]);

  const textField = useRef();
  const displayRef = useRef(null);

  const languages = ['english', 'spanish', 'russian', 'japanese', 'Portuguese'];

  const addNewConversation = (newLanguageDetected, newTranslation) => {
    const newConversation = {
      text: textField.current.value,
      languageDetected: newLanguageDetected,
      translation: newTranslation,
      translated: false,
    };
    setConversations([...conversations, newConversation]);
  };

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollTop = displayRef.current.scrollHeight;
    }
  }, [conversations]);

  const detectLanguage = async (text) => {
    try {
      const result = await chrome.ai.languageDetection.detect({
        text,
        apiKey: languageDetectionApiKey
      });
      console.log("Language detection result:", result);
      return result.language || 'unknown';
    } catch (error) {
      console.error("Language detection error:", error);
      return 'unknown';
    }
  };

  const summarizeText = async (text) => {
    try {
      const result = await chrome.ai.summarizer.summarize({
        text,
        apiKey: summarizerApiKey
      });
      console.log("Summarization result:", result);
      return result.summary;
    } catch (error) {
      console.error("Summarization error:", error);
      return text;
    }
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const result = await chrome.ai.translator.translate({
        text,
        targetLanguage,
        apiKey: translatorApiKey
      });
      console.log("Translation result:", result);
      return result.translation;
    } catch (error) {
      console.error("Translation error:", error);
      return text;
    }
  };

  const handleSend = async () => {
    const text = textField.current.value;
    if (!text) return;
    setLoading(true);

    const detectedLanguage = await detectLanguage(text);
    let processedText = text;

    if (text.length > 150 && detectedLanguage.toLowerCase() === 'english') {
      processedText = await summarizeText(text);
    }
    
    addNewConversation(detectedLanguage, processedText);
    setLoading(false);
    textField.current.value = "";
  };

  const handleTranslateMessage = async (index) => {
    setLoading(true);
    const conversationToTranslate = conversations[index];
    const newTranslation = await translateText(conversationToTranslate.text, chosenLanguage);
    const updatedConversation = {
      ...conversationToTranslate,
      translation: newTranslation,
      translated: true,
    };
    const updatedConversations = conversations.map((conv, i) =>
      i === index ? updatedConversation : conv
    );
    setConversations(updatedConversations);
    setLoading(false);
  };

  return (
    <div className={`container ${lightMode ? 'light-mode' : ''}`}>
      <section className="header">
        <h1>AI-Powered Text Processing Interface</h1>
        {!lightMode ? (
          <FaMoon className="light-dark-mode" onClick={() => setLightMode(!lightMode)} />
        ) : (
          <FaSun className="light-dark-mode" onClick={() => setLightMode(!lightMode)} />
        )}
      </section>
      <section className="display" ref={displayRef} style={{ overflowY: 'auto', maxHeight: '400px', scrollBehavior: 'smooth' }}>
        {conversations.map((item, index) => (
          <div key={index} className="conversation">
            <h5>{item.text}</h5>
            <p>Language detected: {item.languageDetected}</p>
            {item.translated ? (
              <h4>{item.translation}</h4>
            ) : (
              <button className={loading ? 'loading' : ''} onClick={() => handleTranslateMessage(index)}>
                {loading ? 'translating . . .' : 'translate'}
              </button>
            )}
          </div>
        ))}
      </section>
      <section className="input-section">
        <div className="buttons">
          <div className="drop-down" onClick={() => setIsOpen(!isOpen)}>
            <section className={`select ${isOpen ? 'up-up' : ''}`}>
              {languages.map((item, index) => (
                <h6 key={index} onClick={() => setChosenLanguage(item)}>
                  {item}
                </h6>
              ))}
            </section>
            <section className="chosen">
              <h6>{chosenLanguage}</h6>
              {isOpen ? <FaChevronUp className="up-down" /> : <FaChevronDown className="up-down" />}
            </section>
          </div>
        </div>
        <div className="form">
          <textarea ref={textField} placeholder="Oya Oya, Lets hear it..." />
          <button onClick={handleSend}>
            <FaPaperPlane size={30} className="plane" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
