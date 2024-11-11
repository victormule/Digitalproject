// src/class/PNJRegardantJoueur.js

import { PNJ } from './PNJ.js';

export class PNJRegardantJoueur extends PNJ {
    constructor(x, y, sprites, carte) {
      super(x, y, sprites, carte, false); // Ce PNJ ne peut pas bouger
    }
  
    // Méthode pour déplacer le PNJ (mise à jour de la direction)
    deplacer(grille, personnages) {
      if (this.carte === carteActuelle) {
        this.mettreAJourDirectionVersJoueur(); // Mettre à jour la direction vers le joueur
      }
      super.deplacer(grille, personnages);
    }
}