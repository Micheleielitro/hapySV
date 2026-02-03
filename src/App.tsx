import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [stage, setStage] = useState<'envelope' | 'zooming' | 'reading' | 'success'>('envelope');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullQuestion = "Vuoi essere il mio\nSan Valentino?";

  useEffect(() => {
    // Caricamento Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Effetto Macchina da Scrivere
  useEffect(() => {
    if (stage === 'reading') {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(fullQuestion.slice(0, i + 1));
        i++;
        if (i === fullQuestion.length) clearInterval(interval);
      }, 100); // Velocità scrittura
      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleOpen = () => {
    setStage('zooming');
    // Aspetta che finisca lo zoom per mostrare la lettera
    setTimeout(() => {
      setStage('reading');
    }, 800);
  };

  const handleYes = () => {
    setStage('success');
    const end = Date.now() + 4 * 1000;
    const colors = ['#d90429', '#ef233c', '#ffffff']; // Rossi e Bianchi
    
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
      
      {/* CUORI SFONDO (Più delicati) */}
      <div className="floating-hearts-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-heart"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              color: `rgba(217, 4, 41, ${Math.random() * 0.2 + 0.1})`
            }}
            initial={{ y: "110vh", x: 0, opacity: 0 }}
            animate={{ 
              y: "-10vh", 
              x: [0, 30, -30, 0],
              opacity: [0, 0.6, 0] 
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {/* FASE 1: BUSTA CHIUSA */}
        {stage === 'envelope' && (
          <motion.div 
            className="envelope-container"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 10, opacity: 0 }} // ZOOM IN ENORME
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={handleOpen}
          >
            <div className="envelope">
              <div className="flap-top"></div>
              <div className="pocket"></div>
              <div className="seal"></div>
            </div>
            <motion.p 
              className="instruction"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Clicca per aprire
            </motion.p>
          </motion.div>
        )}

        {/* FASE 2: FASE DI ZOOM (Transizione vuota gestita dal CSS exit sopra) */}
        {stage === 'zooming' && null}

        {/* FASE 3: LETTURA LETTERA */}
        {stage === 'reading' && (
          <motion.div 
            className="paper-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="title">Ciao Amore,</h1>
            <p className="subtitle">Ho una domanda speciale per te...</p>
            <div className="divider"></div>
            
            {/* Testo animato che si scrive */}
            <div className="typewriter-text">
              {typedText}
              <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                |
              </motion.span>
            </div>
            
            <div className="action-buttons">
              <motion.button 
                className="btn yes-btn" 
                onClick={handleYes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sì, lo voglio
              </motion.button>
              
              <motion.button 
                className="btn no-btn"
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* FASE 4: SUCCESSO (POESIA) */}
        {stage === 'success' && (
          <motion.div 
            className="paper-card poem-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="title" style={{fontSize: '2.5rem'}}>Per Te...</h1>
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
            </div>
            <div className="divider" style={{marginTop: '20px'}}></div>
            <p style={{fontFamily: 'Dancing Script', fontSize: '1.5rem', color: '#d90429'}}>Ti Amo.</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;