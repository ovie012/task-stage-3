import React, { useState, useRef, useEffect } from 'react';
import { FaSun, FaMoon, FaPaperPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";
import './App.css';

function App() {
    const [lightMode, setLightMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [chosenLanguage, setChosenLanguage] = useState('en');
    const [conversations, setConversations] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [summarizingIndex, setSummarizingIndex] = useState(null);
    const [translatingIndex, setTranslatingIndex] = useState(null);
    const [languageDetector, setLanguageDetector] = useState(null);
    const [translator, setTranslator] = useState(null);
    const [summarizer, setSummarizer] = useState(null);

    const textField = useRef(null);
    const displayRef = useRef(null);

    const languages = [
        { name: 'English', code: 'en' },
        { name: 'Spanish', code: 'es' },
        { name: 'Russian', code: 'ru' },
        { name: 'Portuguese', code: 'pt' },
        { name: 'French', code: 'fr' },
        { name: 'Turkish', code: 'tr' },
    ];

    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollTop = displayRef.current.scrollHeight;
        }
    }, [conversations]);

    useEffect(() => {
        async function initializeAI() {
            try {
                const detector = await self.ai.languageDetector.create();
                setLanguageDetector(detector);

                const translatorInstance = await self.ai.translator.create({
                    targetLanguage: chosenLanguage,
                });
                setTranslator(translatorInstance);

                const summarizerInstance = await self.ai.summarizer.create();
                setSummarizer(summarizerInstance);

            } catch (error) {
                console.error("Error initializing AI:", error);
                setErrorMessage(error.message);
            }
        }

        initializeAI();
    }, [chosenLanguage]);

    const detectLanguage = async (text) => {
        if (!languageDetector) {
            setErrorMessage("Language detector not initialized.");
            return 'unknown';
        }

        try {
            const detectionResults = await languageDetector.detect(text);
            if (detectionResults && detectionResults.length > 0) {
                return detectionResults[0].detectedLanguage;
            } else {
                setErrorMessage("Language detection failed.");
                return 'unknown';
            }
        } catch (error) {
            console.error("Error detecting language:", error);
            setErrorMessage(error.message);
            return 'unknown';
        }
    };

    const summarizeText = async (text) => {
        if (!summarizer) {
            setErrorMessage("Summarizer not initialized.");
            return text;
        }
        try {
            const result = await summarizer.summarize(text);
            return result ? result.summary : text;
        } catch (error) {
            console.error("Error summarizing text:", error);
            setErrorMessage(error.message);
            return text;
        }
    };

    const translateText = async (text, targetLanguage) => {
        if (!translator) {
            setErrorMessage("Translator not initialized.");
            return text;
        }

        try {
            const result = await translator.translate(text);
            return result ? result : text;
        } catch (error) {
            console.error("Error translating text:", error);
            setErrorMessage(error.message);
            return text;
        }
    };

    const handleSend = async () => {
        if (!textField.current || !textField.current.value) return;

        const text = textField.current.value;
        if (!text.trim()) return;

        setIsSending(true);
        textField.current.value = "";

        const initialConversation = {
            text: text,
            languageDetected: "detecting...",
            translation: null,
            translated: false,
            isSummary: false,
            needsSummary: false
        };
        setConversations(prevConversations => [...prevConversations, initialConversation]);

        try {
            const detectedLanguageCode = await detectLanguage(text);
            const detectedLanguage = languages.find(lang => lang.code === detectedLanguageCode)?.name || "Unknown";

            setConversations(prevConversations => {
                const updatedConversations = [...prevConversations];
                updatedConversations[updatedConversations.length - 1] = {
                    ...updatedConversations[updatedConversations.length - 1],
                    languageDetected: detectedLanguage,
                    needsSummary: text.length > 150 && detectedLanguageCode.toLowerCase() === 'en'
                };
                return updatedConversations;
            });


        } finally {
            setIsSending(false);
        }
    };

    const handleSummarizeMessage = async (index) => {
        setSummarizingIndex(index);
        try {
            const conversationsCopy = [...conversations];
            const summary = await summarizeText(conversationsCopy[index].text);
            if (summary) {
                conversationsCopy[index] = { ...conversationsCopy[index], text: summary, isSummary: true, needsSummary: false };
                setConversations(conversationsCopy);
            }
        } finally {
            setSummarizingIndex(null);
        }
    };


    const handleTranslateMessage = async (index) => {
        setTranslatingIndex(index);
        try {
            const conversationsCopy = [...conversations];
            const detectedLanguageCode = await detectLanguage(conversationsCopy[index].text);

            let newTranslator;

            try {
                newTranslator = await self.ai.translator.create({
                    sourceLanguage: detectedLanguageCode,
                    targetLanguage: chosenLanguage,
                });
            } catch (error) {
                console.error("The translation from the detected language to the chosen language is not possible", error);
                setErrorMessage("The translation from the detected language to the chosen language is not possible");
                return;
            }


            setTranslator(newTranslator);
            const translatedText = await newTranslator.translate(conversationsCopy[index].text);

            if (translatedText) {
                conversationsCopy[index] = { ...conversationsCopy[index], translation: translatedText, translated: true };
                setConversations(conversationsCopy);
            }
        } finally {
            setTranslatingIndex(null);
        }
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

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <section className="display" ref={displayRef} style={{ overflowY: 'auto', maxHeight: '400px', scrollBehavior: 'smooth' }}>
                {conversations.map((item, index) => (
                    <div key={index} className="conversation">
                        <h5>{item.text}</h5>
                        <p>Language detected: {item.languageDetected}</p>

                        {item.isSummary ? (
                            <p>Summary</p>
                        ) : (
                            <>
                                {item.translated && <h4>{item.translation}</h4>}

                                {item.needsSummary && (
                                    <button onClick={() => handleSummarizeMessage(index)} disabled={summarizingIndex === index}>
                                        {summarizingIndex === index ? 'Summarizing...' : 'Summarize'}
                                    </button>
                                )}

                                {!item.translated && (
                                    <button onClick={() => handleTranslateMessage(index)} disabled={translatingIndex === index}>
                                        {translatingIndex === index ? 'Translating...' : 'Translate'}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </section>

            <section className="input-section">
                <div className="buttons">
                    <div className="drop-down" onClick={() => setIsOpen(!isOpen)}>
                        <section className={`select ${isOpen ? 'up-up' : ''}`}>
                            {languages.map((lang, index) => (
                                <h6 key={index} onClick={() => { setChosenLanguage(lang.code); setIsOpen(false); }}>
                                    {lang.name}
                                </h6>
                            ))}
                        </section>
                        <section className="chosen">
                            <h6>{languages.find(lang => lang.code === chosenLanguage)?.name || "Select Language"}</h6>
                            {isOpen ? <FaChevronUp className="up-down" /> : <FaChevronDown className="up-down" />}
                        </section>
                    </div>
                </div>
                <div className="form">
                    <textarea ref={textField} placeholder="Oya Oya, Lets hear it..." />
                    <button onClick={handleSend} disabled={isSending}>
                        <FaPaperPlane size={30} className="plane" />
                    </button>
                </div>
            </section>
        </div>
    );
}

export default App;

