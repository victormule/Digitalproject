// src/preload.js

import { gestionnaireRessources } from './classes/GestionnaireRessources.js';
import { chargerSpritesPersonnage } from './utils/loader.js';

export let spritesJoueur, spritesPNJ, spritesPNJ1, spritesPNJ3;

export function preload(sketch) {
    console.log('Préchargement démarré');

    // Charger les sprites et les images
    spritesJoueur = chargerSpritesPersonnage('Player', sketch);
    spritesPNJ = chargerSpritesPersonnage('NPC', sketch);
    spritesPNJ1 = chargerSpritesPersonnage('NPC1', sketch);
    spritesPNJ3 = chargerSpritesPersonnage('NPC2', sketch);

    gestionnaireRessources.chargerImage('bg1', '/assets/plaine1.gif');
    gestionnaireRessources.chargerImage('bg2', '/assets/chambre.png');
}
