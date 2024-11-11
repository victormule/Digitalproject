// src/class/Carte.js

import { CONFIG } from '../config.js';
import { TELEPORTER_REGISTRY } from '../utils/teleporterRegistry.js';

export class Carte {
    constructor(grille, imageFond, teleporteurs = {}, sketch) {
        this.grille = grille;             // Grille de la carte (tableau 2D)
        this.imageFond = imageFond;       // Image d'arrière-plan de la carte
        this.teleporteurs = teleporteurs; // Objets de téléportation sur la carte
        this.sketch = sketch;             // Référence à l'objet P5.js
        // Format des téléporteurs : { 'T1': { carte: carte2, x: 448, y: 720, destination: 'T2' } }
    }

        // Méthode pour dessiner l'environnement de la carte
        dessinerEnvironnement() {
            if (this.imageFond && this.imageFond.width && this.imageFond.height) {
                this.sketch.image(this.imageFond, 0, 0, this.imageFond.width, this.imageFond.height);
            } else {
                console.error("Image de fond non chargée ou propriété width/height inaccessible.");
            }
        }


        // Méthode pour dessiner la grille (par exemple pour débogage)
        dessinerGrille() {
            // Parcourir chaque case de la grille
            for (let y = 0; y < this.grille.length; y++) {
                for (let x = 0; x < this.grille[y].length; x++) {
                let valeurCase = this.grille[y][x];
                let posX = x * CONFIG.TAILLE_TUILE;
                let posY = y * CONFIG.TAILLE_TUILE;

                // Dessiner les cases selon leur valeur
                if (valeurCase === 1) {
                    // Cases de mur (noir)
                    this.sketch.fill(0);
                    this.sketch.noStroke();
                    this.sketch.rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
                } else if (typeof valeurCase === 'string' && valeurCase.startsWith('T')) {
                    // Cases de téléporteur (vert)
                    this.sketch.fill(0, 255, 0);
                    this.sketch.noStroke();
                    this.sketch.rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
                }

                // Dessiner les lignes de la grille en rouge
                this.sketch.noFill();
                this.sketch.stroke(255, 0, 0);
                this.sketch.rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
                }
            }
        }

    // Méthode pour gérer la téléportation du personnage
    gererTeleportation(valeurCase, personnage) {
        if (typeof valeurCase === 'string' && valeurCase.startsWith('T')) {
            const sourceTeleporterLabel = valeurCase;
            const teleporterInfo = TELEPORTER_REGISTRY[sourceTeleporterLabel];

            if (teleporterInfo) {
                const destinationLabel = teleporterInfo.destination;
                const destinationInfo = TELEPORTER_REGISTRY[destinationLabel];

                if (destinationInfo) {
                    // Changer la carte actuelle si nécessaire
                    if (carteActuelle !== destinationInfo.carte) {
                        carteActuelle = destinationInfo.carte;
                        grilleActuelle = carteActuelle.grille;

                        // **Réinitialiser les PNJs sur la nouvelle carte**
                        carteActuelle.reinitialiserPNJs(carteActuelle);
                    }

                    // Déplacer le personnage vers la destination
                    personnage.x = destinationInfo.x;
                    personnage.y = destinationInfo.y;
                    personnage.cibleX = destinationInfo.x;
                    personnage.cibleY = destinationInfo.y;

                    return true;
                } else {
                    console.error(`Destination téléporteur '${destinationLabel}' non trouvée dans le registre.`);
                }

            } else {
                console.error(`Téléporteur source '${sourceTeleporterLabel}' non trouvé dans le registre.`);
            }
        }
        return false;
    }

    // Méthode pour réinitialiser les PNJ d'une carte
    reinitialiserPNJs(carte) {
        pnjs.forEach(pnj => {
            if (pnj.carte === carte) {
                // Réinitialiser la position et l'état du PNJ
                pnj.x = pnj.xInitial;
                pnj.y = pnj.yInitial;
                pnj.cibleX = pnj.xInitial;
                pnj.cibleY = pnj.yInitial;
                pnj.direction = DIRECTION.BAS;
                pnj.enMouvement = false;
                pnj.frameAnimation = 0;
                pnj.animationCounter = 0;
            }
        });
    }
}