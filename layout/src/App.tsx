import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ModeToggle from './components/ModeToggle';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Chart from './pages/Chart';
import Temp from './pages/Temp';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(true);
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(mediaQuery );
    }, []);
    
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    const handleModeChange = (mode: 'dark' | 'light') => {
        if (mode === 'dark' && !isDarkMode) {
            setIsDarkMode(true);
        } else if (mode === 'light' && isDarkMode) {
            setIsDarkMode(false);
        }
    };

    return (
        <Router>
            <div
                className={`min-h-screen ${
                    isDarkMode
                        ? 'bg-custom-fence-green text-custom-venetian-lace'
                        : 'bg-custom-venetian-lace text-custom-fence-green'
                }`}
            >
                <NavigationBar
                    isNavExpanded={isNavExpanded}
                    setIsNavExpanded={setIsNavExpanded}
                    isDarkMode={isDarkMode}
                />
                <ModeToggle
                    isDarkMode={isDarkMode}
                    onModeChange={handleModeChange}
                />

                <div
                    className={`transition-all duration-300 ease-in-out ${isNavExpanded ? 'ml-64' : 'ml-32'}`}
                >
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