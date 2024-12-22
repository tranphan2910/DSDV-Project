import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './assets/WEB/css/telma.css';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Dashboard from './pages/Chart';
import Team from './pages/Team';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isNavExpanded, setIsNavExpanded] = useState(true);
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsDarkMode(e.matches);
        };
        mediaQuery.addEventListener('change', handleMediaChange);
        setIsDarkMode(mediaQuery.matches);
    
        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
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
            <div className="flex h-screen overflow-hidden">
                <NavigationBar
                    isNavExpanded={isNavExpanded}
                    setIsNavExpanded={setIsNavExpanded}
                    isDarkMode={isDarkMode}
                    onModeChange={handleModeChange}
                />

                <div
                    className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
                        isDarkMode
                            ? 'bg-custom-fence-green text-custom-venetian-lace'
                            : 'bg-custom-venetian-lace text-custom-fence-green'
                    }`}
                >
                    <div
                        className={`transition-all duration-300 ease-in-out ${isNavExpanded ? 'ml-56' : 'ml-32'}`}
                    >
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;