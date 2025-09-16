
import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioCardProps {
  project: Project;
  onClick: () => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onClick }) => {
  return (
    <div 
        onClick={onClick}
        className="group relative overflow-hidden rounded-lg border border-cyan-500/20 bg-black/30 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer"
    >
        <img 
            src={project.imageUrl} 
            alt={project.title}
            className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <p className="text-sm text-purple-300">{project.category}</p>
        </div>
        <div className="absolute top-4 right-4 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="text-cyan-300" size={20} />
        </div>
    </div>
  );
};

export default PortfolioCard;
