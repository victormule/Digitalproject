// src/utils/gameLoop.js

import { joueur, carteActuelle, pnjs, setCameraY } from './setup.js';

export function mettreAJourJeu(sketch) {
    let newCameraY = joueur.y - sketch.windowHeight / 2;
    newCameraY = sketch.constrain(newCameraY, 0, sketch.height - sketch.windowHeight);
    setCameraY(newCameraY);

    joueur.deplacer(carteActuelle.grille, [joueur, ...pnjs.filter((pnj) => pnj.carte === carteActuelle)]);

    pnjs
        .filter((pnj) => pnj.carte === carteActuelle)
        .forEach((pnj) => {
            pnj.deplacer(carteActuelle.grille, [joueur, ...pnjs.filter((p) => p !== pnj && p.carte === carteActuelle)]);
        });
};
