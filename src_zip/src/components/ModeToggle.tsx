import React from 'react';

interface ModeToggleProps {
    isDarkMode: boolean;
    onModeChange: (mode: 'dark' | 'light') => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ isDarkMode, onModeChange }) => {
    return (
        <div className="fixed top-5 right-5">
            {/*Button border*/}
            <div
                className={`relative border-2 rounded-full px-4 py-2 w-[120px] text-center transition-all duration-200 group
                    border-custom-fiery-glow-0.5 hover:border-custom-fiery-glow-0.8 hover:shadow-fiery-glow-glow`}
            >
                <div className="flex items-center justify-center space-x-2">

                    {/*Dark switch*/}
                    <span
                        className={`cursor-pointer transition-all duration-300 ${
                            isDarkMode
                                ? 'text-custom-fiery-glow-0.5 hover:text-custom-fiery-glow-0.8 hover:text-shadow-glow'
                                : 'text-custom-fiery-glow-0.5 hover:text-custom-fiery-glow-0.8'
                        }`}
                        onClick={() => onModeChange('dark')}
                    >
                        <span className="font-medium hover:font-bold inline-block w-[32px]">Dark</span>
                    </span>
                    
                    {/*Divider*/}
                    <div
                        className={`h-4 w-[1.5px] mx-0.5 transition-colors duration-200 ${
                            isDarkMode
                                ? 'bg-custom-fiery-glow-0.5 group-hover:bg-custom-fiery-glow-0.8'
                                : 'bg-custom-fiery-glow-0.5 group-hover:bg-custom-fiery-glow-0.8'
                        }`}
                    ></div>

                    {/*Light switch*/}
                    <span
                        className={`cursor-pointer transition-all duration-300 ${
                            isDarkMode
                                ? 'text-custom-fiery-glow-0.5 hover:text-custom-fiery-glow-0.8 hover:text-shadow-glow'
                                : 'text-custom-fiery-glow-0.5 hover:text-custom-fiery-glow-0.8'
                    }`}
                        onClick={() => onModeChange('light')}
                    >
                        <span className="font-medium hover:font-bold inline-block w-[32px]">Light</span>
                    </span>

                </div>
            </div>
        </div>
    );
};

export default ModeToggle;