// src/utils/setup.js
import { grille1, grille2 } from './grilles.js';
import { Carte } from '../class/Carte.js';
import { Joueur } from '../class/Joueur.js';
import { PNJ } from '../class/PNJ.js';
import { PNJRegardantJoueur } from '../class/PNJRegardantJoueur.js';
import { setupGUI } from '../GUI.js';
import { TELEPORTER_REGISTRY } from './teleporterRegistry.js';
import { spritesJoueur, spritesPNJ, spritesPNJ1, spritesPNJ3 } from '../preload.js';

export let joueur, carteActuelle, grilleActuelle, pnjs = [], cameraY = 0, carte1, carte2, bg1, bg2, assetsLoaded;

export function setCameraY(value) {
    cameraY = value;
}

export function setup(sketch, gestionnaireRessources) {
    // Vérifie que toutes les images sont bien chargées avant de continuer
    if (gestionnaireRessources.getImage('bg1') && gestionnaireRessources.getImage('bg2')) {
        console.log("Setup démarré");

        bg1 = gestionnaireRessources.getImage('bg1');
        bg2 = gestionnaireRessources.getImage('bg2');
        assetsLoaded = true;

        // Initialisation une fois les assets prêts
        let cnv = sketch.createCanvas(960, 3400);
        cnv.position(0, 0, "relative");
        setupGUI(sketch);

        carte1 = new Carte(grille1, bg1, sketch);
        carte2 = new Carte(grille2, bg2, sketch);

        TELEPORTER_REGISTRY['T1'] = { carte: carte1, x: 256, y: 752, destination: 'T2' };
        TELEPORTER_REGISTRY['T2'] = { carte: carte2, x: 256, y: 720, destination: 'T1' };
        TELEPORTER_REGISTRY['T3'] = { carte: carte1, x: 256, y: 752, destination: 'T4' };
        TELEPORTER_REGISTRY['T4'] = { carte: carte2, x: 256, y: 656, destination: 'T3' };

        carteActuelle = carte1;
        grilleActuelle = carteActuelle.grille;
        joueur = new Joueur(448, 720, spritesJoueur, sketch);

        // Initialisation de la caméra et des PNJs
        setCameraY(joueur.y - sketch.windowHeight / 2);
        setCameraY(sketch.constrain(cameraY, 0, sketch.height - sketch.windowHeight));
        pnjs.push(new PNJ(480, 752, spritesPNJ, carte1, true, 2, 0.005, sketch));
        pnjs.push(new PNJ(544, 752, spritesPNJ1, carte1, false, sketch));
        pnjs.push(new PNJRegardantJoueur(192, 688, spritesPNJ3, carte2));
        pnjs.push(new PNJ(320, 688, spritesPNJ1, carte2, true, 2, 0.01, sketch));

        console.log("Setup terminé");
    } else {
        console.error("Les images ne sont pas prêtes. Veuillez patienter...");
    }
};