// src/utils/loader.js

export function chargerSpritesPersonnage(nomPersonnage, sketch) {
    const directions = ['Up', 'Down', 'Left', 'Right'];
    const sprites = {};

    directions.forEach((direction) => {
        sprites[`marche${direction}`] = [];
        for (let i = 1; i <= 4; i++) {
            const nomImage = `/assets/${nomPersonnage}Walk${direction}${i}.png`;
            sprites[`marche${direction}`].push(sketch.loadImage(nomImage));
        }
    });

    return sprites;
}
