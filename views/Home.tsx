import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { useApp } from '../App';
import { BLOGS, GALLERY_ITEMS, TRANSLATIONS } from '../constants';

const Home: React.FC = () => {
  const { language } = useApp();
  const t = TRANSLATIONS[language].home;
  const latestBlog = BLOGS[BLOGS.length - 1]; // Get last item
  const latestGallery = GALLERY_ITEMS[0];

  return (
    <div className="w-full">
      <Hero />
      
      {/* Content Start Point (Visible after scroll) */}
      <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        
        {/* Left: Blog Preview */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform origin-left" />
          
          <div className="relative z-10">
            <div className="flex items-center text-primary mb-4 font-bold tracking-widest uppercase text-sm">
              <BookOpen size={16} className="mr-2" />
              {t.latestBlog}
            </div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
              {latestBlog.title[language]}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 line-clamp-3 leading-relaxed">
              {latestBlog.content.find(c => c.type === 'text')?.value || '...'}
            </p>
            <Link 
              to={`/blog/${latestBlog.id}`} 
              className="inline-flex items-center font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors group-hover:translate-x-2 duration-300"
            >
              {t.readMore} <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Right: Gallery Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 relative h-[50vh] md:h-auto overflow-hidden group"
        >
          <img 
            src={latestGallery.url} 
            alt={latestGallery.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-0 left-0 p-12 w-full text-white">
            <div className="flex items-center text-secondary mb-2 font-bold tracking-widest uppercase text-sm">
              <ImageIcon size={16} className="mr-2" />
              {t.latestPhoto}
            </div>
            <h3 className="text-3xl font-bold mb-2">{latestGallery.title}</h3>
            <p className="text-gray-300 mb-6">{latestGallery.description}</p>
            <Link 
              to="/gallery" 
              className="inline-block border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all"
            >
              View Gallery
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;