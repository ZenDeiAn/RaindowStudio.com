
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Trash2, Check, ArrowLeft, Clock, ListTodo, PenLine, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../App';
import { TRANSLATIONS } from '../constants';

type WidgetType = 'list' | 'pomodoro' | 'todo' | 'notepad';

const Widgets: React.FC = () => {
  const { language } = useApp();
  // @ts-ignore
  const t = TRANSLATIONS[language].widgets;
  const [activeWidget, setActiveWidget] = useState<WidgetType>('list');

  const renderWidget = () => {
    switch (activeWidget) {
      case 'pomodoro': return <PomodoroWidget t={t} onBack={() => setActiveWidget('list')} />;
      case 'todo': return <TodoWidget t={t} onBack={() => setActiveWidget('list')} />;
      case 'notepad': return <NotepadWidget t={t} onBack={() => setActiveWidget('list')} />;
      default: return (
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center border-b-2 border-black dark:border-white pb-8"
          >
             <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter dark:text-white mb-4">
               {t.title}
             </h1>
             <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-gray-500">
               <span>Randow Studio</span>
               <span>{t.edition}</span>
               <span>Vol. 1</span>
             </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <NewsCard 
              title={t.pomodoro}
              description="Boost productivity with the classic technique."
              icon={<Clock size={48} className="text-primary mb-4" />}
              onClick={() => setActiveWidget('pomodoro')}
              delay={0.1}
            />

            <NewsCard 
              title={t.todo}
              description="Stay organized and track your daily tasks."
              icon={<ListTodo size={48} className="text-secondary mb-4" />}
              onClick={() => setActiveWidget('todo')}
              delay={0.2}
            />

            <NewsCard 
              title={t.notepad}
              description="Capture your thoughts and ideas instantly."
              icon={<PenLine size={48} className="text-pink-500 mb-4" />}
              onClick={() => setActiveWidget('notepad')}
              delay={0.3}
            />

          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      {renderWidget()}
    </div>
  );
};

// Component for the "News Card"
const NewsCard = ({ title, description, icon, onClick, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-100 p-8 cursor-pointer group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all"
    onClick={onClick}
  >
    <div className="mb-6">{icon}</div>
    <h2 className="text-3xl font-bold mb-4 dark:text-white group-hover:text-primary transition-colors uppercase leading-none">{title}</h2>
    <p className="text-gray-600 dark:text-gray-300 font-serif text-lg leading-relaxed mb-6">{description}</p>
    <div className="flex items-center text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
      Launch Tool <ChevronRight size={16} className="ml-1" />
    </div>
  </motion.div>
);

// Layout wrapper for individual tools
const ToolLayout = ({ title, children, onBack }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-8 md:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] relative"
  >
    <button 
      onClick={onBack}
      className="absolute top-8 right-8 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
    >
      <ArrowLeft size={32} />
    </button>
    
    <div className="mb-12 border-b-4 border-black dark:border-white pb-6">
      <h2 className="text-5xl md:text-7xl font-black uppercase dark:text-white mb-2">{title}</h2>
      <p className="font-mono text-gray-500 uppercase tracking-widest">Utility Application</p>
    </div>
    
    {children}
  </motion.div>
);

const PomodoroWidget = ({ t, onBack }: { t: any, onBack: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };
  const switchMode = (m: 'work' | 'break') => {
    setMode(m);
    setIsActive(false);
    setTimeLeft(m === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ToolLayout title={t.pomodoro} onBack={onBack}>
      <div className="flex flex-col items-center">
        <div className="flex justify-center space-x-4 mb-12 w-full">
          <button 
            onClick={() => switchMode('work')}
            className={`flex-1 py-4 border-2 border-black dark:border-white font-bold uppercase tracking-widest transition-all ${mode === 'work' ? 'bg-primary text-white' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            {t.work}
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`flex-1 py-4 border-2 border-black dark:border-white font-bold uppercase tracking-widest transition-all ${mode === 'break' ? 'bg-green-500 text-white' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            {t.break}
          </button>
        </div>
        
        <div className="text-[8rem] md:text-[12rem] font-black leading-none mb-12 dark:text-white tabular-nums tracking-tighter">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex justify-center space-x-8">
          <button onClick={toggleTimer} className="p-6 rounded-full border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
            {isActive ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button onClick={resetTimer} className="p-6 rounded-full border-4 border-black dark:border-white text-gray-500 hover:text-black dark:hover:text-white transition-all">
            <RotateCcw size={32} />
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

const TodoWidget = ({ t, onBack }: { t: any, onBack: () => void }) => {
  const [tasks, setTasks] = useState<{id: number, text: string, done: boolean}[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <ToolLayout title={t.todo} onBack={onBack}>
      <div className="flex mb-8 border-b-2 border-black dark:border-white pb-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder={t.placeholder}
          className="flex-1 px-4 py-4 bg-transparent text-xl font-serif outline-none dark:text-white placeholder-gray-400"
        />
        <button onClick={addTask} className="text-secondary hover:scale-110 transition-transform px-4">
          <Plus size={32} />
        </button>
      </div>
      
      <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-4 border-2 border-gray-100 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors group bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-4 overflow-hidden">
              <button 
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 border-2 border-black dark:border-white flex items-center justify-center transition ${task.done ? 'bg-black dark:bg-white text-white dark:text-black' : ''}`}
              >
                {task.done && <Check size={14} />}
              </button>
              <span className={`text-xl truncate dark:text-gray-200 font-serif ${task.done ? 'line-through text-gray-400' : ''}`}>
                {task.text}
              </span>
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
           <p className="text-center text-gray-400 italic mt-12">No tasks yet. Add one above.</p>
        )}
      </div>
    </ToolLayout>
  );
};

const NotepadWidget = ({ t, onBack }: { t: any, onBack: () => void }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const savedNote = localStorage.getItem('rs_notepad');
    if (savedNote) setNote(savedNote);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
    localStorage.setItem('rs_notepad', e.target.value);
  };

  return (
    <ToolLayout title={t.notepad} onBack={onBack}>
      <div className="bg-yellow-50 dark:bg-gray-700/50 p-6 border-2 border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] h-[500px]">
         <textarea 
            value={note}
            onChange={handleChange}
            placeholder={t.notePlaceholder}
            className="w-full h-full bg-transparent resize-none outline-none dark:text-white text-lg leading-relaxed font-mono"
          />
      </div>
    </ToolLayout>
  );
};

export default Widgets;
