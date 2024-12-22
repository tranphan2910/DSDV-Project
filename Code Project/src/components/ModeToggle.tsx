import React from 'react';

interface ModeToggleProps {
    isDarkMode: boolean;
    onModeChange: (mode: 'dark' | 'light') => void;
    isExpanded?: boolean;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ isDarkMode, onModeChange, isExpanded = true }) => {
    return (
        <div className={`${isExpanded ? 'w-[120px]' : 'w-[48px]'}`}>
            {isExpanded ? (
                // Expanded version
                <div
                    className={`relative border-2 rounded-full px-4 py-2 text-center transition-all duration-200 group
                        border-custom-fiery-glow-0.5 hover:border-custom-fiery-glow-0.8 hover:shadow-fiery-glow-glow`}
                >
                    <div className="flex items-center justify-center space-x-2">
                        <span
                            className={`cursor-pointer transition-all duration-300 ${
                                isDarkMode
                                    ? 'text-custom-fiery-glow-0.5 hover:text-custom-fiery-glow-0.8 hover:text-shadow-fiery-glow-glow'
                                    : 'text-custom-fiery-glow-0.5 hover:text-custom-fiery-glow-0.8'
                            }`}
                            onClick={() => onModeChange('dark')}
                        >
                            <span className="font-medium hover:font-bold inline-block w-[32px]">Dark</span>
                        </span>
                        
                        <div
                            className={`h-4 w-[1.5px] mx-0.5 transition-colors duration-200 ${
                                isDarkMode
                                    ? 'bg-custom-fiery-glow-0.5 group-hover:bg-custom-fiery-glow-0.8'
                                    : 'bg-custom-fiery-glow-0.5 group-hover:bg-custom-fiery-glow-0.8'
                            }`}
                        ></div>

                        <span
                            className={`cursor-pointer transition-all duration-300 ${
                                isDarkMode
                                    ? 'text-custom-fiery-glow-0.5 hover:text-custom-fiery-glow-0.8'
                                    : 'text-custom-fiery-glow-0.5 hover:text-custom-fiery-glow-0.8'
                            }`}
                            onClick={() => onModeChange('light')}
                        >
                            <span className="font-medium hover:font-bold inline-block w-[32px]">Light</span>
                        </span>
                    </div>
                </div>
            ) : (
                // Contracted version
                <button
                    onClick={() => onModeChange(isDarkMode ? 'light' : 'dark')}
                    className={`p-2 rounded-full border-2 transition-all duration-200 
                        border-custom-fiery-glow-0.5 hover:border-custom-fiery-glow-0.8 hover:shadow-fiery-glow-glow
                        ${isDarkMode ? 'text-custom-fiery-glow-0.5' : 'text-custom-fiery-glow-0.5'}`}
                >
                    {isDarkMode ? (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-300 hover:text-custom-fiery-glow-0.8"
                        >
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    ) : (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-all duration-300 hover:text-custom-fiery-glow-0.8"
                        >
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
};

export default ModeToggle;