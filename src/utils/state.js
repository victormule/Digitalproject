export const gameState = {
    CONFIG: {
        TAILLE_TUILE: 32,
        VITESSE_JOUEUR: 4,
        VITESSE_ANIMATION: 4,
        HOLD_TIME: 2
    },
    DIRECTION: {
        BAS: 1,
        GAUCHE: 2,
        DROITE: 3,
        HAUT: 4
    },
    GUI: null,
    grilleActuelle: null,
    joueur: null,
    pnjs: [],
    cartes: {
        carte1: null,
        carte2: null
    },
    carteActuelle: null,
    cameraY: 0,
    assets: {
        bg1: null,
        bg2: null,
        loaded: false
    },
    sprites: {
        joueur: null,
        pnj: [],
    },
    teleporters: {}
};
