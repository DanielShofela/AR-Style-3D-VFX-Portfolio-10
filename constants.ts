
import { Project } from './types';

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Projet Chimère",
    category: "VFX en temps réel",
    description: "Développement d'une suite de shaders personnalisés pour un système météorologique dynamique dans Unreal Engine 5. Implémentation de matériaux PBR pour un rendu d'assets hyperréaliste et optimisation des effets de particules pour des visuels haute performance dans un environnement de science-fiction.",
    imageUrl: "https://picsum.photos/seed/chimera/600/400",
    tags: ["Unreal Engine 5", "HLSL", "Niagara", "PBR"],
  },
  {
    id: 2,
    title: "Neuro-Scanner",
    category: "Modélisation Hard-Surface",
    description: "Modélisation, texturage et éclairage d'un appareil médical de science-fiction high-poly. L'accent a été mis sur la création de composants hard-surface détaillés et fonctionnels et de matériaux émissifs pour obtenir une esthétique futuriste de réalité augmentée.",
    imageUrl: "https://picsum.photos/seed/neuro/600/400",
    tags: ["Blender", "Substance Painter", "Marmoset Toolbag"],
  },
  {
    id: 3,
    title: "Conduit à Plasma",
    category: "Animation Procédurale",
    description: "Création d'un effet de conduit d'énergie entièrement procédural dans Houdini. Le système permet des flux de plasma, des arcs électriques et une distorsion thermique dirigeables artistiquement, rendus et composites pour une séquence cinématique.",
    imageUrl: "https://picsum.photos/seed/plasma/600/400",
    tags: ["Houdini", "VEX", "Redshift", "Nuke"],
  },
   {
    id: 4,
    title: "Habitat Orbital",
    category: "Conception d'Environnement",
    description: "Conception et construction d'un environnement d'habitat orbital à grande échelle. Responsable de l'agencement, de la modélisation des composants modulaires, de la création de textures et des passes d'éclairage finales pour créer une station spatiale immersive et habitée.",
    imageUrl: "https://picsum.photos/seed/orbital/600/400",
    tags: ["Maya", "ZBrush", "Substance Designer", "UE5"],
  },
  {
    id: 5,
    title: "Golem MK. IV",
    category: "FX Personnage/Créature",
    description: "Rigging et simulation d'un golem de pierre, créant des effets de destruction dynamiques pour ses mouvements. Développement d'un outil personnalisé pour attacher et briser de manière procédurale des plaques de roche, améliorant le sentiment de poids et de puissance.",
    imageUrl: "https://picsum.photos/seed/golem/600/400",
    tags: ["Houdini", "Vellum", "Python", "Arnold"],
  },
  {
    id: 6,
    title: "Interface RA",
    category: "Motion Graphics UI/UX",
    description: "Conception et animation d'une série d'éléments d'interface et de HUD futuristes pour un concept d'application en réalité augmentée. L'accent a été mis sur la création de motion graphics intuitifs et visuellement attrayants qui communiquent efficacement des informations complexes.",
    imageUrl: "https://picsum.photos/seed/arui/600/400",
    tags: ["After Effects", "Figma", "Cinema 4D"],
  },
];
