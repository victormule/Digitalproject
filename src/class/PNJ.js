// src/class/PNJ.js

import { Personnage } from './Personnage.js';
import { CONFIG, DIRECTION } from '../config.js';

export class PNJ extends Personnage {
    /**
     * Constructeur de la classe PNJ
     * @param {number} x - Position X initiale du PNJ
     * @param {number} y - Position Y initiale du PNJ
     * @param {object} sprites - Sprites du PNJ
     * @param {Carte} carte - Carte sur laquelle le PNJ se trouve
     * @param {boolean} [peutBouger=true] - Indique si le PNJ peut bouger
     * @param {number} [vitessePatrouille=CONFIG.VITESSE_JOUEUR] - Vitesse de patrouille du PNJ
     * @param {number} [frequencePatrouille=0.02] - Fréquence de patrouille du PNJ (probabilité de bouger)
     * @param {P5} sketch - Instance de P5.js
     */
    constructor(x, y, sprites, carte, peutBouger = true, vitessePatrouille = CONFIG.VITESSE_JOUEUR, frequencePatrouille = 0.02, sketch) {
      super(x, y, sprites);
      this.carte = carte; // Carte sur laquelle le PNJ se trouve
      this.peutBouger = peutBouger; // Indique si le PNJ peut bouger ou non
      this.vitesse = vitessePatrouille; // Vitesse de déplacement du PNJ
      this.frequencePatrouille = frequencePatrouille; // Fréquence de patrouille du PNJ
      // Stocker la position initiale
      this.xInitial = x;
      this.yInitial = y;
      if (!this.peutBouger) {
        this.direction = DIRECTION.BAS; // Si le PNJ est immobile, il regarde vers le bas par défaut
      }
        this.sketch = sketch;
    }
  
    // Méthode pour déplacer le PNJ
    deplacer(grille, personnages) {
      if (this.carte === carteActuelle) {
        if (!this.enMouvement) {
          if (this.estProcheDuJoueur()) {
            // Le joueur est proche, arrêter l'activité et se tourner vers le joueur
            this.enMouvement = false; // S'assurer que le PNJ est arrêté
            this.cibleX = this.x;     // Fixer la position cible à la position actuelle
            this.cibleY = this.y;
            this.mettreAJourDirectionVersJoueur(); // Se tourner vers le joueur
          } else {
            // Le joueur n'est pas proche, reprendre l'activité normale
            if (this.peutBouger) {
              this.patrouiller(grille, personnages);
            }
          }
        }
        super.deplacer(grille, personnages);
      }
    }
  
    // Méthode pour vérifier si le joueur est proche
    estProcheDuJoueur() {
      // Obtenir les positions sur la grille
      let pnjGrilleX = Math.floor((this.x + this.largeur / 2) / CONFIG.TAILLE_TUILE);
      let pnjGrilleY = Math.floor((this.y + this.hauteur) / CONFIG.TAILLE_TUILE);
  
      let joueurGrilleX = Math.floor((joueur.x + joueur.largeur / 2) / CONFIG.TAILLE_TUILE);
      let joueurGrilleY = Math.floor((joueur.y + joueur.hauteur) / CONFIG.TAILLE_TUILE);
  
      // Calculer la distance de Manhattan
      let distance = Math.abs(pnjGrilleX - joueurGrilleX) + Math.abs(pnjGrilleY - joueurGrilleY);
  
      // Retourner vrai si la distance est 1 (à une case de distance)
      return distance === 1;
    }
  
    // Méthode pour ajuster la direction du PNJ pour qu'il regarde le joueur
    mettreAJourDirectionVersJoueur() {
      let deltaX = joueur.x - this.x;
      let deltaY = joueur.y - this.y;
  
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Le joueur est plus à gauche ou à droite
        if (deltaX > 0) {
          this.direction = DIRECTION.DROITE;
        } else {
          this.direction = DIRECTION.GAUCHE;
        }
      } else {
        // Le joueur est plus en haut ou en bas
        if (deltaY > 0) {
          this.direction = DIRECTION.BAS;
        } else {
          this.direction = DIRECTION.HAUT;
        }
      }
    }
  
    // Méthode pour gérer la patrouille du PNJ
    patrouiller(grille, personnages) {
      if (this.enMouvement) {
        return; // Ne pas initier une nouvelle patrouille si le PNJ est déjà en mouvement
      }
    
      // Utiliser la fréquence de patrouille spécifique du PNJ
      if (this.sketch.random(1) < this.frequencePatrouille) {
        const directions = [
          { direction: DIRECTION.BAS, dx: 0, dy: 1 },
          { direction: DIRECTION.GAUCHE, dx: -1, dy: 0 },
          { direction: DIRECTION.DROITE, dx: 1, dy: 0 },
          { direction: DIRECTION.HAUT, dx: 0, dy: -1 }
        ];
    
        // Choisir une direction aléatoire
        const directionAleatoire = this.sketch.random(directions);
        this.direction = directionAleatoire.direction;
    
        let grilleX = Math.floor((this.x + this.largeur / 2) / CONFIG.TAILLE_TUILE);
        let grilleY = Math.floor((this.y + this.hauteur) / CONFIG.TAILLE_TUILE);
    
        // Vérifier si la case est passable
        if (this.estPassable(grille, grilleX + directionAleatoire.dx, grilleY + directionAleatoire.dy, personnages)) {
          // Mettre à jour la cible du PNJ
          this.cibleX = this.x + directionAleatoire.dx * CONFIG.TAILLE_TUILE;
          this.cibleY = this.y + directionAleatoire.dy * CONFIG.TAILLE_TUILE;
          this.demarrerMouvement();
        }
      }
    }
  
    // Méthode pour démarrer le mouvement du PNJ
    demarrerMouvement() {
      this.stepIndex = (this.stepIndex + 1) % 2;
      this.frameAnimation = 0;
      this.animationCounter = 0;
      this.enMouvement = true;
    }
}