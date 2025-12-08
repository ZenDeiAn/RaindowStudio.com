import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../App';
import { GALLERY_ITEMS, TRANSLATIONS } from '../constants';
import { GalleryItem } from '../types';

const ITEMS_PER_PAGE = 10;

const Gallery: React.FC = () => {
  const { language } = useApp();
  // @ts-ignore
  const t = TRANSLATIONS[language].gallery;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedItem = GALLERY_ITEMS.find(item => item.id === selectedId);
  
  const totalPages = Math.ceil(GALLERY_ITEMS.length / ITEMS_PER_PAGE);
  const currentItems = GALLERY_ITEMS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper to map size to grid span classes
  // Grid is 3 columns on medium screens (md).
  // small (1x1): span 1
  // wide (2x1): span 2
  // tall (1x2): span 1 row 2
  // large (2x2): span 2 row 2
  const getSpanClass = (size: GalleryItem['size']) => {
    switch (size) {
      case 'large': return 'col-span-2 row-span-2'; // 2x2
      case 'wide': return 'col-span-2 row-span-1';  // 2x1
      case 'tall': return 'col-span-1 row-span-2';  // 1x2
      case 'small': default: return 'col-span-1 row-span-1'; // 1x1
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto font-sans relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 border-b-4 border-black dark:border-white pb-6"
      >
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter dark:text-white leading-none mb-2">
          Gallery
        </h1>
        <div className="flex justify-between items-end">
          <p className="font-serif italic text-xl text-gray-600 dark:text-gray-400">
            Visual Archives
          </p>
          <span className="font-mono text-sm font-bold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-2 py-1">
            {t.page} {currentPage} / {totalPages}
          </span>
        </div>
      </motion.div>

      {/* Grid Layout: 3 Columns for larger 1/3 base unit size */}
      {/* grid-flow-dense helps pack mixed sizes better */}
      <motion.div 
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4 grid-flow-dense mb-16"
      >
        {currentItems.map((item) => (
          <motion.div
            layoutId={`card-${item.id}`}
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`relative group cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800 border border-black dark:border-white ${getSpanClass(item.size)}`}
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {/* Default dimmed (brightness-75), brighten on hover */}
            <motion.img 
              src={item.url} 
              alt={item.title} 
              className="w-full h-full object-cover transition-all duration-700 brightness-75 group-hover:brightness-100"
            />
            
            {/* Hover Info */}
            <motion.div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
              <h3 className="text-white font-bold text-lg uppercase leading-none">{item.title}</h3>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center border-t-2 border-gray-200 dark:border-gray-800 pt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors dark:text-white disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> {t.prevPage}
        </button>
        
        <div className="flex space-x-2">
           {Array.from({ length: totalPages }).map((_, i) => (
             <button
               key={i}
               onClick={() => handlePageChange(i + 1)}
               className={`w-3 h-3 rounded-full transition-colors ${currentPage === i + 1 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'}`}
             />
           ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center text-lg font-bold uppercase tracking-widest hover:text-primary transition-colors dark:text-white disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          {t.nextPage} <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div 
              layoutId={`card-${selectedItem.id}`}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-900 overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-3/4 h-[50vh] md:h-auto bg-black flex items-center justify-center">
                <motion.img 
                  src={selectedItem.url} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full md:w-1/4 p-8 flex flex-col justify-center bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800">
                <div className="mb-auto">
                   <span className="font-mono text-xs text-primary border border-current px-2 py-1 mb-4 inline-block">
                    IMG_{selectedItem.id}
                  </span>
                  <h2 className="text-4xl font-black uppercase mb-4 dark:text-white leading-none">{selectedItem.title}</h2>
                  <div className="w-12 h-1 bg-black dark:bg-white mb-6"></div>
                  <p className="font-serif italic text-gray-600 dark:text-gray-300 text-lg">
                    {selectedItem.description}
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Details</div>
                  <div className="grid grid-cols-1 gap-4 text-sm dark:text-gray-300">
                    <div>Format: JPG</div>
                    {/* Display actual resolution */}
                    <div className="font-mono">{selectedItem.width} x {selectedItem.height}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;