import React from 'react';

interface ModeToggleProps {
  isDarkMode: boolean;
  toggleMode: () => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ isDarkMode, toggleMode }) => {
    return (
        <div className="fixed top-5 right-5">
            <div className={`relative border-2 rounded-full px-4 py-2 transition-all duration-200 ${
                isDarkMode
                    ? 'border-custom-fiery-glow-0.3 hover:border-custom-fiery-glow-0.5'
                    : 'border-custom-fiery-glow-0.3 hover:border-custom-fiery-glow-0.8'
            }`}>
                <div className="flex items-center space-x-2">
                    <span
                        className={`cursor-pointer transition-all duration-300 ${
                            isDarkMode
                            ? 'text-[rgba(237,28,36,0.3)] hover:text-[rgba(237,28,36,0.8)] hover:text-shadow-red'
                            : 'text-[rgba(237,28,36,0.3)] hover:text-[rgba(237,28,36,1)]'
                        }`}
                        onClick={() => toggleMode()}
                    >
                        Dark
                    </span>
                    
                    <div className="h-4 w-[1.5px] mx-0.5 transition-colors duration-200"
                        style={{
                            background: 'rgba(237,28,36,0.3)'
                        }}
                    ></div>
                    
                    <span
                        className={`cursor-pointer transition-all duration-300 ${
                            isDarkMode
                                ? 'text-[rgba(237,28,36,0.3)] hover:text-[rgba(237,28,36,0.8)] hover:text-shadow-red'
                                : 'text-[rgba(237,28,36,0.3)] hover:text-[rgba(237,28,36,1)]'
                        }`}
                        onClick={() => toggleMode()}
                    >
                        Light
                    </span>
                </div>
            </div>
        </div>
    );
};
  
export default ModeToggle;