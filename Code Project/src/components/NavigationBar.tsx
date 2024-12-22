import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ModeToggle from './ModeToggle';
import logo from "../images/aevion-logo.svg";
import brand from "../images/aevion-brand.svg";

interface NavigationBarProps {
  isNavExpanded: boolean;
  setIsNavExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  onModeChange: (mode: 'dark' | 'light') => void;
}

const NavigationBar: FC<NavigationBarProps> = ({
  isNavExpanded,
  setIsNavExpanded,
  isDarkMode,
  onModeChange,
}) => {
  const location = useLocation();

  // Constants for nav widths and transitions
  const EXPANDED_WIDTH = "12rem";
  const COLLAPSED_WIDTH = "6rem";
  const EXPANDED_BUTTON_POSITION = 195;
  const COLLAPSED_BUTTON_POSITION = 98;

  const transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
  };

  return (
    <div className="relative">
      <motion.div
        initial={{ width: COLLAPSED_WIDTH }}
        animate={{ width: isNavExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
        transition={{ transition }}
        className={`fixed left-6 top-6 h-[calc(100vh-48px)] flex flex-col overflow-hidden z-40 ${
          isDarkMode
            ? "bg-custom-venetian-lace rounded-3xl"
            : "bg-custom-fence-green rounded-3xl"
        }`}
      >
        <div className="relative flex items-center justify-between px-4 py-6">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center mx-auto">
            <img
              src={logo}
              alt="Logo"
              className={`transition-all duration-300 ${
                isNavExpanded ? "w-20 h-20" : "w-12 h-12"
              }`}
            />
            {isNavExpanded && <img src={brand} alt="Brand" className="w-36" />}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 flex-grow">
          <Link
            to="/"
            className={`flex items-center mx-auto ${
              isNavExpanded
                ? "w-[calc(100%-2rem)] px-6 py-3"
                : "w-fit px-2 py-2"
            } mb-2 rounded transition-all duration-300 ${
              location.pathname === "/"
                ? isDarkMode
                  ? "bg-custom-fence-green"
                  : "bg-custom-venetian-lace"
                : isDarkMode
                  ? "bg-custom-fence-green-0.8 hover:bg-custom-fence-green"
                  : "bg-custom-venetian-lace-0.8 hover:bg-custom-venetian-lace"
            }`}
          >
            {isNavExpanded ? (
              "Home"
            ) : (
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
            to="/dashboard"
            className={`flex items-center mx-auto ${
              isNavExpanded
                ? "w-[calc(100%-2rem)] px-6 py-3"
                : "w-fit px-2 py-2"
            } mb-2 rounded transition-all duration-300 ${
              location.pathname === "/dashboard"
                ? isDarkMode
                  ? "bg-custom-fence-green"
                  : "bg-custom-venetian-lace"
                : isDarkMode
                  ? "bg-custom-fence-green-0.8 hover:bg-custom-fence-green"
                  : "bg-custom-venetian-lace-0.8 hover:bg-custom-venetian-lace"
            }`}
          >
            {isNavExpanded ? (
              "Dashboard"
            ) : (
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
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="19" x2="20" y2="19" />
                <polyline points="4 15 8 9 12 11 16 6 20 10" />
              </svg>
            )}
          </Link>
          <Link
            to="/team"
            className={`flex items-center mx-auto ${
              isNavExpanded
                ? "w-[calc(100%-2rem)] px-6 py-3"
                : "w-fit px-2 py-2"
            } mb-2 rounded transition-all duration-300 ${
              location.pathname === "/team"
                ? isDarkMode
                  ? "bg-custom-fence-green"
                  : "bg-custom-venetian-lace"
                : isDarkMode
                  ? "bg-custom-fence-green-0.8 hover:bg-custom-fence-green"
                  : "bg-custom-venetian-lace-0.8 hover:bg-custom-venetian-lace"
            }`}
          >
            {isNavExpanded ? (
              "Team"
            ) : (
              <svg
                width="36"
                height="36"
                stroke-width='1.5'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='-2 -2 24 24'
                stroke='rgba(240, 83, 28)'
                fill='none'
                stroke-linecap='round'
                stroke-linejoin='round'
              >
                <path d='M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
                <path d='M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z' />
                <path d='M1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655z' />
                <path d='M18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z' />
                <path d='M17.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654z' />
                <path d='M5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81z' />
              </svg>
            )}
          </Link>
        </nav>
        
        {/* Mode Toggle at bottom */}
        <div className="mt-auto mb-6 flex justify-center">
            <ModeToggle
                isDarkMode={isDarkMode}
                onModeChange={onModeChange}
                isExpanded={isNavExpanded}
            />
        </div>
      </motion.div>

      <motion.button
        initial={{ x: COLLAPSED_BUTTON_POSITION }}
        animate={{
          x: isNavExpanded
            ? EXPANDED_BUTTON_POSITION
            : COLLAPSED_BUTTON_POSITION,
        }}
        transition={{ transition }}
        onClick={() => setIsNavExpanded(!isNavExpanded)}
        className="fixed top-24 -translate-x-1/2 z-50"
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