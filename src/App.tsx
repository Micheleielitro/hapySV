import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  // Preload Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleYes = () => {
    setIsAccepted(true);
    const end = Date.now() + 3 * 1000;

    // Confetti explosion loop
    const colors = ['#ff4d6d', '#ff8fa3', '#ffffff'];
    
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const moveNoButton = () => {
    // Calcola una posizione casuale ma "sicura" all'interno della viewport visibile
    // Ridotto il range per evitare che vada troppo fuori schermo su mobile
    const x = (Math.random() - 0.5) * 200; // sposta +/- 100px orizzontalmente
    const y = (Math.random() - 0.5) * 200; // sposta +/- 100px verticalmente
    setNoButtonPos({ x, y });
    setIsMoving(true);
  };

  return (
    <div className="container">
      <div className="background-gradient"></div>
      
      {!isAccepted ? (
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div 
              className="envelope-container"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => setIsOpen(true)}
            >
              <div className="envelope">
                <div className="flap-top"></div>
                <div className="pocket"></div>
                <div className="seal">
                  <motion.span 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ❤
                  </motion.span>
                </div>
              </div>
              <motion.p 
                className="instruction"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                Tocca per aprire...
              </motion.p>
            </motion.div>
          ) : (
            <motion.div 
              className="glass-card"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="card-content">
                <h1 className="title">Ciao Amore! ✨</h1>
                <p className="subtitle">Ho una domanda molto importante per te...</p>
                <div className="divider">♥</div>
                <p className="big-question">Vuoi essere il mio<br/>San Valentino?</p>
                
                <div className="action-buttons">
                  <motion.button 
                    className="btn yes-btn" 
                    onClick={handleYes}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sì, lo voglio! 💖
                  </motion.button>
                  
                  <motion.button 
                    className="btn no-btn"
                    animate={isMoving ? { x: noButtonPos.x, y: noButtonPos.y } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton} // Supporto touch
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-card success-card">
            <h1>Evviva! 🥰</h1>
            <p>Hai reso questa giornata magica.</p>
            <p className="love-note">Ti amo tanto!</p>
          </div>
          
          {/* Cuori fluttuanti sfondo */}
          <div className="floating-hearts-bg">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="bg-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 10}px`
                }}
                initial={{ y: "110vh", opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 1, 0] }}
                transition={{ 
                  duration: Math.random() * 5 + 5, 
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
              >
                ❤
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
