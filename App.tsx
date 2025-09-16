
import React, { useState } from 'react';
import CanvasContainer from './components/CanvasContainer';
import Header from './components/Header';
import PortfolioCard from './components/PortfolioCard';
import { PORTFOLIO_PROJECTS } from './constants';
import { Project } from './types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';


const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PORTFOLIO_PROJECTS.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;
    setSelectedProject(PORTFOLIO_PROJECTS[nextIndex]);
  };
  
  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = PORTFOLIO_PROJECTS.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length;
    setSelectedProject(PORTFOLIO_PROJECTS[prevIndex]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#000010] text-gray-100">
      <CanvasContainer />
      
      <main className="absolute inset-0 z-10 flex flex-col items-center w-full h-full p-4 overflow-y-auto md:p-8">
        <Header />
        
        <div className="container mx-auto mt-24 text-center">
          <h1 className="text-4xl font-bold tracking-wider text-cyan-300 md:text-6xl" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.7)' }}>
            JEANNE DOE
          </h1>
          <p className="mt-2 text-lg text-purple-300 md:text-2xl">GÉNÉRALISTE 3D & VFX</p>
        </div>

        <section id="portfolio" className="container w-full max-w-6xl p-4 mx-auto mt-12">
            <h2 className="mb-8 text-3xl font-semibold text-center text-gray-200 uppercase tracking-widest">Projets</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {PORTFOLIO_PROJECTS.map((project) => (
                    <PortfolioCard key={project.id} project={project} onClick={() => handleProjectClick(project)} />
                ))}
            </div>
        </section>

        <section id="about" className="container w-full max-w-4xl p-4 mx-auto mt-16 text-center">
            <h2 className="mb-8 text-3xl font-semibold text-center text-gray-200 uppercase tracking-widest">À propos de moi</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
                Je suis une Généraliste 3D & VFX passionnée avec plus de 8 ans d'expérience dans la création de visuels de haute qualité pour le cinéma, les jeux vidéo et les expériences immersives. Mon expertise réside dans les VFX en temps réel, la modélisation hard-surface et la génération de contenu procédural. J'aime repousser les limites de la technologie et de l'art pour créer des mondes numériques captivants et inoubliables. Je maîtrise une large gamme de logiciels standards de l'industrie, notamment Unreal Engine, Houdini, Blender et la suite Substance.
            </p>
        </section>

        <section id="contact" className="container w-full max-w-4xl p-4 mx-auto mt-16 mb-16 text-center">
            <h2 className="mb-8 text-3xl font-semibold text-center text-gray-200 uppercase tracking-widest">Contactez-moi</h2>
            <p className="mb-8 text-lg text-gray-300">
                Vous avez un projet en tête ou souhaitez collaborer ? J'adorerais en discuter avec vous.
            </p>
            <a 
                href="mailto:jane.doe.vfx@example.com"
                className="inline-block px-8 py-3 text-lg font-semibold transition-all duration-300 border-2 rounded-lg border-cyan-400 text-cyan-300 hover:bg-cyan-400/20 hover:text-white"
                style={{ textShadow: '0 0 8px rgba(0, 255, 255, 0.5)' }}
            >
                Me contacter
            </a>
        </section>

      </main>
      
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-lg">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d1f] border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/20 flex flex-col md:flex-row">
            <button onClick={handleCloseModal} className="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors rounded-full -top-3 -right-3 bg-slate-800 hover:bg-red-500 text-slate-100">
              <X size={20} />
            </button>
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img src={selectedProject.imageUrl} alt={selectedProject.title} className="object-cover w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
            </div>
            <div className="flex flex-col flex-1 p-6 overflow-y-auto">
              <h3 className="mb-2 text-3xl font-bold text-cyan-300" style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.5)' }}>{selectedProject.title}</h3>
              <p className="mb-4 text-sm text-purple-300 uppercase">{selectedProject.category}</p>
              <p className="flex-1 text-gray-300">{selectedProject.description}</p>
               <div className="flex flex-wrap gap-2 mt-4">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs rounded bg-cyan-900/50 text-cyan-300">{tag}</span>
                ))}
              </div>
            </div>
            <button onClick={handlePrevProject} className="absolute left-0 w-10 h-10 transition-transform transform -translate-y-1/2 rounded-full top-1/2 -translate-x-12 bg-slate-800/50 hover:bg-slate-700/80 hover:scale-110 flex items-center justify-center text-slate-100">
                <ChevronLeft size={24} />
            </button>
            <button onClick={handleNextProject} className="absolute right-0 w-10 h-10 transition-transform transform -translate-y-1/2 rounded-full top-1/2 translate-x-12 bg-slate-800/50 hover:bg-slate-700/80 hover:scale-110 flex items-center justify-center text-slate-100">
                <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
