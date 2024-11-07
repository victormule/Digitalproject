// src/utils/setup.js

import { gestionnaireRessources } from '../classes/GestionnaireRessources.js';
import { Carte } from '../classes/Carte.js';
import { Joueur } from '../classes/Joueur.js';
import { PNJ } from '../classes/PNJ.js';
import { PNJRegardantJoueur } from '../classes/PNJRegardantJoueur.js';
import { GUI } from '../GUI.js';
import { TELEPORTER_REGISTRY } from './teleporterRegistry.js';
import { spritesJoueur, spritesPNJ, spritesPNJ1, spritesPNJ3 } from '../preload.js';

export let joueur, carteActuelle, grilleActuelle, pnjs, cameraY;

export function setup(sketch) {