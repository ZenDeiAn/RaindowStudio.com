import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Tag, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../App';
import { BLOGS, TRANSLATIONS } from '../constants';
import { BlogPost } from '../types';

// Alert Component
const AlertModal = ({ message, onClose }: { message: string, onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-xl font-bold mb-6 dark:text-white uppercase">{message}</h3>
      <button 
        onClick={onClose}
        className="px-8 py-2 bg-black dark:bg-white text-white dark:text-black font-bold uppercase hover:opacity-80 transition"
      >
        Close
      </button>
    </motion.div>
  </div>
);

const BlogList: React.FC = () => {
  const { language } = useApp();
  const t = TRANSLATIONS[language].blog;
  
  // Create a reversed copy of blogs for display
  const displayBlogs = [...BLOGS].reverse();

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 border-b-4 border-black dark:border-white pb-6"
      >
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter dark:text-white leading-none mb-2">
          Blog
        </h1>
        <div className="flex justify-between items-end">
          <p className="font-serif italic text-xl text-gray-600 dark:text-gray-400">
            Stories & Insights
          </p>
          <span className="font-mono text-sm font-bold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-2 py-1">
            Vol. 1
          </span>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 gap-16"
      >
        {displayBlogs.map((blog, index) => (
          <article key={blog.id} className="group grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-200 dark:border-gray-800 pb-12">
            
            {/* Meta Column */}
            <div className="md:col-span-3 md:border-l-2 border-transparent group-hover:border-primary pl-0 md:pl-6 transition-all duration-300">
              <div className="font-mono text-sm text-gray-500 mb-4">{blog.date}</div>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 px-2 py-1 text-gray-600 dark:text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-9">
              <Link to={`/blog/${blog.id}`} className="block">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-gray-100 group-hover:text-primary transition-colors uppercase leading-none tracking-tight">
                  {blog.title[language]}
                </h2>
              </Link>
              <p className="font-serif text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed line-clamp-2">
                {blog.content.find(c => c.type === 'text')?.value}
              </p>
              <Link 
                to={`/blog/${blog.id}`} 
                className="inline-block text-sm font-bold uppercase tracking-widest border-b-2 border-black dark:border-white pb-1 hover:text-primary hover:border-primary transition-colors dark:text-white"
              >
                {t.readMore}
              </Link>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  );
};

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useApp();
  const t = TRANSLATIONS[language].blog;
  const [alertMsg, setAlertMsg] = React.useState<string | null>(null);

  const currentIndex = BLOGS.findIndex(b => b.id === id);
  const blog = BLOGS[currentIndex];

  const handleNav = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < BLOGS.length) {
      navigate(`/blog/${BLOGS[newIndex].id}`);
      window.scrollTo(0, 0);
    } else {
      setAlertMsg(t.noMore);
    }
  };

  if (!blog) return <div className="pt-32 text-center">Not Found</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto font-sans">
      {alertMsg && <AlertModal message={alertMsg} onClose={() => setAlertMsg(null)} />}
      
      <Link to="/blog" className="inline-flex items-center text-sm font-bold uppercase tracking-widest mb-12 hover:text-primary transition-colors dark:text-gray-400">
        <ArrowLeft size={16} className="mr-2" /> {t.backToList}
      </Link>

      <motion.article 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-16 border-b-2 border-black dark:border-white pb-12">
          <div className="flex flex-wrap gap-4 mb-6">
            {blog.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 dark:text-white leading-none uppercase tracking-tighter">
            {blog.title[language]}
          </h1>
          <div className="flex items-center text-sm font-mono text-gray-500">
             <span className="mr-4 uppercase tracking-widest">{t.postedOn}</span>
             <span>{blog.date}</span>
          </div>
        </header>

        <div className="prose prose-xl dark:prose-invert max-w-none mb-20">
          {blog.content.map((block, idx) => {
            if (block.type === 'image') {
              const ImageContent = (
                <div className="border-4 border-black dark:border-white p-2 bg-white dark:bg-gray-800 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                   <img src={block.value} alt={block.caption} className="w-full h-auto" />
                </div>
              );

              return (
                <figure key={idx} className="my-12">
                  {block.url ? (
                    <a href={block.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer block hover:opacity-90 transition-opacity">
                      {ImageContent}
                    </a>
                  ) : (
                    ImageContent
                  )}
                  {block.caption && <figcaption className="text-center font-mono text-xs text-gray-500 mt-4 uppercase tracking-widest">{block.caption}</figcaption>}
                </figure>
              );
            }
            return <p key={idx} className="mb-6 font-serif text-gray-800 dark:text-gray-200 leading-loose whitespace-pre-wrap break-words">{block.value}</p>;
          })}
        </div>

        <div className="flex justify-between border-t-4 border-black dark:border-white pt-8">
          <button 
            onClick={() => handleNav('prev')}
            className="flex items-center text-xl font-bold uppercase tracking-widest hover:text-primary transition-colors dark:text-white group"
          >
            <ArrowLeft size={24} className="mr-4 group-hover:-translate-x-2 transition-transform" /> {t.prev}
          </button>
          <button 
            onClick={() => handleNav('next')}
            className="flex items-center text-xl font-bold uppercase tracking-widest hover:text-primary transition-colors dark:text-white group"
          >
            {t.next} <ArrowRight size={24} className="ml-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </motion.article>
    </div>
  );
};

export const Blog: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  return id ? <BlogDetail /> : <BlogList />;
};

export default Blog;