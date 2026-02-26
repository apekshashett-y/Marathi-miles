import React, { useRef, useState, useEffect, useCallback } from "react";
import "./PastPort.css";

const getMoodIcon = (mood) => {
  const moods = {
    birth: "🕯️",
    conflict: "⚔️",
    resistance: "🔥",
    homecoming: "🏠",
    legacy: "📜",
    mystery: "🔮",
    victory: "🎯",
    tragedy: "💔",
    foundation: "🏛️",
    battle: "🛡️",
    peace: "🕊️",
    renaissance: "🎨"
  };
  return moods[mood] || "📖";
};

// Pick chapter text for the current language from fortData.
// Falls back to English / legacy fields if bilingual text is missing.
const getChapterContent = (chapter, language) => {
  const textBlock =
    chapter.text?.[language] ||
    chapter.text?.en || {
      title: chapter.era,
      preview: chapter.preview,
      fullStory: chapter.fullStory,
      significance: chapter.significance
    };

  return textBlock;
};

const MARATHI_TIMELINE_TRANSLATIONS = {
  "The Ancient Sentinel": {
    preview:
      "राजसत्तांच्या उदयापूर्वीच शिवनेरी हा घाट मार्गांवर लक्ष ठेवणारा मौन पहारेकरी होता…",
    fullStory:
      "राजसत्तांच्या उदयापूर्वीच शिवनेरी हा पश्चिम घाटातील महत्त्वाच्या व्यापारी मार्गांवर लक्ष ठेवणारा मौन पहारेकरी होता. यादवांनी बांधलेल्या या किल्ल्याने जुन्नर प्रदेशातील संपन्नता आणि लष्करी महत्त्व यांचे रक्षण केले. डोंगरकड्यांवर उभा असलेला हा गड केवळ दगड-माती नव्हता, तर परिस्थितीनुसार बदलणाऱ्या सत्तांचे साक्षीदार असलेला जिवंत इतिहास होता.",
    significance:
      "या टप्प्यात किल्ल्याचे धोरणात्मक महत्त्व निर्माण झाले, ज्यामुळे पुढील अनेक शतकांपर्यंत तो सत्ता संघर्षाचा केंद्रबिंदू राहिला."
  },
  "Years of Turmoil": {
    preview:
      "दिल्ली सल्तनतीच्या विस्तारासोबत शिवनेरी पहिल्यांदा मुस्लिम सत्तेखाली गेला…",
    fullStory:
      "दिल्ली सल्तनतीच्या विस्तारासोबत शिवनेरी पहिल्यांदा मुस्लिम सत्तेखाली गेला. अलाउद्दीन खिलजीच्या सरदारांनी किल्ला ताब्यात घेतला आणि स्थानिक राजसत्तेचा शेवट झाला. उत्तर हिंदुस्थानातून आलेल्या सैनिकी संस्कृतीचा आणि दखनी परंपरांचा संगम या किल्ल्याच्या भिंतींनी अनुभवला. हिंदू स्थापत्यकलेवर इस्लामी लष्करी गरजांचे थर चढू लागले आणि शिवनेरीचे व्यक्तिमत्त्व अधिक बहुरंगी होत गेले.",
    significance:
      "या काळात किल्ला बहुसांस्कृतिक लष्करी ठाण्यात रूपांतरित झाला आणि पुढील संघर्षांसाठी पार्श्वभूमी तयार झाली."
  },
  "A Star is Born": {
    preview:
      "फाल्गुन महिन्यातील वादळग्रस्त रात्री शिवनेरीच्या कुशीत एका ताऱ्याचा जन्म झाला…",
    fullStory:
      "फाल्गुन महिन्यातील वादळग्रस्त रात्री, शिवनेरीच्या गर्भात एका ताऱ्याचा जन्म झाला. जिजाबाईंनी एका लेकराला जन्म दिला, ज्याचे नाव ठेवले गेले शिवाजी—जो पुढे स्वराज्याचा स्वप्नवत शिल्पकार ठरणार होता. लोककथांनुसार त्या रात्री किल्ल्याच्या भिंतीही हलल्या, जणू इतिहास स्वतः या जन्माचे स्वागत करत होता. त्या छोट्या खोलीतील पहिल्या रडण्याचा प्रतिध्वनी पुढील शतकभर डोंगर-दऱ्यांमध्ये घुमत राहिला.",
    significance:
      "ही घटना केवळ एका राजाचा नव्हे, तर संपूर्ण मराठा साम्राज्याच्या उदयाची सुरुवात ठरली."
  },
  "The Exile Years": {
    preview:
      "शिवाजी दूरवर नेतृत्व घडवत असताना, शिवनेरी बीजापुरी सत्तेखाली शांतपणे पण तणावात होता…",
    fullStory:
      "शिवाजी महाराजांचा बालपण निघून गेले आणि ते दूरवर स्वराज्याची बीजे रोवत असताना, शिवनेरी बीजापुरी सत्तेखाली शांतपणे पण तणावात राहत होता. आदिलशाही सरदारांनी किल्ल्याची तटबंदी मजबूत केली, त्यांना हे माहीत नव्हते की हाच गड त्यांच्या भावी शत्रूचा जन्मकिल्ला आहे. स्थानिक लोककथांमध्ये ‘इथेच राजा जन्मला’ अशी कुजबुज वाढत गेली आणि त्या कुजबुजीतूनच नव्या प्रतिकाराची प्रेरणा तयार झाली.",
    significance:
      "जन्मकिल्ला शत्रूच्या ताब्यात असल्याची खंतच शिवाजींच्या स्वराज्य स्वप्नाला अधिक धार देणारी ठरली."
  },
  Homecoming: {
    preview:
      "दशकांच्या संघर्षानंतर शिवाजी महाराज पुन्हा स्वतःच्या जन्मभूमीवर परतले…",
    fullStory:
      "दशकांच्या संघर्षानंतर शिवाजी महाराजांनी अखेर शिवनेरीवर भगवा पुन्हा फडकवला. हा केवळ लष्करी विजय नव्हता, तर घरवापसीचा भावनिक क्षण होता. आदिलशाहीची निशाणी असलेले ध्वज उतरले आणि त्यांच्या जागी स्वराज्याचा भगवा टांगला गेला. किल्ल्याच्या तटांवरून आता परत एकदा मराठी जयघोष घुमू लागला, जिथे एकेकाळी परक्या हुकूमांचा आवाज घुमत होता.",
    significance:
      "या विजयाने दख्खनमधील सत्तासंतुलन पालटले आणि मराठी स्वराज्याची मुळे अधिक खोलवर रुजली."
  },
  "The Lion Sleeps": {
    preview:
      "मराठा साम्राज्याच्या पराभवानंतर इंग्रजांच्या तोफांनी शिवनेरीच्या शांततेला भेदले…",
    fullStory:
      "मराठा साम्राज्याच्या पराभवानंतर इंग्रजांच्या आधुनिक तोफांनी शिवनेरीच्या शांततेला चिरले. ज्या भिंतींनी मध्ययुगीन वेढ्यांना तोंड दिले होते त्या तोफांच्या अचूक माऱ्याने विदीर्ण झाल्या. इंग्रजांसाठी हा आणखी एक धोरणात्मक विजय होता, पण मराठी मनांसाठी ती आत्मिक पराजयाची जखम होती. किल्ला आता केवळ सैनिकी ठाणे राहिला, जिथे इतिहासाची खरी जाण कमी आणि नोंदवहीतील नोंदी अधिक होत्या.",
    significance:
      "मराठा सार्वभौमत्वाच्या अंताचा आणि औपनिवेशिक कालखंडाच्या सुरूवातीचा हा निर्णायक टप्पा होता."
  },
  "Living Legacy": {
    preview:
      "आज शिवनेरी हे केवळ अवशेष नाहीत, तर जिवंत वारशाचा तीर्थक्षेत्र आहे…",
    fullStory:
      "आज शिवनेरी केवळ तुटलेल्या भिंतींचा समूह नाही, तर जिवंत वारशाचा तीर्थक्षेत्र आहे. यात्रेकरू, अभ्यासक आणि पर्यटक—सर्वजण येथे इतिहासाशी व्यक्तिगत संवाद साधण्यासाठी येतात. ज्या पायऱ्यांवरून जिजाबाई चालल्या, त्याच पायऱ्यांवरून आजची पिढी स्वराज्याच्या गोष्टी ऐकत चढते. प्रत्येक दगडात एक कथा, प्रत्येक झुळुकीत एका काळाचा सुगंध दडलेला आहे.",
    significance:
      "शिवनेरी आजच्या आणि पुढच्या पिढ्यांना महाराष्ट्राच्या परिवर्तनशील इतिहासाशी जिवंत नातं जोडून ठेवतो."
  }
};

const getLocalizedChapter = (chapter, language) => {
  if (language !== "mr") return chapter;
  const translation = MARATHI_TIMELINE_TRANSLATIONS[chapter.era];
  if (!translation) return chapter;
  return {
    ...chapter,
    preview: translation.preview || chapter.preview,
    fullStory: translation.fullStory || chapter.fullStory,
    significance: translation.significance || chapter.significance
  };
};

const Timeline = ({
  chapters = [],
  expandedChapter,
  onToggleChapter,
  language = "en",
  onLanguageChange
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioChapterIndex, setAudioChapterIndex] = useState(null);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const timelineRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const audioUtteranceRef = useRef(null);
  const localAudioRef = useRef(null);

  // Store scroll position to detect if user is scrolling
  const scrollTimeoutRef = useRef(null);

  // Check if browser supports Web Speech API
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsAudioAvailable(true);
    }
  }, []);

  // Disable automatic IntersectionObserver-based active card detection to ensure
  // the timeline always starts and stays on explicitly selected indices.
  useEffect(() => {
    return () => {
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Handle manual scroll detection
  const handleManualScroll = useCallback(() => {
    setIsScrolling(true);
    clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  }, []);

  // When chapters or language change (e.g. fort switch), reset to first chapter and scroll to start
  useEffect(() => {
    setActiveIndex(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "auto"
      });
    }
  }, [chapters, language]);

  // stop any audio (speech or local) when language toggles, since Marathi recordings should
  // only play while "mr" is active and speech synthesis should be cancelled on change.
  useEffect(() => {
    if (language !== "mr") {
      if (localAudioRef.current) {
        localAudioRef.current.pause();
        localAudioRef.current.currentTime = 0;
      }
      setIsPlayingAudio(false);
      setIsAudioPaused(false);
      setAudioChapterIndex(null);
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      audioUtteranceRef.current = null;
    }
  }, [language]);

  // Also ensure initial mount starts at the first card
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "auto"
      });
    }
  }, []);

  // Handle focus mode
  useEffect(() => {
    if (isFocusMode) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      // Stop any playing audio
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        audioUtteranceRef.current = null;
        setIsPlayingAudio(false);
        setIsAudioPaused(false);
        setAudioChapterIndex(null);
      }

      setActiveIndex(0);

      // Scroll to active card
      setTimeout(() => {
        const firstCard = document.querySelector('[data-index="0"]');
        if (firstCard && scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const cardRect = firstCard.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const scrollLeft = cardRect.left - containerRect.left + container.scrollLeft;
          container.scrollTo({
            left: scrollLeft - (containerRect.width - cardRect.width) / 2,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [isFocusMode]);

  // Handle card click - FIXED: e.stopPropagation()
  const handleCardClick = (index, e) => {
    if (e) {
      e.stopPropagation(); // IMPORTANT: Prevent closing focus mode
    }

    setActiveIndex(index);

    // Scroll to clicked card
    const card = document.querySelector(`[data-index="${index}"]`);
    if (card && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const scrollLeft = cardRect.left - containerRect.left + container.scrollLeft;
      container.scrollTo({
        left: scrollLeft - (containerRect.width - cardRect.width) / 2,
        behavior: 'smooth'
      });
    }
  };

  // Marathi audio filenames in public folder (1‑based order)
  const MARATHI_AUDIO_FILES = [
    "1stcard.mp3",
    "2ndcard.mp3",
    "3rdcard.mp3",
    "4thcard.mp3",
    "5thcard.mp3",
    "6thcard.mp3",
    "7thcard.mp3"
  ];

  // Handle audio narration for both speech synthesis and Marathi recordings
  const handleAudioClick = (chapter, index, e) => {
    if (e) {
      e.stopPropagation(); // Prevent closing focus mode
    }

    // If Marathi language is active, play pre‑recorded audio from public folder
    if (language === "mr") {
      // stop any speech that might be ongoing
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        audioUtteranceRef.current = null;
      }

      const audioEl = localAudioRef.current;
      const fileName = MARATHI_AUDIO_FILES[index];

      // nothing to play for this index?
      if (!fileName || !audioEl) {
        return;
      }

      const src = `/audio/shivneri/${fileName}`;

      // if clicking the same card that's already playing
      if (audioChapterIndex === index) {
        if (isPlayingAudio && !isAudioPaused) {
          audioEl.pause();
          setIsPlayingAudio(false);
          setIsAudioPaused(true);
        } else if (isAudioPaused) {
          audioEl.play();
          setIsPlayingAudio(true);
          setIsAudioPaused(false);
        } else {
          // start fresh
          audioEl.currentTime = 0;
          audioEl.play();
          setIsPlayingAudio(true);
          setIsAudioPaused(false);
          setAudioChapterIndex(index);
        }
        return;
      }

      // switching to a different card: stop previous audio and begin new
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
        audioEl.src = src;
        audioEl.play().catch(() => {
          /* ignore play errors */
        });
      }

      setIsPlayingAudio(true);
      setAudioChapterIndex(index);
      setIsAudioPaused(false);
      return;
    }

    // Not Marathi: fall back to the original speech-synthesis logic
    // also ensure any local audio is halted
    if (localAudioRef.current) {
      localAudioRef.current.pause();
      localAudioRef.current.currentTime = 0;
    }

    if (!isAudioAvailable || !window.speechSynthesis) {
      alert(`🎧 Audio narration coming soon!\n\n"${chapter.era}"\n\nFull story available below.`);
      return;
    }

    // Clicked the same chapter that's currently active in audio
    if (audioChapterIndex === index && audioUtteranceRef.current) {
      if (isPlayingAudio && !isAudioPaused) {
        // Pause and preserve position
        window.speechSynthesis.pause();
        setIsPlayingAudio(false);
        setIsAudioPaused(true);
        return;
      }

      if (!isPlayingAudio && isAudioPaused) {
        // Resume from same timestamp
        window.speechSynthesis.resume();
        setIsPlayingAudio(true);
        setIsAudioPaused(false);
        return;
      }
    }

    // Switching chapter or starting fresh: stop any existing speech
    window.speechSynthesis.cancel();
    audioUtteranceRef.current = null;
    setIsAudioPaused(false);

    // Use stored bilingual content from fortData for the current language
    const localizedChapter = getChapterContent(chapter, language);

    const speech = new SpeechSynthesisUtterance();

    const textToRead =
      expandedChapter === index
        ? `${localizedChapter.title}. ${localizedChapter.fullStory || ""} ${localizedChapter.significance
          ? ` Historical Significance: ${localizedChapter.significance}`
          : ""
        }`
        : `${localizedChapter.title}. ${localizedChapter.preview}`;

    speech.text = textToRead;
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    speech.lang = language === "mr" ? "mr-IN" : "en-IN";

    speech.onend = () => {
      setIsPlayingAudio(false);
      setAudioChapterIndex(null);
      setIsAudioPaused(false);
      audioUtteranceRef.current = null;
    };

    speech.onerror = () => {
      setIsPlayingAudio(false);
      setAudioChapterIndex(null);
      setIsAudioPaused(false);
      audioUtteranceRef.current = null;
    };

    audioUtteranceRef.current = speech;
    window.speechSynthesis.speak(speech);
    setIsPlayingAudio(true);
    setAudioChapterIndex(index);
  };

  // Handle escape key to exit focus mode
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFocusMode]);

  if (!chapters.length) return null;

  return (
    <>
      {/* Focus mode overlay - sirf outside click pe close hoga */}
      {isFocusMode && (
        <div
          className="focus-mode-overlay"
          onClick={() => setIsFocusMode(false)}
          aria-label="Click outside to exit focus mode"
          style={{ cursor: 'pointer' }}
        />
      )}

      <div
        className={`historical-journey ${isFocusMode ? "focus-mode" : ""}`}
        ref={timelineRef}
      >
        {!isFocusMode ? (
          <>
            <h2 className="journey-title">A Walk Through Time</h2>
            <p className="journey-subtitle">
              Scroll right to follow the story from past to present
            </p>
          </>
        ) : (
          <div className="focus-mode-header">
            <h2 className="focus-mode-title">✨ Focus Mode: {chapters[activeIndex]?.era}</h2>
            <p className="focus-mode-subtitle">
              Immerse yourself in the story. Press ESC or click outside to exit.
            </p>
          </div>
        )}

        {/* Timeline Controls */}
        <div className="timeline-controls">
          <button
            className="focus-mode-btn"
            onClick={() => setIsFocusMode(!isFocusMode)}
            aria-label={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
          >
            {isFocusMode ? "← Exit Focus Mode" : "🎬 Focus on Story"}
          </button>

          <div className="language-switcher">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => onLanguageChange?.('en')}
            >
              English
            </button>
            <button
              className={`lang-btn ${language === 'mr' ? 'active' : ''}`}
              onClick={() => onLanguageChange?.('mr')}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Progress indicator with rail - Hide in focus mode */}
        {!isFocusMode && (
          <div className="timeline-progress-container">
            <div className="timeline-rail">
              <div
                className="timeline-progress"
                style={{ width: `${((activeIndex + 1) / chapters.length) * 100}%` }}
              />
            </div>
            <span className="progress-text">
              Chapter {activeIndex + 1} of {chapters.length}
            </span>
          </div>
        )}

        {/* Typewriter effect indicator */}
        {expandedChapter !== null && (
          <div className="typewriter-indicator">
            <span className="typewriter-dot"></span>
            <span className="typewriter-dot"></span>
            <span className="typewriter-dot"></span>
            <span className="typewriter-text">Storytelling...</span>
          </div>
        )}

        <div
          className="timeline-scroll-wrapper"
          ref={scrollContainerRef}
          onScroll={handleManualScroll}
        >
          <div className="horizontal-timeline-track">
            {chapters.map((chapter, index) => {
              const localized = getLocalizedChapter(getChapterContent(chapter, language), language);
              return (
                <article
                  key={index}
                  data-index={index}
                  className={`timeline-chapter ${chapter.isMajor ? "major" : ""} ${activeIndex === index ? "is-active" : "is-dimmed"
                    } ${expandedChapter === index ? "expanded" : ""}`}
                  onClick={(e) => handleCardClick(index, e)}
                >
                  <div className="chapter-marker">
                    <span className="chapter-year">{chapter.year}</span>
                    {activeIndex === index && (
                      <div className="active-indicator"></div>
                    )}
                  </div>

                  <div className="chapter-content">
                    <div className="chapter-header">
                      <span className="era-tag">{chapter.year}</span>
                      {chapter.mood && (
                        <span className="mood-tag">
                          {getMoodIcon(chapter.mood)} {chapter.mood}
                        </span>
                      )}
                      <h3 className="chapter-title">{localized.title}</h3>

                      {/* Audio Narration Button */}
                      <button
                        className={`audio-narration-btn ${isPlayingAudio && audioChapterIndex === index ? "is-playing" : ""}`}
                        onClick={(e) => {
                          handleAudioClick(chapter, index, e);
                        }}
                        aria-label={`Listen to audio narration for ${localized.title}`}
                        title={isAudioAvailable ? "Play audio narration" : "Audio narration coming soon"}
                      >
                        <span className="audio-btn-icon">
                          {isPlayingAudio && audioChapterIndex === index ? "⏸️" : "🔊"}
                        </span>
                        <span className="audio-btn-text">
                          {isPlayingAudio && audioChapterIndex === index ? "Playing..." : "Listen"}
                        </span>
                      </button>
                    </div>

                    <div className="chapter-story">
                      {expandedChapter === index ? (
                        <div className="full-story">
                          <div className="story-paragraphs">
                            {localized.fullStory && (
                              <p className="story-paragraph typewriter-text">
                                {localized.fullStory}
                              </p>
                            )}
                          </div>
                          {localized.significance && (
                            <div className="significance-box">
                              <div className="significance-label">
                                <span>📜</span>
                                Historical Significance
                              </div>
                              <p className="significance-text">{localized.significance}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="story-preview">{localized.preview}</p>
                      )}
                    </div>

                    <div className="chapter-footer">
                      <button
                        className="read-more-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // IMPORTANT: Prevent closing focus mode
                          onToggleChapter(index);
                        }}
                      >
                        {expandedChapter === index ? "Read Less" : "Read Full Story"}
                        <span className="read-more-icon">
                          {expandedChapter === index ? "↑" : "↓"}
                        </span>
                      </button>

                      {/* Ambient sound indicator */}
                      {isFocusMode && activeIndex === index && (
                        <div className="ambient-sound-indicator">
                          <span className="ambient-icon">🎵</span>
                          <span className="ambient-text">Ambient sound on</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Ambient sound toggle */}
        {isFocusMode && (
          <div className="ambient-sound-control">
            <button className="ambient-toggle-btn">
              <span className="ambient-toggle-icon">🎵</span>
              <span className="ambient-toggle-text">Ambient Sound</span>
              <span className="ambient-toggle-status">ON</span>
            </button>
          </div>
        )}
      </div>
      <audio
        ref={localAudioRef}
        // src is set dynamically when Marathi playback begins
        onEnded={() => {
          setIsPlayingAudio(false);
          setAudioChapterIndex(null);
          setIsAudioPaused(false);
        }}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default Timeline;