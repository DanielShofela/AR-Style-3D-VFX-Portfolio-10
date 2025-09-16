
import React from 'react';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    return (
        <a 
            href={href} 
            onClick={handleClick}
            className="px-4 py-2 text-sm text-cyan-300 transition-all duration-300 rounded-md cursor-pointer hover:bg-cyan-500/10 hover:text-cyan-100"
            style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.5)' }}
        >
            {children}
        </a>
    );
};

const Header: React.FC = () => {
    return (
        <header className="absolute top-0 left-0 right-0 z-20 p-4">
            <div className="container flex items-center justify-between max-w-6xl mx-auto">
                 <div className="text-xl font-bold tracking-widest text-white uppercase" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.7)' }}>
                    Portfolio
                </div>
                <nav className="hidden md:flex items-center p-2 border border-cyan-500/20 rounded-lg bg-black/20 backdrop-blur-sm">
                    <NavLink href="#portfolio">Projets</NavLink>
                    <NavLink href="#about">À propos</NavLink>
                    <NavLink href="#contact">Contact</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
