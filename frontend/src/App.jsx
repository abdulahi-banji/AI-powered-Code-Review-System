import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './components/Landing';
import CodeReview from './components/CodeReview';
import Documentation from './components/Documentation';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'app', or 'docs'

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {view === 'landing' ? (
        <motion.div
          key="landing"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Landing onNavigate={() => setView('app')} onViewDocs={() => setView('docs')} />
        </motion.div>
      ) : view === 'app' ? (
        <motion.div
          key="app"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <CodeReview onBack={() => setView('landing')} />
        </motion.div>
      ) : (
        <motion.div
          key="docs"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Documentation onBack={() => setView('landing')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;

