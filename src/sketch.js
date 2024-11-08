// src/sketch.js

import { CONFIG } from './config.js';
import { GestionnaireRessources } from './classes/GestionnaireRessources.js';
import { preload } from './preload.js';
import { setup } from './utils/setup.js';
import { mettreAJourJeu } from './utils/gameLoop.js';
import { rendreJeu } from './utils/draw.js';
import { setupGUI } from './GUI.js';
import p5 from 'p5';

new p5((sketch) => {
  // Variables globales
  let assetsLoaded = false;
  let gestionnaireRessources = new GestionnaireRessources(sketch);

  sketch.preload = () => {
    preload(sketch);
  };

  sketch.setup = () => {
    setup(sketch);
    assetsLoaded = true;
  };

  sketch.draw = () => {
    if (!assetsLoaded) {
      // Afficher un écran de chargement
      sketch.background(255);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textSize(24);
      sketch.text('Chargement...', sketch.width / 2, sketch.height / 2);
      return;
    }

    // Mettre à jour et rendre le jeu
    mettreAJourJeu(sketch);
    rendreJeu(sketch);
  };
});
