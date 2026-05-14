import { useState, useEffect, useCallback } from 'react';
import { useStore } from './store/useStore';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import SearchModal from './components/SearchModal';
import Landing from './pages/Landing';
import WarRoom from './pages/WarRoom';
import Diseases from './pages/Diseases';
import DiseaseDetail from './pages/DiseaseDetail';
import CommandCenter from './pages/CommandCenter';
import Sources from './pages/Sources';
import Learn from './pages/Learn';
import AnatomyExplorer from './pages/AnatomyExplorer';

function App() {
  const { darkMode } = useStore();
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState('/');
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  // Navigate function with fade transition
  const navigate = useCallback((path: string) => {
    setFadeState('out');
    setTimeout(() => {
      setCurrentPath(path);
      window.scrollTo({ top: 0 });
      setFadeState('in');
    }, 150);
  }, []);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#F5F5F7';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#1D1D1F';
    }
  }, [darkMode]);

  // Render page based on path
  const renderPage = () => {
    if (currentPath === '/') return <Landing onNavigate={navigate} />;
    if (currentPath === '/war-room') return <WarRoom onNavigate={navigate} />;
    if (currentPath === '/diseases') return <Diseases onNavigate={navigate} />;
    if (currentPath.startsWith('/disease/')) {
      const slug = currentPath.replace('/disease/', '');
      return <DiseaseDetail slug={slug} onNavigate={navigate} />;
    }
    if (currentPath === '/command-center') return <CommandCenter onNavigate={navigate} />;
    if (currentPath === '/sources') return <Sources />;
    if (currentPath === '/learn') return <Learn onNavigate={navigate} />;
    if (currentPath === '/anatomy') return <AnatomyExplorer onNavigate={navigate} />;
    return <Landing onNavigate={navigate} />;
  };

  // Check if current page needs footer (War Room is full-screen)
  const showFooter = currentPath !== '/war-room';

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: darkMode ? '#000000' : '#FFFFFF',
        color: darkMode ? '#F5F5F7' : '#1D1D1F',
      }}
    >
      <Navigation currentPath={currentPath} onNavigate={navigate} />
      <SearchModal onNavigate={navigate} />

      <main
        style={{
          opacity: fadeState === 'in' ? 1 : 0,
          transform: fadeState === 'in' ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.3s cubic-bezier(0.25,0.1,0.25,1), transform 0.3s cubic-bezier(0.25,0.1,0.25,1)',
        }}
      >
        {renderPage()}
      </main>

      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}

export default App;
