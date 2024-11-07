// src/utils/draw.js

import { carteActuelle, pnjs, cameraY, joueur } from './setup.js';
import { CONFIG } from '../config.js';

export function rendreJeu(sketch) {
    sketch.clear();
    sketch.push();
    sketch.translate(0, -cameraY);

    carteActuelle.dessinerEnvironnement();
    carteActuelle.dessinerGrille();

    let pnjsSurCarteActuelle = pnjs.filter((pnj) => pnj.carte === carteActuelle);
    let tousLesPersonnages = [joueur, ...pnjsSurCarteActuelle];

    tousLesPersonnages.sort((a, b) => a.y + a.hauteur - (b.y + b.hauteur));

    tousLesPersonnages.forEach((personnage) => {
        personnage.afficher();
    });

    sketch.pop();
}
