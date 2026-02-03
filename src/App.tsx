import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleYes = () => {
    setIsAccepted(true);
    const end = Date.now() + 4 * 1000;
    const colors = ['#ff4d6d', '#ff8fa3', '#ffffff'];
    
    (function frame() {
      confetti({
        particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: colors
      });
      confetti({
        particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: colors
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const moveNoButton = () => {
    const limit = window.innerWidth < 480 ? 60 : 100;
    const newX = (Math.random() - 0.5) * (limit * 2);
    const newY = (Math.random() - 0.5) * (limit * 2);
    setNoButtonPos({ x: newX, y: newY });
  };

  return (
    <div className="container">
      <div className="background-gradient"></div>
      
      {/* CUORI SFONDO: Più numerosi, più veloci e con movimento oscillante */}
      <div className="floating-hearts-bg">
        {Array.from({ length: 45 }).map((_, i) => {
          const size = Math.random() * 20 + 10;
          const duration = Math.random() * 4 + 4; // Più veloci: tra 4 e 8 secondi
          const delay = Math.random() * 10;
          const startX = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className="bg-heart"
              style={{
                left: `${startX}%`,
                fontSize: `${size}px`,
                color: `rgba(255, 77, 109, ${Math.random() * 0.4 + 0.2})`, // Più opachi
                zIndex: 0
              }}
              initial={{ y: "110vh", x: 0, opacity: 0 }}
              animate={{ 
                y: "-10vh", 
                x: [0, 25, -25, 0], // Movimento a zig-zag (oscillazione)
                opacity: [0, 1, 1, 0],
                rotate: [0, 45, -45, 0]
              }}
              transition={{ 
                duration: duration, 
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
            >
              ❤
            </motion.div>
          );
        })}
      </div>

      {!isAccepted ? (
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div 
              className="envelope-container"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => setIsOpen(true)}
            >
              <div className="envelope">
                <div className="flap-top"></div>
                <div className="pocket"></div>
                <div className="seal">
                  <span className="seal-text">B</span>
                </div>
              </div>
              <motion.p 
                className="instruction"
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                Tocca per aprire...
              </motion.p>
            </motion.div>
          ) : (
            <motion.div 
              className="glass-card"
              ref={cardRef}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="card-content">
                <h1 className="title">Ciao Amore! ✨</h1>
                <p className="subtitle">Ho una domanda importante...</p>
                <div className="divider">♥</div>
                <p className="big-question">Vuoi essere il mio<br/>San Valentino?</p>
                
                <div className="action-buttons">
                  <motion.button 
                    className="btn yes-btn" 
                    onClick={handleYes}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sì! 💖
                  </motion.button>
                  
                  <motion.button 
                    className="btn no-btn"
                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    onMouseEnter={moveNoButton}
                    onTouchStart={(e) => {
                      e.preventDefault(); 
                      moveNoButton();
                    }} 
                  >
                    No 🙈
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <motion.div 
          className="success-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass-card success-card poem-card">
            <h1 className="success-title">Per Te... 🥰</h1>
            <div className="poem-content">
              <p>Ti amo di un amore che non conosco</p>
              <p>di un amore per cui non ho parole</p>
              <p>né progetto.</p>
              <p>Ti amo come si amano i tramonti</p>
              <p>le albe e i vasti spazi</p>
              <p>come si amano le risa dei bimbi</p>
              <p>e i loro abbracci.</p>
              <p>E amandoti sono tutta lacrime</p>
              <p>sono tutta sorriso.</p>
              <p>E la mia voce diventa coro</p>
              <p>sono un torrente in piena</p>
              <p>tutta cuore e mondo.</p>
              <p>Amandoti mi faccio intera</p>
              <p>riempio la crepa</p>
              <p>e divento altro.</p>
            </div>
            <p className="love-note">Ti amo immensamente!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
