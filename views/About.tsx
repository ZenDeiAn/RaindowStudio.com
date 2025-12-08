import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../App';
import { TRANSLATIONS, SKILLS_LIST } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const Badge = ({ src, alt }: { src: string; alt: string }) => (
  <motion.img
    whileHover={{ scale: 1.1, y: -2 }}
    src={src}
    alt={alt}
    className="h-6 md:h-7 shadow-sm cursor-pointer"
  />
);

const About: React.FC = () => {
  const { language } = useApp();
  const t = TRANSLATIONS[language].about;
  const skills = SKILLS_LIST[language];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Magazine Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 border-b-4 border-black dark:border-white pb-6"
      >
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter dark:text-white leading-none mb-2">
          {t.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-end">
          <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 italic">
            {t.subtitle}
          </p>
          <span className="text-sm font-bold tracking-widest uppercase mt-4 md:mt-0 bg-primary text-white px-2 py-1">
            EST. 2023
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Profile & Intro */}
        <div className="lg:col-span-5 space-y-8">
           <motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="relative"
           >
             <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
               {/* Placeholder for Profile Image */}
               <img 
                 src="/resources/Profile.jpg" 
                 alt="Profile" 
                 className="w-full h-full object-cover"
               />
             </div>
             <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-6 border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
               <h3 className="text-2xl font-bold uppercase dark:text-white">Raindow</h3>
               <p className="text-primary font-mono text-sm">{t.role}</p>
             </div>
           </motion.div>

           <div className="pt-12">
             <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-serif">
               {t.intro}
             </p>
           </div>
        </div>

        {/* Right Column: Tech & Skills */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Tech Stack Badges */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold uppercase mb-6 flex items-center dark:text-white">
              <span className="w-8 h-1 bg-primary mr-4"></span>
              {t.techStack}
            </h2>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl border border-gray-100 dark:border-gray-700">
              <div className="flex flex-wrap gap-3 items-center mb-6">
                 <Badge src="https://img.shields.io/badge/JetBrains-Rider-red?logo=rider" alt="JetBrains Rider" />
                 <Badge src="https://img.shields.io/badge/VisualStudio-Code-blue" alt="VS Code" />
                 <Badge src="https://img.shields.io/badge/VisualStudio-2022-purple" alt="VS 2022" />
                 <Badge src="https://img.shields.io/badge/Unity-gray?logo=unity" alt="Unity" />
                 <Badge src="https://img.shields.io/badge/Photoshop-gray?logo=adobephotoshop" alt="Photoshop" />
                 <Badge src="https://img.shields.io/badge/C%23-white?logo=sharp&logoColor=gray" alt="C#" />
                 <Badge src="https://img.shields.io/badge/C%2B%2B-white?logo=cplusplus&logoColor=gray" alt="C++" />
                 <Badge src="https://img.shields.io/badge/Photon-white?logo=photon&logoColor=gray" alt="Photon" />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">{t.learning}</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge src="https://img.shields.io/badge/Lua-gray?logo=lua" alt="Lua" />
                <Badge src="https://img.shields.io/badge/DirectX-black" alt="DirectX" />
                <Badge src="https://img.shields.io/badge/ShaderLab-gray" alt="ShaderLab" />
                <Badge src="https://img.shields.io/badge/Unreal_5-gray?logo=unrealengine" alt="Unreal 5" />
                <Badge src="https://img.shields.io/badge/GoDot-gray?logo=godotengine&logoColor=blue" alt="Godot" />
                <Badge src="https://img.shields.io/badge/Blender-gray?logo=blender" alt="Blender" />
                <Badge src="https://img.shields.io/badge/Html-white?logo=html5&logoColor=gray" alt="HTML" />
                <Badge src="https://img.shields.io/badge/CSS-white?logo=css3&logoColor=gray" alt="CSS" />
                <Badge src="https://img.shields.io/badge/JavaScript-white?logo=javascript&logoColor=gray" alt="JS" />
              </div>
            </div>
          </motion.section>

          {/* Core Competencies List */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
             <h2 className="text-3xl font-bold uppercase mb-6 flex items-center dark:text-white">
              <span className="w-8 h-1 bg-secondary mr-4"></span>
              {t.skillsTitle}
            </h2>

            <div className="grid gap-4">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 10, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                  className="group flex items-center p-4 border-l-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300 bg-white dark:bg-gray-800/30"
                >
                  <CheckCircle2 className="text-gray-300 group-hover:text-primary mr-4 transition-colors" size={20} />
                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
};

export default About;