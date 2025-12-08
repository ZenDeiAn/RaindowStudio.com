
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Search, Globe, Menu, X } from 'lucide-react';
import { useApp } from '../App';
import { TRANSLATIONS } from '../constants';

const Navbar: React.FC = () => {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const t = TRANSLATIONS[language].nav;
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path ? 'text-primary font-bold' : 'hover:text-primary transition-colors';

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            RS.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium dark:text-gray-200">
            <Link to="/" className={isActive('/')}>{t.home}</Link>
            <Link to="/about" className={isActive('/about')}>{t.about}</Link>
            <Link to="/blog" className={isActive('/blog')}>{t.blog}</Link>
            <Link to="/gallery" className={isActive('/gallery')}>{t.gallery}</Link>
            <Link to="/widgets" className={isActive('/widgets')}>{t.widgets}</Link>
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
             {/* Search */}
             <Link to="/search" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-gray-200">
              <Search size={18} />
            </Link>

            {/* Language */}
            <div className="relative group">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center text-gray-800 dark:text-gray-200">
                <Globe size={18} />
                <span className="ml-1 uppercase text-xs">{language}</span>
              </button>
              <div className="absolute right-0 top-full pt-2 w-24 hidden group-hover:block">
                <div className="bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700">
                  {(['en', 'zh', 'ko'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`block w-full text-left px-4 py-2 text-sm ${language === lang ? 'text-primary font-bold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                      {lang === 'zh' ? '中文' : lang === 'ko' ? '한국어' : 'English'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-800 dark:text-yellow-300"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4 shadow-lg">
          <div className="flex flex-col space-y-4 font-medium dark:text-gray-200">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={isActive('/')}>{t.home}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className={isActive('/about')}>{t.about}</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className={isActive('/blog')}>{t.blog}</Link>
            <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className={isActive('/gallery')}>{t.gallery}</Link>
            <Link to="/widgets" onClick={() => setIsMenuOpen(false)} className={isActive('/widgets')}>{t.widgets}</Link>
            
            <hr className="border-gray-200 dark:border-gray-700" />
            
            <div className="flex items-center justify-between">
              <Link to="/search" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2">
                 <Search size={18} /> <span>{t.search}</span>
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            
            <div className="flex space-x-2">
               {(['en', 'zh', 'ko'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setIsMenuOpen(false); }}
                    className={`px-3 py-1 rounded text-sm ${language === lang ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
