import React, { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MoodRecommendation from './components/MoodRecommendation/MoodRecommendation'

const App = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const heroSectionRef = useRef(null);
  const moodRecommendationsRef = useRef(null);

  const scrollToSection = (section) => {
    // Use setTimeout to ensure DOM is ready
    setTimeout(() => {
      const navbarHeight = 80; // Height of your fixed navbar
      
      if (section === "home") {
        // Scroll to hero section (home)
        const heroElement = document.getElementById('home');
        if (heroElement) {
          const elementPosition = heroElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (section === "mood-recommendations") {
        // Scroll to mood recommendations section
        const moodElement = document.getElementById('mood-recommendations');
        if (moodElement) {
          const elementPosition = moodElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // If element not found by ID, try to calculate position
          const headerElement = document.querySelector('.hero-section');
          if (headerElement) {
            const headerHeight = headerElement.offsetHeight;
            const targetPosition = headerHeight - navbarHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    }, 100);
  };

  useEffect(() => {
    // Scroll to section when currentSection changes
    scrollToSection(currentSection);
  }, [currentSection]);

  // Handle initial page load - don't scroll on reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderCurrentSection = () => {
    switch(currentSection) {
      case "mood-recommendations":
        return (
          <div ref={moodRecommendationsRef} id="mood-recommendations">
            <MoodRecommendation />
          </div>
        );
      case "home":
      default:
        return null;
    }
  };

  return (
   <>
     <Header 
       onSectionChange={setCurrentSection} 
       heroSectionRef={heroSectionRef}
     />
     {renderCurrentSection()}
     <Footer />
   </>
  )
}

export default App;