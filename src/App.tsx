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
    const end = Date.now() + 4 * 1000;

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
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    setNoButtonPos({ x, y });
    setIsMoving(true);
  };

  return (
    <div className="container">
      <div className="background-gradient"></div>
      
      {/* Cuori fluttuanti sempre visibili come sfondo */}
      <div className="floating-hearts-bg">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-heart"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              filter: 'blur(1px)'
            }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.4, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>

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
                  <span className="seal-text">B</span>
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
                    onTouchStart={moveNoButton}
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
