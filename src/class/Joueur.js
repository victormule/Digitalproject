// src/class/Joueur.js

import { Personnage } from './Personnage.js';
import { CONFIG, DIRECTION } from '../config.js';

export class Joueur extends Personnage {
    constructor(x, y, sprites, sketch) {
        super(x, y, sprites, sketch); // Appeler le constructeur de la classe parent
    }
    
    // Méthode pour déplacer le joueur
    deplacer(grille, personnages) {
        this.gererEntree(grille, personnages); // Gérer les entrées clavier
        super.deplacer(grille, personnages);   // Appeler la méthode deplacer() du parent
    }
    
    // Méthode pour gérer les entrées clavier du joueur
    gererEntree(grille, personnages) {
        if (this.enMouvement) {
            return; // Ne pas traiter les entrées si le joueur est déjà en mouvement
        }
    
        let grilleX = Math.floor((this.x + this.largeur / 2) / CONFIG.TAILLE_TUILE);
        let grilleY = Math.floor((this.y + this.hauteur) / CONFIG.TAILLE_TUILE);
    
        // Mappings des touches directionnelles
        const mappingsEntree = [
            { touche: this.sketch.LEFT_ARROW, direction: DIRECTION.GAUCHE, dx: -1, dy: 0 },
            { touche: this.sketch.RIGHT_ARROW, direction: DIRECTION.DROITE, dx: 1, dy: 0 },
            { touche: this.sketch.UP_ARROW, direction: DIRECTION.HAUT, dx: 0, dy: -1 },
            { touche: this.sketch.DOWN_ARROW, direction: DIRECTION.BAS, dx: 0, dy: 1 }
        ];
    
        // Réinitialiser le compteur de maintien si aucune touche n'est pressée
        if (!mappingsEntree.some(mapping => this.sketch.keyIsDown(mapping.touche))) {
            this.holdCounter = 0;
        }
    
        // Parcourir les mappings pour vérifier les touches pressées
        for (let mapping of mappingsEntree) {
            if (this.sketch.keyIsDown(mapping.touche)) {
                this.direction = mapping.direction; // Mettre à jour la direction du joueur
                this.holdCounter++;
                if (
                    this.holdCounter > this.holdTime &&
                    this.estPassable(grille, grilleX + mapping.dx, grilleY + mapping.dy, personnages)
                ) {
                    // Mettre à jour la cible du joueur
                    this.cibleX = this.x + mapping.dx * CONFIG.TAILLE_TUILE;
                    this.cibleY = this.y + mapping.dy * CONFIG.TAILLE_TUILE;
                    this.demarrerMouvement();
                }
                break; // Empêcher les multiples directions à la fois
            }
        }
    }
    
    // Méthode pour démarrer le mouvement du joueur
    demarrerMouvement() {
        this.stepIndex = (this.stepIndex + 1) % 2;
        this.frameAnimation = 0;
        this.animationCounter = 0;
        this.enMouvement = true;
    }
}