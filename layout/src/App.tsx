import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ModeToggle from './components/ModeToggle';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chart from './pages/Chart';
import Temp from './pages/Temp';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);
  }, []);

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div
        className={`min-h-screen ${
          isDarkMode
            ? 'bg-custom-fence-green text-custom-venetian-lace'
            : 'bg-custom-venetian-lace text-custom-fence-green'
            }`}
      >
        <Navbar />
        <ModeToggle
          isDarkMode={isDarkMode}
          toggleMode={() => setIsDarkMode(!isDarkMode)}
        />

        <div className={`ml-64 transition-all duration-500`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/temp" element={<Temp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;