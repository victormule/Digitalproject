// src/class/Personnage.js

import { CONFIG, DIRECTION } from '../config.js';

export class Personnage {
    // Constructeur de la classe Personnage
    constructor(x, y, sprites, sketch) {
        this.x = x;                       // Position X du personnage
        this.y = y;                       // Position Y du personnage
        this.cibleX = x;                  // Position X cible lors du déplacement
        this.cibleY = y;                  // Position Y cible lors du déplacement
        this.vitesse = CONFIG.VITESSE_JOUEUR;   // Vitesse de déplacement
        this.direction = DIRECTION.BAS;   // Direction actuelle du personnage
        this.enMouvement = false;         // Indique si le personnage est en mouvement
        this.frameAnimation = 0;          // Compteur pour l'animation
        this.animationCounter = 0;        // Compteur pour la vitesse d'animation
        this.animationSpeed = CONFIG.VITESSE_ANIMATION; // Vitesse d'animation
        this.sprites = sprites;           // Sprites du personnage
        this.largeur = CONFIG.TAILLE_TUILE; // Largeur du personnage (en pixels)
        this.hauteur = CONFIG.TAILLE_TUILE; // Hauteur du personnage (en pixels)
        this.holdTime = CONFIG.HOLD_TIME; // Temps avant de considérer un mouvement
        this.holdCounter = 0;             // Compteur pour le temps de maintien de la touche
        this.stepIndex = 0;               // Indice pour l'animation de marche
        this.sketch = sketch;             // Instance de P5.js
    }
        
          // Méthode pour déplacer le personnage
    deplacer(grille, personnages) {
        // Vérifier si le personnage doit se déplacer vers une cible
        if (this.x !== this.cibleX || this.y !== this.cibleY) {
            let deltaX = this.cibleX - this.x;
            let deltaY = this.cibleY - this.y;
            let distance = this.sketch.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance > this.vitesse) {
            // Déplacer le personnage vers la cible
            this.x += (deltaX / distance) * this.vitesse;
            this.y += (deltaY / distance) * this.vitesse;
            this.enMouvement = true;
            } else {
            // Arrêter le personnage une fois la cible atteinte
            this.x = this.cibleX;
            this.y = this.cibleY;
            this.enMouvement = false;
            }
        } else {
            this.enMouvement = false;
        }

        // Mettre à jour l'animation
        this.animer();
    }
        
    // Méthode pour gérer l'animation du personnage
    animer() {
        if (this.enMouvement) {
            this.animationCounter++;
            if (this.animationCounter >= this.animationSpeed) {
            this.animationCounter = 0;
            this.frameAnimation = (this.frameAnimation + 1) % 2;
            }
        } else {
            this.frameAnimation = 0;
            this.animationCounter = 0;
        }
    }
        
    // Méthode pour afficher le personnage à l'écran
    afficher() {
        let frameIndex = this.stepIndex * 2 + this.frameAnimation;

        let spriteActuel;
        switch (this.direction) {
            case DIRECTION.BAS:
            spriteActuel = this.sprites.marcheDown[frameIndex];
            break;
            case DIRECTION.GAUCHE:
            spriteActuel = this.sprites.marcheLeft[frameIndex];
            break;
            case DIRECTION.DROITE:
            spriteActuel = this.sprites.marcheRight[frameIndex];
            break;
            case DIRECTION.HAUT:
            spriteActuel = this.sprites.marcheUp[frameIndex];
            break;
            default:
            spriteActuel = null;
        }

        if (spriteActuel) {
            this.sketch.image(spriteActuel, this.x, this.y);
        } else {
            console.error(`spriteActuel est undefined pour direction: ${this.direction}, frameIndex: ${frameIndex}`);
        }
    }
        
    // Méthode pour vérifier si le personnage peut passer sur une case de la grille
    estPassable(grille, grilleX, grilleY, personnages) {
        // Vérifier les limites de la grille
        if (grilleX < 0 || grilleX >= grille[0].length || grilleY < 0 || grilleY >= grille.length) {
            return false;
        }
    
        // Obtenir la valeur de la case cible
        let valeurCase = grille[grilleY][grilleX];
    
        // Vérifier si la case est un téléporteur
        if (typeof valeurCase === 'string' && valeurCase.startsWith('T')) {
            if (this instanceof Joueur) {
                // Si le personnage est le joueur, gérer la téléportation
                carteActuelle.gererTeleportation(valeurCase, this);
            }
            // Rendre la case impassable pour tous les personnages (incluant les PNJs)
            return false;
        }
    
        // Vérifier si la case est un mur
        if (valeurCase === 1) {
            return false;
        }
    
        // Vérifier si un autre personnage occupe la case
        for (let p of personnages) {
            if (p !== this) {
                let pGrilleX = Math.floor((p.x + p.largeur / 2) / CONFIG.TAILLE_TUILE);
                let pGrilleY = Math.floor((p.y + p.hauteur) / CONFIG.TAILLE_TUILE);
                if (pGrilleX === grilleX && pGrilleY === grilleY) {
                return false; // La case est occupée par un autre personnage
                }
            }
        }
    
        // Retourner vrai si la case est 0 (passable)
        return grille[grilleY][grilleX] === 0;
    }
}