import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const location = useLocation();

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 h-screen bg-gray-900 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          {isExpanded && <span className="text-xl font-bold">aevion</span>}
        </div>
        
        <nav className="mt-8">
          <Link
            to="/"
            className={`block py-2 px-4 mb-2 rounded ${
              location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
          >
            {isExpanded ? 'Home' : '🏠'}
          </Link>
          <Link
            to="/chart"
            className={`block py-2 px-4 mb-2 rounded ${
              location.pathname === '/chart' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
          >
            {isExpanded ? 'Bar Chart' : '📊'}
          </Link>
          <Link
            to="/temp"
            className={`block py-2 px-4 mb-2 rounded ${
              location.pathname === '/temp' ? 'bg-blue-600' : 'hover:bg-blue-700'
            }`}
          >
            {isExpanded ? 'Temp' : '📝'}
          </Link>
        </nav>
      </div>
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 p-2 rounded-full hover:bg-blue-700"
      >
        {isExpanded ? '◀' : '▶'}
      </button>
    </motion.div>
  );
};

export default Navbar;