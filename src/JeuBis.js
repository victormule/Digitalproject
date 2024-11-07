import p5 from 'p5';

new p5((sketch) => {
    // **Configurations et constantes**
    const CONFIG = {
        TAILLE_TUILE: 32,
        VITESSE_JOUEUR: 4,
        VITESSE_ANIMATION: 4,
        HOLD_TIME: 2
    };

    const DIRECTION = {
        BAS: 1,
        GAUCHE: 2,
        DROITE: 3,
        HAUT: 4
    };

    // **Variables globales**
    let GUI;
    let grilleActuelle;
    let joueur;
    let pnjs = [];
    let bg1, bg2;
    let carteActuelle;
    let cameraY = 0;
    let carte1, carte2;

    let spritesJoueur;
    let spritesPNJ, spritesPNJ1, spritesPNJ3;

    const TELEPORTER_REGISTRY = {};

    // **Classes**
    // **Gestionnaire de ressources**
    class GestionnaireRessources {
        constructor() {
        this.images = {};
        }

        chargerImage(cle, chemin) {
        this.images[cle] = sketch.loadImage(chemin);
        }

        getImage(cle) {
        return this.images[cle];
        }
    }

    const gestionnaireRessources = new GestionnaireRessources();

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
            sketch.image(spriteActuel, this.x, this.y);
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
          if (!mappingsEntree.some(mapping => sketch.keyIsDown(mapping.touche))) {
            this.holdCounter = 0;
          }
      
          // Parcourir les mappings pour vérifier les touches pressées
          for (let mapping of mappingsEntree) {
            if (sketch.keyIsDown(mapping.touche)) {
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
          if (sketch.random(1) < this.frequencePatrouille) {
            const directions = [
              { direction: DIRECTION.BAS, dx: 0, dy: 1 },
              { direction: DIRECTION.GAUCHE, dx: -1, dy: 0 },
              { direction: DIRECTION.DROITE, dx: 1, dy: 0 },
              { direction: DIRECTION.HAUT, dx: 0, dy: -1 }
            ];
        
            // Choisir une direction aléatoire
            const directionAleatoire = sketch.random(directions);
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

    class Carte {
        constructor(grille, imageFond, teleporteurs = {}) {
          this.grille = grille;             // Grille de la carte (tableau 2D)
          this.imageFond = imageFond;       // Image d'arrière-plan de la carte
          this.teleporteurs = teleporteurs; // Objets de téléportation sur la carte
          // Format des téléporteurs : { 'T1': { carte: carte2, x: 448, y: 720, destination: 'T2' } }
        }
      
        // Méthode pour dessiner l'environnement de la carte
        dessinerEnvironnement() {
          sketch.image(this.imageFond, 0, 0, this.imageFond.width, this.imageFond.height);
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
                ketch.fill(0);
                sketch.noStroke();
                sketch.rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
              } else if (typeof valeurCase === 'string' && valeurCase.startsWith('T')) {
                // Cases de téléporteur (vert)
                sketch.fill(0, 255, 0);
                sketch.noStroke();
                sketch.rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
              }
      
              // Dessiner les lignes de la grille en rouge
              sketch.noFill();
              sketch.stroke(255, 0, 0);
              sketch.rect(posX, posY, CONFIG.TAILLE_TUILE, CONFIG.TAILLE_TUILE);
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
      

    // **Chargement des ressources**
    sketch.preload = function () {
        console.log("Préchargement démarré");
        spritesJoueur = chargerSpritesPersonnage('Player', sketch);
        spritesPNJ = chargerSpritesPersonnage('NPC', sketch);
        spritesPNJ1 = chargerSpritesPersonnage('NPC1', sketch);
        spritesPNJ3 = chargerSpritesPersonnage('NPC2', sketch);

        gestionnaireRessources.chargerImage('bg1', '../assets/plaine1.gif', sketch);
        gestionnaireRessources.chargerImage('bg2', '../assets/chambre.png', sketch);

        bg1 = gestionnaireRessources.getImage('bg1');
        bg2 = gestionnaireRessources.getImage('bg2');

        console.log("Images chargées:", { bg1, bg2 });
        console.log("Préchargement terminé");
    };

    sketch.setup = function () {
        console.log("Setup démarré");
        let cnv = sketch.createCanvas(960, 3400);
        cnv.position(0, 0, "relative");
        setupGUI();

        carte1 = new Carte(grille1, bg1);
        carte2 = new Carte(grille2, bg2);

        TELEPORTER_REGISTRY['T1'] = { carte: carte1, x: 256, y: 752, destination: 'T2' };
        TELEPORTER_REGISTRY['T2'] = { carte: carte2, x: 256, y: 720, destination: 'T1' };
        TELEPORTER_REGISTRY['T3'] = { carte: carte1, x: 256, y: 752, destination: 'T4' };
        TELEPORTER_REGISTRY['T4'] = { carte: carte2, x: 256, y: 656, destination: 'T3' };

        carte1.teleporteurs = { 'T1': TELEPORTER_REGISTRY['T1'], 'T3': TELEPORTER_REGISTRY['T3'] };
        carte2.teleporteurs = { 'T2': TELEPORTER_REGISTRY['T2'], 'T4': TELEPORTER_REGISTRY['T4'] };

        carteActuelle = carte1;
        grilleActuelle = carteActuelle.grille;

        joueur = new Joueur(448, 720, spritesJoueur);

        cameraY = joueur.y - sketch.windowHeight / 2;
        cameraY = sketch.constrain(cameraY, 0, sketch.height - sketch.windowHeight);

        pnjs.sketch.push(new PNJ(480, 752, spritesPNJ, carte1, true, 2, 0.005));
        pnjs.sketch.push(new PNJ(544, 752, spritesPNJ1, carte1, false));
        pnjs.sketch.push(new PNJRegardantJoueur(192, 688, spritesPNJ3, carte2));
        pnjs.sketch.push(new PNJ(320, 688, spritesPNJ1, carte2, true, 2, 0.01));

        console.log("Setup terminé");
    };

    sketch.draw = function () {
        mettreAJourJeu();
        rendreJeu();
    };

    function setupGUI() {
        GUI = sketch.createDiv('');
        GUI.position(sketch.windowWidth / 2 - 480, 0);
        GUI.size(960, 100);

        let band = sketch.createButton("");
        band.parent(GUI);
        band.position(0, 0);
        band.style('webkitAppearance', 'none');
        band.style('appearance', 'none');
        band.style('border', 'none');
        band.style('width', '960px');
        band.style('height', '40px');
        band.style('opacity', '0.5');
        band.style("z-index", "200");
    }

    function chargerSpritesPersonnage(nomPersonnage, sketch) {
        const directions = ['Up', 'Down', 'Left', 'Right'];
        const sprites = {};

        directions.forEach(direction => {
        sprites[`marche${direction}`] = [];
        for (let i = 1; i <= 4; i++) {
            const nomImage = `../assets/${nomPersonnage}Walk${direction}${i}.png`;
            sprites[`marche${direction}`].sketch.push(sketch.loadImage(nomImage));
        }
        });

        return sprites;
    }

    function mettreAJourJeu() {
        cameraY = joueur.y - sketch.windowHeight / 2;
        cameraY = sketch.constrain(cameraY, 0, sketch.height - sketch.windowHeight);

        joueur.deplacer(grilleActuelle, [joueur, ...pnjs.filter(pnj => pnj.carte === carteActuelle)]);

        pnjs.filter(pnj => pnj.carte === carteActuelle).forEach(pnj => {
        pnj.deplacer(grilleActuelle, [joueur, ...pnjs.filter(p => p !== pnj && p.carte === carteActuelle)]);
        });
    }

    function rendreJeu() {
        sketch.clear();
        sketch.push();
        sketch.translate(0, -cameraY);

        carteActuelle.dessinerEnvironnement();
        carteActuelle.dessinerGrille();

        let pnjsSurCarteActuelle = pnjs.filter(pnj => pnj.carte === carteActuelle);
        let tousLesPersonnages = [joueur, ...pnjsSurCarteActuelle];

        tousLesPersonnages.sort((a, b) => (a.y + a.hauteur) - (b.y + b.hauteur));

        tousLesPersonnages.forEach(personnage => {
        personnage.afficher();
        });

        sketch.pop();
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 'T1', 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'T3', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    
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
});
