// src/class/GestionnaireRessources.js

export class GestionnaireRessources {
    constructor(sketch) {
        this.images = {};
        this.sketch = sketch;
    }

    chargerImage(cle, chemin) {
        this.images[cle] = this.sketch.loadImage(chemin);
    }

    getImage(cle) {
        return this.images[cle];
    }
}
