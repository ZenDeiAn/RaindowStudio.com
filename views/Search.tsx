import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Calendar, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../App';
import { BLOGS, TRANSLATIONS } from '../constants';

const Search: React.FC = () => {
  const { language } = useApp();
  // @ts-ignore
  const t = TRANSLATIONS[language].search;
  const tBlog = TRANSLATIONS[language].blog;
  
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return BLOGS.filter(blog => {
      const title = blog.title[language].toLowerCase();
      const content = blog.content.find(c => c.type === 'text')?.value.toLowerCase() || '';
      const tags = blog.tags.join(' ').toLowerCase();
      return title.includes(lowerQuery) || content.includes(lowerQuery) || tags.includes(lowerQuery);
    });
  }, [query, language]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-4xl mx-auto">
      <div className="relative mb-12">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          autoFocus
          className="w-full text-3xl md:text-5xl font-bold bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-4 focus:border-primary outline-none dark:text-white placeholder-gray-300 dark:placeholder-gray-700 transition-colors"
        />
        <SearchIcon className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400" size={32} />
      </div>

      <div className="space-y-4">
        {query && (
          <p className="text-gray-500 mb-8">
            {results.length > 0 ? `${t.found} ${results.length} results` : t.noResults}
          </p>
        )}

        {results.map((blog) => (
           <motion.div 
             key={blog.id}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
           >
             <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
               <span className="flex items-center"><Calendar size={12} className="mr-1"/> {blog.date}</span>
               <div className="flex space-x-1">
                 {blog.tags.map(tag => (
                   <span key={tag} className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">#{tag}</span>
                 ))}
               </div>
             </div>
             <Link to={`/blog/${blog.id}`} className="block group">
               <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-primary transition-colors">
                 {blog.title[language]}
               </h3>
             </Link>
             <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm mb-4">
                {blog.content.find(c => c.type === 'text')?.value}
             </p>
             <Link to={`/blog/${blog.id}`} className="text-sm font-semibold text-primary flex items-center hover:underline">
               {tBlog.readMore || 'Read more'} <ArrowRight size={14} className="ml-1" />
             </Link>
           </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Search;