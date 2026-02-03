import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  
  // Riferimento per calcolare i limiti del movimento
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
    // Logica Mobile-Safe: Movimento limitato
    // Su mobile spostiamo di max 60px, su desktop un po' di più
    const limit = window.innerWidth < 480 ? 60 : 100;
    
    // Genera una nuova posizione randomica MA limitata rispetto al centro originale
    // Usiamo valori positivi e negativi per andare in tutte le direzioni
    const newX = (Math.random() - 0.5) * (limit * 2);
    const newY = (Math.random() - 0.5) * (limit * 2);

    setNoButtonPos({ x: newX, y: newY });
  };

  return (
    <div className="container">
      <div className="background-gradient"></div>
      
      {/* CUORI SFONDO: Ora rossi/rosa scuro per contrastare con lo sfondo chiaro */}
      <div className="floating-hearts-bg">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-heart"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
              // Colore rosa scuro invece di bianco
              color: `rgba(255, 77, 109, ${Math.random() * 0.3 + 0.1})` 
            }}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.8, 0], // Più visibili
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
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2 }}
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
                    // Muove il bottone usando transform translate
                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }} // Molto scattante
                    onMouseEnter={moveNoButton}
                    onTouchStart={(e) => {
                      // Su mobile, previeni il click se sta scappando
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