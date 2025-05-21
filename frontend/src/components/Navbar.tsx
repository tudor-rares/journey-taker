import React, { useState, useEffect, useRef } from 'react';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle login state for demo purposes
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    if (showDropdown) setShowDropdown(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 flex items-center z-50 h-20 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-2xl bg-black/70 border-b border-white/[0.06] shadow-lg' 
          : ''
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Logo and title with modern effects */}
        <div className="flex-shrink-0 flex items-center">
          <div className="relative group animate-float" style={{ animationDuration: '6s' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-700 group-hover:duration-200 animate-gradient-shift"></div>
            <div className="relative flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-black/80 rounded-xl border border-white/10 shadow-inner-light group-hover:border-white/20 transition-all duration-300">
                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-40">
                  <div className="w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent relative z-10">JT</span>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold text-gradient">JOURNEY<span className="text-pink-500">TAKER</span></span>
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 mt-0.5"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Empty middle space - flex-1 ensures it takes all available space pushing the button to far right */}
        <div className="flex-1"></div>
        
        {/* Right-side buttons - moved to far right with justify-end */}
        <div className="flex-shrink-0 flex items-center ml-auto">
          {isLoggedIn ? (
            <>
              <button 
                className="glass-button flex items-center space-x-2 px-3 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] rounded-md transition-all duration-300 border border-white/[0.08] text-xs font-medium text-white/90 hover:text-white mr-3"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Account</span>
              </button>
              
              <button 
                onClick={toggleLogin}
                className="relative group overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-md opacity-70 blur-[1px] group-hover:opacity-100 transition duration-300 group-hover:blur-[1px]"></div>
                <div className="relative px-3 py-1.5 bg-black/80 rounded-md flex items-center space-x-2">
                  <svg className="w-3.5 h-3.5 text-pink-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-xs font-medium text-white">
                    Logout
                  </span>
                </div>
              </button>
            </>
          ) : (
            <button 
              onClick={toggleLogin}
              className="relative group overflow-hidden"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-md opacity-70 blur-[1px] group-hover:opacity-100 transition duration-300 group-hover:blur-[1px]"></div>
              <div className="relative px-3 py-1.5 bg-black/80 rounded-md flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-pink-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="text-xs font-medium text-white">
                  Sign In
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
