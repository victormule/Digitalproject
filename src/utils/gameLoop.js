// src/utils/gameLoop.js

import { joueur, carteActuelle, pnjs, cameraY } from './setup.js';
import { CONFIG } from '../config.js';

export function mettreAJourJeu(sketch) {
    cameraY = joueur.y - sketch.windowHeight / 2;
    cameraY = sketch.constrain(cameraY, 0, sketch.height - sketch.windowHeight);

    joueur.deplacer(carteActuelle.grille, [joueur, ...pnjs.filter((pnj) => pnj.carte === carteActuelle)]);

    pnjs
        .filter((pnj) => pnj.carte === carteActuelle)
        .forEach((pnj) => {
            pnj.deplacer(carteActuelle.grille, [joueur, ...pnjs.filter((p) => p !== pnj && p.carte === carteActuelle)]);
        });
}
