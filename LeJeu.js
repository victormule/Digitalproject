// **Configurations et constantes**

const CONFIG = {
  TAILLE_TUILE: 32,         // Taille d'une tuile en pixels
  VITESSE_JOUEUR: 4,        // Vitesse de déplacement du joueur
  VITESSE_ANIMATION: 4,     // Vitesse de l'animation des personnages
  HOLD_TIME: 2              // Temps avant qu'un mouvement ne soit pris en compte
};

const DIRECTION = {
  BAS: 1,                   // Direction vers le bas
  GAUCHE: 2,                // Direction vers la gauche
  DROITE: 3,                // Direction vers la droite
  HAUT: 4                   // Direction vers le haut
};

// **Variables globales**

let GUI;                    // Interface graphique utilisateur
let grilleActuelle;         // Grille de la carte actuelle
let joueur;                 // Objet représentant le joueur
let pnjs = [];              // Tableau des PNJ (Personnages Non Joueurs)
let bg1, bg2;               // Images de fond pour les cartes
let treeImage;              // Image de l'arbre (AJOUTEZ CECI)
let carteActuelle;          // Objet représentant la carte actuelle
let cameraY = 0;            // Position Y de la caméra
let carte1, carte2;         // Objets représentant les deux cartes

// **Sprites**

let spritesJoueur;          // Sprites du joueur
let spritesPNJ;             // Sprites des PNJ 
let spritesPNJ1;            // Sprites du PNJ1
let spritesPNJ3;            // Sprites du PNJ3

// **Registre Global des Téléporteurs**

const TELEPORTER_REGISTRY = {
  // Exemple de téléporteurs
  // 'T1': { carte: carte1, x: 448, y: 720, destination: 'T2' },
  // 'T2': { carte: carte2, x: 448, y: 720, destination: 'T1' },
  // 'T3': { carte: carte1, x: 100, y: 200, destination: 'T4' },
  // 'T4': { carte: carte2, x: 500, y: 600, destination: 'T3' },
};

// **Gestionnaire de ressources**

class GestionnaireRessources {
  constructor() {
    this.images = {};       // Dictionnaire pour stocker les images chargées
  }

  // Méthode pour charger une image
  chargerImage(cle, chemin) {
    this.images[cle] = loadImage(chemin);
  }

  // Méthode pour récupérer une image déjà chargée
  getImage(cle) {
    return this.images[cle];
  }
}

const gestionnaireRessources = new GestionnaireRessources();

// **Chargement des ressources**

function preload() {
  // Charger les sprites pour le joueur et les PNJ
  spritesJoueur = chargerSpritesPersonnage('Player');
  spritesPNJ = chargerSpritesPersonnage('NPC');
  spritesPNJ1 = chargerSpritesPersonnage('NPC1');
  spritesPNJ3 = chargerSpritesPersonnage('NPC2');

  // Charger les arrière-plans
  gestionnaireRessources.chargerImage('bg1', 'assets/plaineX.png');
  gestionnaireRessources.chargerImage('bg2', 'assets/chambre.png');
  gestionnaireRessources.chargerImage('tree', 'assets/Tree.png');
  
  // Récupérer les images d'arrière-plan
  bg1 = gestionnaireRessources.getImage('bg1');
  bg2 = gestionnaireRessources.getImage('bg2');
  treeImage = gestionnaireRessources.getImage('tree');
}

// Fonction pour charger les sprites d'un personnage donné
function chargerSpritesPersonnage(nomPersonnage) {
  const directions = ['Up', 'Down', 'Left', 'Right'];
  const sprites = {};

  // Pour chaque direction, charger les images correspondantes
  directions.forEach(direction => {
    sprites[`marche${direction}`] = [];
    for (let i = 1; i <= 4; i++) {
      const nomImage = `assets/${nomPersonnage}Walk${direction}${i}.png`;
      sprites[`marche${direction}`].push(loadImage(nomImage));
    }
  });

  return sprites;
}



// **Classes**

class ObjetStatique {
  constructor(x, y, image, carte) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.hauteur = image.height; // Utilisé pour le tri de profondeur
    this.largeur = image.width;
    this.carte = carte;
  }

  afficher() {
    image(this.image, this.x, this.y);
  }
}

class Personnage {
  // Constructeur de la classe Personnage
  constructor(x, y, sprites) {
    this.x = x;                       // Position X du personnage
    this.y = y;                       // Position Y du personnage
    this.cibleX = x;                  // Position X cible lors du déplacement
    this.cibleY = y;                  // Position Y cible lors du déplacement
    this.vitesse = CONFIG.VITESSE_JOUEUR;   // Vitesse de déplacement
    this.direction = DIRECTION.BAS;   // Direction actuelle du personnage
    this.enMouvement = false;         // Indique si le personnage est en mouvement
    this.frameAnimation = 0;          // Compteur pour l'animation
    this.animationCounter = 0;        // Compteur pour la vitesse d'animation
    this.animationSpeed = CONFIG.VITESSE_ANIMATION; // Vitesse d'animation
    this.sprites = sprites;           // Sprites du personnage
    this.largeur = CONFIG.TAILLE_TUILE; // Largeur du personnage (en pixels)
    this.hauteur = CONFIG.TAILLE_TUILE; // Hauteur du personnage (en pixels)
    this.holdTime = CONFIG.HOLD_TIME; // Temps avant de considérer un mouvement
    this.holdCounter = 0;             // Compteur pour le temps de maintien de la touche
    this.stepIndex = 0;               // Indice pour l'animation de marche
  }

  // Méthode pour déplacer le personnage
  deplacer(grille, personnages) {
    // Vérifier si le personnage doit se déplacer vers une cible
    if (this.x !== this.cibleX || this.y !== this.cibleY) {
      let deltaX = this.cibleX - this.x;
      let deltaY = this.cibleY - this.y;
      let distance = sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > this.vitesse) {
        // Déplacer le personnage vers la cible
        this.x += (deltaX / distance) * this.vitesse;
        this.y += (deltaY / distance) * this.vitesse;
        this.enMouvement = true;
      } else {
        // Arrêter le personnage une fois la cible atteinte
        this.x = this.cibleX;
        this.y = this.cibleY;
        this.enMouvement = false;
      }
    } else {
      this.enMouvement = false;
    }

    // Mettre à jour l'animation
    this.animer();
  }

  // Méthode pour gérer l'animation du personnage
  animer() {
    if (this.enMouvement) {
      this.animationCounter++;
      if (this.animationCounter >= this.animationSpeed) {
        this.animationCounter = 0;
        this.frameAnimation = (this.frameAnimation + 1) % 2;
      }
    } else {
      this.frameAnimation = 0;
      this.animationCounter = 0;
    }
  }

  // Méthode pour afficher le personnage à l'écran
  afficher() {
    let frameIndex = this.stepIndex * 2 + this.frameAnimation;

    let spriteActuel;
    switch (this.direction) {
      case DIRECTION.BAS:
        spriteActuel = this.sprites.marcheDown[frameIndex];
        break;
      case DIRECTION.GAUCHE:
        spriteActuel = this.sprites.marcheLeft[frameIndex];
        break;
      case DIRECTION.DROITE:
        spriteActuel = this.sprites.marcheRight[frameIndex];
        break;
      case DIRECTION.HAUT:
        spriteActuel = this.sprites.marcheUp[frameIndex];
        break;
      default:
        spriteActuel = null;
    }

    if (spriteActuel) {
      image(spriteActuel, this.x, this.y);
    } else {
      console.error(`spriteActuel est undefined pour direction: ${this.direction}, frameIndex: ${frameIndex}`);
    }
  }

// Méthode pour vérifier si le personnage peut passer sur une case de la grille
estPassable(grille, grilleX, grilleY, personnages) {
  // Vérifier les limites de la grille
  if (grilleX < 0 || grilleX >= grille[0].length || grilleY < 0 || grilleY >= grille.length) {
    return false;
  }
  // Vérifier si un objet statique occupe la case
  for (let objet of objetsStatiques.filter(objet => objet.carte === carteActuelle)) {
    let objetGrilleX = Math.floor((objet.x + objet.largeur / 2) / CONFIG.TAILLE_TUILE);
    let objetGrilleY = Math.floor((objet.y + objet.hauteur) / CONFIG.TAILLE_TUILE);
    if (objetGrilleX === grilleX && objetGrilleY === grilleY) {
      return false; // La case est occupée par un objet statique
    }
  }

  // Obtenir la valeur de la case cible
  let valeurCase = grille[grilleY][grilleX];

  // Vérifier si la case est un téléporteur
  if (typeof valeurCase === 'string' && valeurCase.startsWith('T')) {
    if (this instanceof Joueur) {
      // Si le personnage est le joueur, gérer la téléportation
      carteActuelle.gererTeleportation(valeurCase, this);
    }
    // Rendre la case impassable pour tous les personnages (incluant les PNJs)
    return false;
  }

  // Vérifier si la case est un mur
  if (valeurCase === 1) {
    return false;
  }

  // Vérifier si un autre personnage occupe la case
  for (let p of personnages) {
    if (p !== this) {
      let pGrilleX = Math.floor((p.x + p.largeur / 2) / CONFIG.TAILLE_TUILE);
      let pGrilleY = Math.floor((p.y + p.hauteur) / CONFIG.TAILLE_TUILE);
      if (pGrilleX === grilleX && pGrilleY === grilleY) {
        return false; // La case est occupée par un autre personnage
      }
    }
  }

  // Retourner vrai si la case est 0 (passable)
  return grille[grilleY][grilleX] === 0;
}
}

class Joueur extends Personnage {
  constructor(x, y, sprites) {
    super(x, y, sprites); // Appeler le constructeur de la classe parent
  }

  // Méthode pour déplacer le joueur
  deplacer(grille, personnages) {
    this.gererEntree(grille, personnages); // Gérer les entrées clavier
    super.deplacer(grille, personnages);   // Appeler la méthode deplacer() du parent
  }

  // Méthode pour gérer les entrées clavier du joueur
  gererEntree(grille, personnages) {
    if (this.enMouvement) {
      return; // Ne pas traiter les entrées si le joueur est déjà en mouvement
    }

    let grilleX = Math.floor((this.x + this.largeur / 2) / CONFIG.TAILLE_TUILE);
    let grilleY = Math.floor((this.y + this.hauteur) / CONFIG.TAILLE_TUILE);

    // Mappings des touches directionnelles
    const mappingsEntree = [
      { touche: LEFT_ARROW, direction: DIRECTION.GAUCHE, dx: -1, dy: 0 },
      { touche: RIGHT_ARROW, direction: DIRECTION.DROITE, dx: 1, dy: 0 },
      { touche: UP_ARROW, direction: DIRECTION.HAUT, dx: 0, dy: -1 },
      { touche: DOWN_ARROW, direction: DIRECTION.BAS, dx: 0, dy: 1 }
    ];

    // Réinitialiser le compteur de maintien si aucune touche n'est pressée
    if (!mappingsEntree.some(mapping => keyIsDown(mapping.touche))) {
      this.holdCounter = 0;
    }

    // Parcourir les mappings pour vérifier les touches pressées
    for (let mapping of mappingsEntree) {
      if (keyIsDown(mapping.touche)) {
        this.direction = mapping.direction; // Mettre à jour la direction du joueur
        this.holdCounter++;
        if (
          this.holdCounter > this.holdTime &&
          this.estPassable(grille, grilleX + mapping.dx, grilleY + mapping.dy, personnages)
        ) {
          // Mettre à jour la cible du joueur
          this.cibleX = this.x + mapping.dx * CONFIG.TAILLE_TUILE;
          this.cibleY = this.y + mapping.dy * CONFIG.TAILLE_TUILE;
          this.demarrerMouvement();
        }
        break; // Empêcher les multiples directions à la fois
      }
    }
  }

  // Méthode pour démarrer le mouvement du joueur
  demarrerMouvement() {
    this.stepIndex = (this.stepIndex + 1) % 2;
    this.frameAnimation = 0;
    this.animationCounter = 0;
    this.enMouvement = true;
  }
}

// Classe pour les PNJ (Personnages Non Joueurs)
class PNJ extends Personnage {
  /**
   * Constructeur de la classe PNJ
   * @param {number} x - Position X initiale du PNJ
   * @param {number} y - Position Y initiale du PNJ
   * @param {object} sprites - Sprites du PNJ
   * @param {Carte} carte - Carte sur laquelle le PNJ se trouve
   * @param {boolean} [peutBouger=true] - Indique si le PNJ peut bouger
   * @param {number} [vitessePatrouille=CONFIG.VITESSE_JOUEUR] - Vitesse de patrouille du PNJ
   * @param {number} [frequencePatrouille=0.02] - Fréquence de patrouille du PNJ (probabilité de bouger)
   */
  constructor(x, y, sprites, carte, peutBouger = true, vitessePatrouille = CONFIG.VITESSE_JOUEUR, frequencePatrouille = 0.02) {
    super(x, y, sprites);
    this.carte = carte; // Carte sur laquelle le PNJ se trouve
    this.peutBouger = peutBouger; // Indique si le PNJ peut bouger ou non
    this.vitesse = vitessePatrouille; // Vitesse de déplacement du PNJ
    this.frequencePatrouille = frequencePatrouille; // Fréquence de patrouille du PNJ
    // Stocker la position initiale
    this.xInitial = x;
    this.yInitial = y;
    if (!this.peutBouger) {
      this.direction = DIRECTION.BAS; // Si le PNJ est immobile, il regarde vers le bas par défaut
    }
  }

  // Méthode pour déplacer le PNJ
  deplacer(grille, personnages) {
    if (this.carte === carteActuelle) {
      if (!this.enMouvement) {
        if (this.estProcheDuJoueur()) {
          // Le joueur est proche, arrêter l'activité et se tourner vers le joueur
          this.enMouvement = false; // S'assurer que le PNJ est arrêté
          this.cibleX = this.x;     // Fixer la position cible à la position actuelle
          this.cibleY = this.y;
          this.mettreAJourDirectionVersJoueur(); // Se tourner vers le joueur
        } else {
          // Le joueur n'est pas proche, reprendre l'activité normale
          if (this.peutBouger) {
            this.patrouiller(grille, personnages);
          }
        }
      }
      super.deplacer(grille, personnages);
    }
  }

  // Méthode pour vérifier si le joueur est proche
  estProcheDuJoueur() {
    // Obtenir les positions sur la grille
    let pnjGrilleX = Math.floor((this.x + this.largeur / 2) / CONFIG.TAILLE_TUILE);
    let pnjGrilleY = Math.floor((this.y + this.hauteur) / CONFIG.TAILLE_TUILE);

    let joueurGrilleX = Math.floor((joueur.x + joueur.largeur / 2) / CONFIG.TAILLE_TUILE);
    let joueurGrilleY = Math.floor((joueur.y + joueur.hauteur) / CONFIG.TAILLE_TUILE);

    // Calculer la distance de Manhattan
    let distance = Math.abs(pnjGrilleX - joueurGrilleX) + Math.abs(pnjGrilleY - joueurGrilleY);

    // Retourner vrai si la distance est 1 (à une case de distance)
    return distance === 1;
  }

  // Méthode pour ajuster la direction du PNJ pour qu'il regarde le joueur
  mettreAJourDirectionVersJoueur() {
    let deltaX = joueur.x - this.x;
    let deltaY = joueur.y - this.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Le joueur est plus à gauche ou à droite
      if (deltaX > 0) {
        this.direction = DIRECTION.DROITE;
      } else {
        this.direction = DIRECTION.GAUCHE;
      }
    } else {
      // Le joueur est plus en haut ou en bas
      if (deltaY > 0) {
        this.direction = DIRECTION.BAS;
      } else {
        this.direction = DIRECTION.HAUT;
      }
    }
  }

  // Méthode pour gérer la patrouille du PNJ
  patrouiller(grille, personnages) {
    if (this.enMouvement) {
      return; // Ne pas initier une nouvelle patrouille si le PNJ est déjà en mouvement
    }
  
    // Utiliser la fréquence de patrouille spécifique du PNJ
    if (random(1) < this.frequencePatrouille) {
      const directions = [
        { direction: DIRECTION.BAS, dx: 0, dy: 1 },
        { direction: DIRECTION.GAUCHE, dx: -1, dy: 0 },
        { direction: DIRECTION.DROITE, dx: 1, dy: 0 },
        { direction: DIRECTION.HAUT, dx: 0, dy: -1 }
      ];
  
      // Choisir une direction aléatoire
      const directionAleatoire = random(directions);
      this.direction = directionAleatoire.direction;
  
      let grilleX = Math.floor((this.x + this.largeur / 2) / CONFIG.TAILLE_TUILE);
      let grilleY = Math.floor((this.y + this.hauteur) / CONFIG.TAILLE_TUILE);
  
      // Vérifier si la case est passable
      if (this.estPassable(grille, grilleX + directionAleatoire.dx, grilleY + directionAleatoire.dy, personnages)) {
        // Mettre à jour la cible du PNJ
        this.cibleX = this.x + directionAleatoire.dx * CONFIG.TAILLE_TUILE;
        this.cibleY = this.y + directionAleatoire.dy * CONFIG.TAILLE_TUILE;
        this.demarrerMouvement();
      }
    }
  }

  // Méthode pour démarrer le mouvement du PNJ
  demarrerMouvement() {
    this.stepIndex = (this.stepIndex + 1) % 2;
    this.frameAnimation = 0;
    this.animationCounter = 0;
    this.enMouvement = true;
  }
}

// Nouvelle classe pour les PNJ qui regardent toujours le joueur
class PNJRegardantJoueur extends PNJ {
  constructor(x, y, sprites, carte) {
    super(x, y, sprites, carte, false); // Ce PNJ ne peut pas bouger
  }

  // Méthode pour déplacer le PNJ (mise à jour de la direction)
  deplacer(grille, personnages) {
    if (this.carte === carteActuelle) {
      this.mettreAJourDirectionVersJoueur(); // Mettre à jour la direction vers le joueur
    }
    super.deplacer(grille, personnages);
  }
}

// Classe pour représenter une carte du jeu
class Carte {
  constructor(grille, imageFond, teleporteurs = {}) {
    this.grille = grille;             // Grille de la carte (tableau 2D)
    this.imageFond = imageFond;       // Image d'arrière-plan de la carte
    this.teleporteurs = teleporteurs; // Objets de téléportation sur la carte
    // Format des téléporteurs : { 'T1': { carte: carte2, x: 448, y: 720, destination: 'T2' } }
  }

  // Méthode pour dessiner l'environnement de la carte
  dessinerEnvironnement() {
    image(this.imageFond, 0, 0, this.imageFond.width, this.imageFond.height);
  }

  // Méthode pour dessiner la grille (par exemple pour débogage)
  dessinerGrille() {
    // Parcourir chaque case de la grille
    for (let y = 0; y < this.grille.length; y++) {
      for (let x = 0; x < this.grille[y].length; x++) {
        let valeurCase = this.grille[y][x];
        let posX = x * CONFIG.TAILLE_TUILE;
        let posY = y * CONFIG.TAILLE_TUILE;

        // Dessiner les cases selon leur valeur
        if (valeurCase === 1) {
          // Cases de mur (noir)
        //  fill(0);
        //  noStroke();
        //  rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
        //} else if (typeof valeurCase === 'string' && valeurCase.startsWith('T')) {
        //  // Cases de téléporteur (vert)
        //  fill(0, 255, 0);
        //  noStroke();
        //  rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
        }

        // Dessiner les lignes de la grille en rouge
       // noFill();
       // stroke(255, 0, 0);
       // rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
      }
    }
  }

  // Méthode pour gérer la téléportation du personnage
gererTeleportation(valeurCase, personnage) {
  if (typeof valeurCase === 'string' && valeurCase.startsWith('T')) {
    const sourceTeleporterLabel = valeurCase;
    const teleporterInfo = TELEPORTER_REGISTRY[sourceTeleporterLabel];

    if (teleporterInfo) {
      const destinationLabel = teleporterInfo.destination;
      const destinationInfo = TELEPORTER_REGISTRY[destinationLabel];

      if (destinationInfo) {
        // Changer la carte actuelle si nécessaire
        if (carteActuelle !== destinationInfo.carte) {
          carteActuelle = destinationInfo.carte;
          grilleActuelle = carteActuelle.grille;

          // **Réinitialiser les PNJs sur la nouvelle carte**
          carteActuelle.reinitialiserPNJs(carteActuelle);
        }

        // Déplacer le personnage vers la destination
        personnage.x = destinationInfo.x;
        personnage.y = destinationInfo.y;
        personnage.cibleX = destinationInfo.x;
        personnage.cibleY = destinationInfo.y;

        return true;
      } else {
        console.error(`Destination téléporteur '${destinationLabel}' non trouvée dans le registre.`);
      }
    } else {
      console.error(`Téléporteur source '${sourceTeleporterLabel}' non trouvé dans le registre.`);
    }
  }
  return false;
}

  // Méthode pour réinitialiser les PNJ d'une carte
  reinitialiserPNJs(carte) {
    pnjs.forEach(pnj => {
      if (pnj.carte === carte) {
        // Réinitialiser la position et l'état du PNJ
        pnj.x = pnj.xInitial;
        pnj.y = pnj.yInitial;
        pnj.cibleX = pnj.xInitial;
        pnj.cibleY = pnj.yInitial;
        pnj.direction = DIRECTION.BAS;
        pnj.enMouvement = false;
        pnj.frameAnimation = 0;
        pnj.animationCounter = 0;
      }
    });
  }
}

// **Initialisation du GUI (Interface Graphique Utilisateur)**

function setupGUI() {
  // Créer un div pour le GUI
  GUI = createDiv('');
  GUI.position(windowWidth / 2 - 480, 0); // Positionner au centre
  GUI.size(960, 100); // Taille du GUI



  // Banniere GUI
  let band = createButton("");
  band.parent(GUI); // Attacher le bouton au GUI
  band.position(0, 0);
  band.style('webkitAppearance', 'none'); // enlever le style par défaut du slider
  band.style('appearance', 'none');
  band.style('border', 'none');
  band.style('width', '960px');
  band.style('height', '40px');
  band.style('opacity','0.5');
  band.style("z-index", "200");

}

// Fonction appelée lors du clic sur le bouton
function onButtonClick() {
  console.log("Bouton cliqué !");
}

// Fonction pour gérer le redimensionnement de la fenêtre
function windowResized() {
  // Repositionner le GUI au centre si la fenêtre est redimensionnée
  GUI.position(windowWidth / 2 - 480, 0);
}

// **Grilles des Cartes**

let grille1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 1, 'T1', 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 'T3', 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]
    
  ];
  

  let grille2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 'T4', 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 'T2', 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
  ];

  let objetsStatiques = [];
 // **Fonction setup()**

function setup() {
  cnv = createCanvas(960, 3400); // Taille du canvas fixée
  cnv.position(0, 0, "relative");
  setupGUI(); // Initialiser le GUI

  // Initialiser les cartes
  carte1 = new Carte(grille1, bg1);
  carte2 = new Carte(grille2, bg2);

  // Ajouter l'arbre à la carte1 à la position souhaitée (par exemple, x: 500, y: 500)
  objetsStatiques.push(new ObjetStatique(0, 0, treeImage, carte1));
  // **Enregistrer les Téléporteurs dans le Registre Global**
  
  // Exemple : T1 sur carte1 mène à T2 sur carte2
  TELEPORTER_REGISTRY['T1'] = { carte: carte1, x: 256, y: 688, destination: 'T2' };
  TELEPORTER_REGISTRY['T2'] = { carte: carte2, x: 256, y: 752, destination: 'T1' };
  
  // Exemple : T3 sur carte1 mène à T4 sur carte2
  TELEPORTER_REGISTRY['T3'] = { carte: carte1, x: 256, y: 752, destination: 'T4' };
  TELEPORTER_REGISTRY['T4'] = { carte: carte2, x: 256, y: 656, destination: 'T3' };

  // Définir les téléporteurs dans chaque carte
  carte1.teleporteurs = { 
    'T1': TELEPORTER_REGISTRY['T1'],
    'T3': TELEPORTER_REGISTRY['T3']
  };
  carte2.teleporteurs = { 
    'T2': TELEPORTER_REGISTRY['T2'],
    'T4': TELEPORTER_REGISTRY['T4']
  };

  carteActuelle = carte1;
  grilleActuelle = carteActuelle.grille;

  // Créer le joueur
  joueur = new Joueur(448, 720, spritesJoueur);

  // Centrer la caméra sur le personnage au démarrage
  cameraY = joueur.y - windowHeight / 2;
  cameraY = constrain(cameraY, 0, height - windowHeight);

  // **Créer des PNJ**
  pnjs.push(new PNJ(480, 752, spritesPNJ, carte1, true, 2, 0.005)); // PNJ sur carte1
  pnjs.push(new PNJ(544, 752, spritesPNJ1, carte1, false)); // PNJ immobile sur carte1
  pnjs.push(new PNJRegardantJoueur(192, 688, spritesPNJ3, carte2)); // PNJ qui regarde le joueur sur carte2
  pnjs.push(new PNJ(320, 688, spritesPNJ1, carte2, true, 2, 0.01)); // PNJ sur carte2
}

// **Boucle de dessin**

function draw() {
  mettreAJourJeu(); // Mettre à jour l'état du jeu
  rendreJeu();      // Dessiner le jeu à l'écran
}

// **Fonction pour mettre à jour le jeu**

function mettreAJourJeu() {
  // Mettre à jour la position de la caméra pour suivre le joueur
  cameraY = joueur.y - windowHeight / 2;
  cameraY = constrain(cameraY, 0, height - windowHeight);

  // Mettre à jour le joueur
  joueur.deplacer(grilleActuelle, [joueur, ...pnjs.filter(pnj => pnj.carte === carteActuelle)]);
 

  // Mettre à jour les PNJ sur la carte actuelle
  pnjs.filter(pnj => pnj.carte === carteActuelle).forEach(pnj => {
    pnj.deplacer(grilleActuelle, [joueur, ...pnjs.filter(p => p !== pnj && p.carte === carteActuelle)]);
  });
}

// **Fonction pour dessiner le jeu**

function rendreJeu() {
  clear(); // Effacer le canvas
  push();
  translate(0, -cameraY); // Déplacer la vue en fonction de la caméra

  // Dessiner l'environnement
  carteActuelle.dessinerEnvironnement();


//********************Dessiner la grille********************* */

  // Dessiner la grille si nécessaire (pour débogage)
  carteActuelle.dessinerGrille();

//*************************************************************// */


// Obtenir tous les personnages sur la carte actuelle
let pnjsSurCarteActuelle = pnjs.filter(pnj => pnj.carte === carteActuelle);
let tousLesPersonnages = [joueur, ...pnjsSurCarteActuelle];

// Obtenir les objets statiques sur la carte actuelle
let objetsSurCarteActuelle = objetsStatiques.filter(objet => objet.carte === carteActuelle);

// Combiner tous les éléments pour le rendu
let tousLesElements = [...tousLesPersonnages, ...objetsSurCarteActuelle];

// Trier les éléments pour l'affichage (profondeur)
tousLesElements.sort((a, b) => (a.y + a.hauteur) - (b.y + b.hauteur));

// Afficher chaque élément
tousLesElements.forEach(element => {
  element.afficher();
});

  pop();

  // (Optionnel) Rendre le GUI
  // Votre code pour le GUI, s'il y en a
}

// **Fonctions supplémentaires (si nécessaire)**

// Fonction pour mettre à jour la position de la caméra (si nécessaire)
function mettreAJourCamera() {
  // Votre logique pour mettre à jour la caméra
}

// Fonction pour rendre le GUI (si nécessaire)
function rendreGUI() {
  // Votre logique pour rendre le GUI
}
//test sandbox