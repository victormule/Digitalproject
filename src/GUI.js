// src/GUI.js

export function setupGUI(sketch) {
    let GUI = sketch.createDiv('');
    GUI.position(sketch.windowWidth / 2 - 480, 0);
    GUI.size(960, 100);

    let band = sketch.createButton('');
    band.parent(GUI);
    band.position(0, 0);
    band.style('webkitAppearance', 'none');
    band.style('appearance', 'none');
    band.style('border', 'none');
    band.style('width', '960px');
    band.style('height', '40px');
    band.style('opacity', '0.5');
    band.style('z-index', '200');
}
