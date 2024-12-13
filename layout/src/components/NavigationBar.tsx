import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../images/aevion-logo.svg';
import brand from '../images/aevion-brand.svg';

interface NavigationBarProps {
    isNavExpanded: boolean;
    setIsNavExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
}

const NavigationBar: FC<NavigationBarProps> = ({ isNavExpanded, setIsNavExpanded, isDarkMode }) => {
    const location = useLocation();

    // Constants for nav widths and transitions
    const EXPANDED_WIDTH = '16rem';
    const COLLAPSED_WIDTH = '8rem';
    const EXPANDED_BUTTON_POSITION = 236;
    const COLLAPSED_BUTTON_POSITION = 107;
    
    const transition = {
        type: "spring",
        stiffness: 400,
        damping: 30
    };

    return (
        <div className="relative">
            <motion.div
                initial={{ width: COLLAPSED_WIDTH }}
                animate={{ width: isNavExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
                transition={{ transition }}
                className={`fixed left-0 top-0 h-screen overflow-hidden z-40 ${
                    isDarkMode
                        ? 'bg-custom-venetian-lace'
                        : 'bg-custom-fence-green'
                }`}
            >
                <div className="relative flex items-center justify-between px-4 py-6">
                    {/* Logo and Brand */}
                    <div className="flex flex-col items-center mx-auto">
                        <img
                            src={logo}
                            alt="Logo"
                            className={`transition-all duration-300 ${
                                isNavExpanded ? 'w-20 h-20' : 'w-12 h-12'
                            }`}
                        />
                        {isNavExpanded && <img src={brand} alt="Brand" className="w-36" />}
                    </div>
                </div>
                
                {/* Navigation Links */}
                <nav className="mt-8">
                    {/*https://dribbble.com/shots/20360988-Dark-mode-sidebar-navigation*/}
                    <Link
                        to="/"
                        className={`flex items-center mx-auto ${
                            isNavExpanded
                                ? 'w-[calc(100%-2rem)] px-6 py-3'
                                : 'w-fit px-2 py-2'
                            } mb-2 rounded transition-all duration-300 ${
                                location.pathname === '/'
                                ? isDarkMode
                                    ? 'bg-custom-fence-green' 
                                    : 'bg-custom-venetian-lace'
                                : isDarkMode
                                    ? 'bg-custom-fence-green-0.8 hover:bg-custom-fence-green'
                                    : 'bg-custom-venetian-lace-0.8 hover:bg-custom-venetian-lace'
                            }`}
                    >
                        {isNavExpanded ? 'Home' : (
                            <svg
                                width="36"
                                height="36"
                                stroke-width="1.5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="rgba(240, 83, 28)"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        )}
                    </Link>
                    <Link
                        to="/chart"
                        className={`flex items-center mx-auto ${
                            isNavExpanded
                                ? 'w-[calc(100%-2rem)] px-6 py-3'
                                : 'w-fit px-2 py-2'
                            } mb-2 rounded transition-all duration-300 ${
                                location.pathname === '/chart'
                                    ? isDarkMode
                                        ? 'bg-custom-fence-green' 
                                        : 'bg-custom-venetian-lace'
                                    : isDarkMode
                                        ? 'bg-custom-fence-green-0.8 hover:bg-custom-fence-green'
                                        : 'bg-custom-venetian-lace-0.8 hover:bg-custom-venetian-lace'
                            }`}
                    >
                        {isNavExpanded ? 'Bar Chart' : (
                            <svg
                                width="36"
                                height="36"
                                stroke-width='1.5'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                stroke='rgba(240, 83, 28)'
                                fill='none'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="4" y1="19" x2="20" y2="19" />
                                <polyline points="4 15 8 9 12 11 16 6 20 10" />
                            </svg>
                        )}
                    </Link>
                    <Link
                        to="/temp"
                        className={`flex items-center mx-auto ${
                            isNavExpanded
                                ? 'w-[calc(100%-2rem)] px-6 py-3'
                                : 'w-fit px-2 py-2'
                            } mb-2 rounded transition-all duration-300 ${
                                location.pathname === '/temp'   
                                    ? isDarkMode
                                        ? 'bg-custom-fence-green' 
                                        : 'bg-custom-venetian-lace'
                                    : isDarkMode
                                        ? 'bg-custom-fence-green-0.8 hover:bg-custom-fence-green'
                                        : 'bg-custom-venetian-lace-0.8 hover:bg-custom-venetian-lace'
                            }`}
                    >
                        {isNavExpanded
                            ? 'Temp'
                            : '📝'}
                    </Link>
                </nav>
            </motion.div>

            <motion.button
                initial={{ x: COLLAPSED_BUTTON_POSITION }}
                animate={{ x: isNavExpanded ? EXPANDED_BUTTON_POSITION : COLLAPSED_BUTTON_POSITION }}
                transition={{ transition }}
                onClick={() => setIsNavExpanded(!isNavExpanded)}
                className="fixed top-20 -translate-x-1/2 z-50"
            >
                <div className="p-1.5 rounded-full group">
                    <svg
                        width="30"
                        height="30"
                        stroke-width="1.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="rgba(240, 83, 28)"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="transition-all duration-300 group-hover:scale-110"
                    >
                        {isNavExpanded ? (
                            <>
                                {/* Expanded nav bar SVG path */}
                                <circle cx="12" cy="12" r="9" fill="#F0531C" />
                                <path
                                    d="m13 9-2.738 2.738v0a.371.371 0 0 0 0 .524v0L13 15"
                                    stroke="#F7EDDA"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </>
                        ) : (
                            <>
                                {/* Collapsed nav bar SVG path */}
                                <circle cx="12" cy="12" r="9" fill="#F0531C" />
                                <path
                                    d="m11 15 2.716-2.716v0a.402.402 0 0 0 0-.568v0L11 9"
                                    stroke="#F7EDDA"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </>
                        )}
                    </svg>
                </div>
            </motion.button>
        </div>
    );
};

export default NavigationBar;