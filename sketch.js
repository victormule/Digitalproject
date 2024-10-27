window.onload = function() {
  var loader = document.getElementById("loader");
  var progress = 0;
  
  function updateLoader() {
    progress += 1;
    loader.style.strokeDashoffset = 600 - (600 * progress) / 100; // Mettre à jour la progression visuelle
    if (progress < 50) {
      requestAnimationFrame(updateLoader);
    } else {
      loader.style.display = "none"; // Masquer la barre de chargement une fois terminée
    }
  }
  
  updateLoader();
};


let FR = 255;
let EN = 150;
let fr = 100; //starting FPS
let currentTime;
let mapping = 2;
let g = -600;
let e = -100;
let f = 800;
let o = -400;
let u = 0;
let t = 0;
let x = 260;
let y = 600;
let z = 200;
let Z = 0.2;
let a = 1;
let N = -400;
let pseudoInput;
let commentInput;
let commentInput2;
let dialogueLicata;
let sendButton;
let sendButton2;
let formulation;
fontsize = 28;
let listeCommentaires = [];
let commentairesDiv;
let commentaire;
let pseudo;
let nouveauCommentaire;
let cachemisere;
let affichageCommentaires = false;
let gainSlider;
let isMuted = false;
let sliderPosition = 1;
let scrollbarPos = 0;
let scrollbarHeight = 200;
let viewHeight = 400;
let scrollbarVisible = false;
let millisStart = -1;
let grandCoffre = true;
let discordDiv;
let discordIframe;
let isDiscordVisible = false;

// Initialisation du tableau qui contiendra les images et des variables qui contrôleront l'affichage
let diaporama = [];
let index = 0;
let moveDiapo = 0;
let scrolling = false;
let scrollDirection = 1;
let lastTime = 0;
let delay = 2000; // Délai en millisecondes entre chaque changement d'image (2 secondes)
let stopDuration = 3000; // Durée en millisecondes de l'arrêt sur chaque image (1 seconde)
let scrollSpeed = 6; // Vitesse de défilement
//...

function preload() {
  font = loadFont("font/pkmndp.ttf");
  song = loadSound("assets/littleroot.mp3");
  song2 = loadSound("assets/temple-of-time-Robert-Austin.mp3");
  song3 = loadSound("assets/DistantRoads.mp3");
  bg = loadImage("assets/plaine.gif");
  ch = loadImage("assets/chambre.png");
  chambre1 = loadImage("assets/chambre1.png");
  chambre2 = loadImage("assets/chambre2.png");
  chambre3 = loadImage("assets/chambre3.png");
  temple = loadImage("assets/temple.png");
  temple2 = loadImage("assets/temple2.gif");
  temple3 = loadImage("assets/templefeu.gif");
  light1 = loadImage("assets/templelight.png");
  light2 = loadImage("assets/tavernelight.png");
  sky = loadImage("assets/sky.png");
  cloud1 = loadImage("assets/cloud1.png");
  cloud2 = loadImage("assets/cloud2.png");
  sea = loadImage("assets/skyWater.png");
  bird1 = loadImage("assets/bird1.gif");
  shadow = loadImage("assets/shadow.png");
  combat1 = loadImage("assets/combat1.gif");
  combat2 = loadImage("assets/combat2.gif");
  battle = loadImage("assets/battle.gif");
  battle1 = loadImage("assets/battle1.gif");
  ladruse = loadImage("assets/la-druse.gif");
  ladruse2 = loadImage("assets/la-druse2.gif");
  lamule = loadImage("assets/la-mule.gif");
  lamule2 = loadImage("assets/la-mule2.gif");
  lamule3 = loadImage("assets/la-muleA.gif");
  lamule4 = loadImage("assets/la-muleB.gif");
  lamule5 = loadImage("assets/la-muleC.png");
  mshadow = loadImage("assets/Mshadow.png");
  dshadow = loadImage("assets/druseshadow.png");
  img1 = loadImage("assets/Player.gif");
  img2 = loadImage("assets/PlayerL.gif");
  img3 = loadImage("assets/PlayerR.gif");
  img4 = loadImage("assets/PlayerU.gif");
  img5 = loadImage("assets/player.png");
  img6 = loadImage("assets/playerL.png");
  img7 = loadImage("assets/playerR.png");
  img8 = loadImage("assets/playerU.png");
  img9 = loadImage("assets/windowskin.png");
  img11 = loadImage("assets/moine1.gif");
  img12 = loadImage("assets/moine2.gif");
  img13 = loadImage("assets/kyoka1.png");
  img14 = loadImage("assets/kyoka2.png");
  img15 = loadImage("assets/kyoka3.png");
  kaio1 = loadImage("assets/kaio1.png");
  kaio1a = loadImage("assets/kaio1a.png");
  kaio2 = loadImage("assets/kaio2.png");
  kaio3 = loadImage("assets/kaio3.png");
  kaio4 = loadImage("assets/kaio4.png");
  bucheron = loadImage("assets/bucheron.gif");
  bucheronFace = loadImage("assets/bucheronFace.gif");
  taverne = loadImage("assets/taverne.png");
  taverne2 = loadImage("assets/taverne2.gif");
  img16 = loadImage("assets/windowskin2.png");
  img17 = loadImage("assets/dameKiyoka1.gif");
  img18 = loadImage("assets/maitreKaio.gif");
  img19 = loadImage("assets/windowskin3.png");
  img20 = loadImage("assets/samurai.gif");
  img21 = loadImage("assets/windowskin4.png");
  img22 = loadImage("assets/Sasha.gif");
  img23 = loadImage("assets/windowskin5.png");
  img24 = loadImage("assets/elise.gif");
  img25 = loadImage("assets/windowskin6.png");
  img26 = loadImage("assets/LaDruse.png");
  img27 = loadImage("assets/windowskin7.png");
  img28 = loadImage("assets/LaMule.png");
  img29 = loadImage("assets/windowskin8.png");
  img30 = loadImage("assets/windowskin9.png");
  windowHokusai = loadImage("assets/windowskinHokusai.png");
  windowAkim = loadImage("assets/windowskinAkim.png");
  windowLicata = loadImage("assets/windowskinLicata.png");
  img31 =  loadImage("assets/mamasan.gif")
  teinte = loadImage("assets/teinte.png");
  teinte2 = loadImage("assets/teinte2.png");
  teinte3 = loadImage("assets/teinte3.png");
  formulaire = loadImage("assets/windowskinA.png");
  ponita = loadImage("assets/ponita.gif");
  ponita1 = loadImage("assets/ponita1.gif");
  fille = loadImage("assets/fille.gif");
  fille1 = loadImage("assets/fille1.gif");
  coffreImg = loadImage("assets/coffre.gif")
  coffreImg2 = loadImage("assets/coffreEN.gif")
  playerCoffre = loadImage("assets/playercoffre.gif")
  oldwoman =  loadImage("assets/oldwoman.gif")
  oldwoman2 =  loadImage("assets/oldwoman2.gif")
  oldwoman3 =  loadImage("assets/oldwoman2.png")
  hokusai = loadImage("assets/hokusai.gif")
  hokusai1 = loadImage("assets/hokusai1.gif")
  hokusaiFace = loadImage("assets/Hokusai.png")
  licata = loadImage("assets/licata.png")
  licata1 = loadImage("assets/licata1.png")
  licataFace = loadImage("assets/licata.gif")
  //dialogueLicata = loadImage("assets/windowskinDialogue.png")
  //dialogueLicata = loadImage("assets/windowskinDialogue.png");
  bar1 = loadImage('assets/BAR1.png')
  bar2 = loadImage('assets/BAR2.png')
  bar3 = loadImage('assets/BAR3.png')
  bar4 = loadImage('assets/BAR4.png')
  bar5 = loadImage('assets/BAR5.png')
  bar6 = loadImage('assets/BAR6.png')
  bar7 = loadImage('assets/BAR7.png')
  bar8 = loadImage('assets/BAR8.png')
  Img5 = loadImage("assets/Tree.png");
  maskDiaporama = loadImage("assets/maskDiaporama.png")
  frameRate(fr);
    // Chargement des images dans le tableau "diaporama"
    for (let i = 1; i <= 7; i++) {
      diaporama[i - 1] = loadImage('assets/imageDiaporama' + i + '.png');
    }
}



function setup() {
  graphics = createGraphics(512, 383);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  bruitage1 = createAudio("assets/Door01.ogg");
  bruitage2 = createAudio("assets/Door02.ogg");
  bruitage3 = createAudio("assets/item.mp3");
  bruitage4 = createAudio("assets/chest.ogg");

  band = createButton("");
  band.position(windowWidth/2 - 360, windowHeight/2 -414);
  band.style('webkitAppearance', 'none'); // enlever le style par défaut du slider
  band.style('appearance', 'none');
  band.style('border', 'none');
  band.style('width', '840px');
  band.style('height', '40px');
  band.style('opacity','0.5');
  band.style("z-index", "200");

  gainSlider = createSlider(0, 1, sliderPosition, 0.00);//volume slider
  gainSlider.input(volume); // appeler la fonction "volume()" chaque fois que la valeur du slider change
  gainSlider.style('color', 'white'); // changer la couleur du texte du slider
  gainSlider.style('outline', 'none'); // enlever le contour du slider
  gainSlider.style('direction', 'rtl');
  gainSlider.position(windowWidth/2 +315, 10);
  gainSlider.style("z-index", "1000");

  muteButton = createButton("");
  muteButton.position(gainSlider.x + gainSlider.width - 10, gainSlider.y -10);
  muteButton.style('webkitAppearance', 'none'); // enlever le style par défaut du slider
  muteButton.style('appearance', 'none');
  muteButton.style('borderRadius', '4px'); // arrondir les coins du slider
  muteButton.style('border', 'none');
  muteButton.style('width', '40px');
  muteButton.style('height', '40px');
  muteButton.style('cursor', 'pointer');
  muteButton.style('background-image', 'url("assets/play.png")');
  muteButton.style("z-index", "1000");
  muteButton.mousePressed(toggleMute);
  
  scrollbarImg = createImg('assets/scrollbar.png');
  scrollbarImg.position(windowWidth/2 +244, windowHeight/2 +167, "absolute");
  scrollbarImg.style("z-index", "-100");

  discordOn = createButton("");
  discordOn.style('webkitAppearance', 'none'); 
  discordOn.style('appearance', 'none');
  discordOn.style('borderRadius', '4px');
  discordOn.style('border', 'none');
  discordOn.style('cursor', 'pointer');
  discordOn.style('background-image', 'url("assets/discordbtn2.png")');
  discordOn.style('width', '0px');
  discordOn.style('height', '0px');
  discordOn.style("z-index", "-100");
  discordOn.position(windowWidth/2 - 360, 0);
  discordOn.mousePressed(toggleDiscord);

  discordOff = createButton("");
  discordOff.style('webkitAppearance', 'none'); 
  discordOff.style('appearance', 'none');
  discordOff.style('borderRadius', '4px');
  discordOff.style('border', 'none');
  discordOff.style('cursor', 'pointer');
  discordOff.style('background-image', 'url("assets/discordbtn.png")');
  discordOff.style('width', '0px');
  discordOff.style('height', '0px');
  discordOff.style("z-index", "-100");
  discordOff.position(windowWidth/2 - 360, 0);
  discordOff.mousePressed(toggleDiscord2);
  
  discordIframe = createDiv();// Créer un div pour le widget Discord et l'ajouter au DOM
  discordIframe.position(windowWidth/2-780, 0);
  discordIframe.style('z-index', '-1000');

  langueFR = createButton("");
  langueFR.style('webkitAppearance', 'none'); 
  langueFR.style('appearance', 'none');
  langueFR.style('borderRadius', '4px');
  langueFR.style('border', 'none');
  langueFR.style('cursor', 'pointer');
  langueFR.style('background-image', 'url("assets/flagFR.png")');
  langueFR.style('width', '60px');
  langueFR.style('height', '40px');
  langueFR.style("z-index", "1000");
  langueFR.position(windowWidth/2 - 480, 0);
  langueFR.style('opacity','1');
  langueFR.mousePressed(langueFRA);

  langueEN = createButton("");
  langueEN.style('webkitAppearance', 'none'); 
  langueEN.style('appearance', 'none');
  langueEN.style('borderRadius', '4px');
  langueEN.style('border', 'none');
  langueEN.style('cursor', 'pointer');
  langueEN.style('background-image', 'url("assets/flagEN.png")');
  langueEN.style('width', '60px');
  langueEN.style('height', '40px');
  langueEN.style("z-index", "1000");
  langueEN.position(windowWidth/2 - 420, 0);
  langueEN.style('opacity','0.7');
  langueEN.mousePressed(langueENG);
  windowResized();
}

function draw() {
  let cnv = createCanvas(960, 3400);
  cnv.position(0, N, "relative");
  currentTime = hour();
  console.log(x,y);

  if (isMuted) {
    sliderPosition = 0;
    gainSlider.value(sliderPosition);  
  } else {
    sliderPosition = 1;
    sliderPosition = gainSlider.value();
  }
  volume();
  
  if (mapping == 1) {
    map1CharacterControl();
    //---CADRE LIMITE---//
    if (x <= 64) {
      x += 5;
    }
    if (x >= 868) {
      x -= 5;
    }
    if (y <= 340) {
      y += 5;
      N -= 5;
    }
    if (y >= 2810) {
      y -= 5;
      N += 5;
    }

    //-------Falaise-------//

    if (y <= 370 && x >= 500) {
      y += 5;
      N -= 5;
    }
    if (y <= 374 && x >= 510) {
      y += 5;
      N -= 5;
    }
    if (y <= 400 && x >= 628) {
      y += 5;
      N -= 5;
    }
    if (y <= 404 && x >= 636) {
      y += 5;
      N -= 5;
    }
    if (y <= 430 && x >= 750) {
      y += 5;
      N -= 5;
    }
    if (y <= 434 && x >= 760) {
      y += 5;
      N -= 5;
    }
    if (y <= 460 && x >= 800) {
      y += 5;
      N -= 5;
    }
    if (y <= 464 && x >= 810) {
      y += 5;
      N -= 5;
    }
    //---//
    if (y <= 370 && x <= 360) {
      y += 5;
      N -= 5;
    }
    if (y <= 374 && x <= 350) {
      y += 5;
      N -= 5;
    }
    if (y <= 400 && x <= 230) {
      y += 5;
      N -= 5;
    }
    if (y <= 404 && x <= 220) {
      y += 5;
      N -= 5;
    }
    if (y <= 430 && x <= 140) {
      y += 5;
      N -= 5;
    }
    if (y <= 434 && x <= 130) {
      y += 5;
      N -= 5;
    }
    if (y <= 460 && x <= 80) {
      y += 5;
      N -= 5;
    }
    if (y <= 464 && x <= 70) {
      y += 5;
      N -= 5;
    }

    //----Tree Gauche----//

    if (y >= 400 && y <= 2300 && x <= 94) {
      x += 5;
    }
    if (y >= 900 && y <= 1100 && x <= 120) {
      x += 5;
    }
    if (y >= 940 && y <= 1100 && x <= 136) {
      x += 5;
    }
    if (y >= 1030 && y <= 1184 && x <= 370) {
      y -= 5;
      N += 5;
    }
    if (y >= 1032 && y <= 1184 && x <= 374) {
      x += 5;
    }
    if (y >= 1028 && y <= 1186 && x <= 370) {
      y += 5;
      N -= 5;
    }
    if (y >= 1100 && y <= 1240 && x <= 256) {
      x += 5;
    }

    if (y >= 1235 && y <= 1300 && x <= 306) {
      y -= 5;
      N += 5;
    }
    if (y >= 1240 && y <= 1300 && x <= 312) {
      x += 5;
    }
    if (y >= 1268 && y <= 1300 && x <= 408) {
      y -= 5;
      N += 5;
    }
    if (y >= 1270 && y <= 1346 && x <= 410) {
      x += 5;
    }
    if (y >= 1280 && y <= 1350 && x <= 408) {
      y += 5;
      N -= 5;
    }
    if (y >= 1280 && y <= 1400 && x <= 372) {
      x += 5;
    }
    if (y >= 1398 && y <= 1400 && x <= 408) {
      y -= 5;
      N += 5;
    }
    if (y >= 1400 && y <= 1478 && x <= 412 && x >= 362) {
      x += 5;
    }
    if (y >= 1400 && y <= 1482 && x <= 408 && x >= 362) {
      y += 5;
      N -= 5;
    }
    if (y >= 1400 && y <= 1480 && x <= 408 && x >= 356) {
      x -= 5;
    }
    if (y >= 1400 && y <= 1455 && x <= 408 && x >= 280) {
      y += 5;
      N -= 5;
    }
    if (y >= 1400 && y <= 1478 && x <= 288) {
      x += 5;
    }
    if (y >= 1400 && y <= 1482 && x <= 284) {
      y += 5;
      N -= 5;
    }
    if (y >= 1400 && y <= 1508 && x <= 254) {
      x += 5;
    }
    if (y >= 1400 && y <= 1512 && x <= 248) {
      y += 5;
      N -= 5;
    }
    if (y >= 1400 && y <= 1538 && x <= 224) {
      x += 5;
    }
    if (y >= 1400 && y <= 1542 && x <= 220) {
      y += 5;
      N -= 5;
    }
    if (y >= 1538 && y <= 1598 && x <= 212) {
      x += 5;
    }
    if (y >= 1538 && y <= 1602 && x <= 208) {
      y += 5;
      N -= 5;
    }
    if (y >= 1538 && y <= 2000 && x <= 160) {
      x += 5;
    }
    if (y >= 1706 && y <= 1738 && x <= 220) {
      y -= 5;
      N += 5;
    }
    if (y >= 1710 && y <= 1740 && x <= 226) {
      x += 5;
    }
    if (y >= 1710 && y <= 1748 && x <= 220) {
      y += 5;
      N -= 5;
    }
    if (y >= 1740 && y <= 1804 && x <= 196) {
      x += 5;
    }
    if (y >= 1740 && y <= 1810 && x <= 190) {
      y += 5;
      N -= 5;
    }
    if (y >= 1800 && y <= 1880 && x <= 188) {
      x += 5;
    }
    if (y >= 1872 && y <= 1900 && x <= 214) {
      y -= 5;
      N += 5;
    }
    if (y >= 1878 && y <= 1920 && x <= 220) {
      x += 5;
    }
    if (y >= 1910 && y <= 1982 && x <= 248) {
      y -= 5;
      N += 5;
    }
    if (y >= 1916 && y <= 1982 && x <= 254) {
      x += 5;
    }
    if (y >= 1974 && y <= 2100 && x <= 302) {
      y -= 5;
      N += 5;
    }
    if (y >= 1980 && y <= 2020 && x <= 308) {
      x += 5;
    }
    if (y >= 2006 && y <= 2100 && x <= 348) {
      y -= 5;
      N += 5;
    }
    if (y >= 2012 && y <= 2104 && x <= 356) {
      x += 5;
    }
    if (y >= 2120 && y <= 2172 && x <= 314) {
      x += 5;
    }
    if (y >= 2166 && y <= 2206 && x <= 380) {
      y -= 5;
      N += 5;
    }
    if (y >= 2172 && y <= 2212 && x <= 384) {
      x += 5;
    }
    if (y >= 2172 && y <= 2218 && x <= 380) {
      y += 5;
      N -= 5;
    }
    if (y >= 2150 && y <= 2244 && x <= 224) {
      x += 5;
    }
    if (y >= 2150 && y <= 2246 && x <= 218) {
      y += 5;
      N -= 5;
    }
    if (y >= 2150 && y <= 2280 && x <= 192) {
      x += 5;
    }
    if (y >= 2150 && y <= 2280 && x <= 186) {
      x += 5;
    }
    if (y >= 2150 && y <= 2306 && x <= 180) {
      y += 5;
      N -= 5;
    }
    if (y >= 2150 && y <= 2332 && x <= 102) {
      x += 5;
    }
    if (y >= 2150 && y <= 2340 && x <= 96) {
      y += 5;
      N -= 5;
    }
    if (y >= 2386 && y <= 2460 && x <= 86) {
      y -= 5;
      N += 5;
    }
    if (y >= 2392 && y <= 2460 && x <= 92) {
      x += 5;
    }
    if (y >= 2460 && y <= 2470 && x <= 96) {
      x += 5;
    }
    if (y >= 2470 && y <= 2480 && x <= 100) {
      x += 5;
    }
    if (y >= 2480 && y <= 2490 && x <= 106) {
      x += 5;
    }
    if (y >= 2500 && y <= 2510 && x <= 112) {
      x += 5;
    }
    if (y >= 2510 && y <= 2516 && x <= 118) {
      x += 5;
    }
    if (y >= 2510 && y <= 2560 && x <= 126) {
      x += 5;
    }
    if (y >= 2530 && y <= 2566 && x <= 120) {
      y += 5;
      N -= 5;
    }
    if (y >= 2560 && y <= 2800 && x <= 96) {
      x += 5;
    }

    //----Tree Droite----//

    if (y >= 0 && y <= 762 && x >= 842) {
      x -= 5;
    }
    if (y >= 0 && y <= 768 && x >= 848) {
      y += 5;
      N -= 5;
    }
    if (y >= 500 && y <= 624 && x >= 800) {
      y -= 5;
      N += 5;
    }
    if (y >= 506 && y <= 624 && x >= 792) {
      x -= 5;
    }
    if (y >= 500 && y <= 630 && x >= 800) {
      y += 5;
      N -= 5;
    }
    if (y >= 842 && y <= 3000 && x >= 848) {
      y -= 5;
      N += 5;
    }
    if (y >= 842 && y <= 3000 && x >= 842) {
      x -= 5;
    }
    if (y >= 1030 && y <= 1184 && x >= 560) {
      y -= 5;
      N += 5;
    }
    if (y >= 1036 && y <= 1184 && x >= 554) {
      x -= 5;
    }
    if (y >= 1036 && y <= 1190 && x >= 560) {
      y += 5;
      N -= 5;
    }
    if (y >= 1100 && y <= 1210 && x >= 704) {
      x -= 5;
    }
    if (y >= 1204 && y <= 1220 && x >= 666) {
      y -= 5;
      N += 5;
    }
    if (y >= 1210 && y <= 1280 && x >= 658) {
      x -= 5;
    }
    if (y >= 1235 && y <= 1300 && x >= 568) {
      y -= 5;
      N += 5;
    }
    if (y >= 1240 && y <= 1300 && x >= 562) {
      x -= 5;
    }
    if (y >= 1266 && y <= 1300 && x >= 522) {
      y -= 5;
      N += 5;
    }
    if (y >= 1270 && y <= 1344 && x >= 516) {
      x -= 5;
    }
    if (y >= 1300 && y <= 1350 && x >= 522) {
      y += 5;
      N -= 5;
    }
    if (y >= 1270 && y <= 1380 && x >= 548) {
      x -= 5;
    }
    if (y >= 1300 && y <= 1386 && x >= 554) {
      y += 5;
      N -= 5;
    }
    if (y >= 1300 && y <= 1450 && x >= 584) {
      x -= 5;
    }
    if (y >= 1398 && y <= 1410 && x >= 522) {
      y -= 5;
      N += 5;
    }
    if (y >= 1404 && y <= 1474 && x >= 516) {
      x -= 5;
    }
    if (y >= 1450 && y <= 1480 && x >= 522) {
      y += 5;
      N -= 5;
    }
    if (y >= 1450 && y <= 1492 && x >= 552) {
      x -= 5;
    }
    if (y >= 1450 && y <= 1500 && x >= 558) {
      y += 5;
      N -= 5;
    }
    if (y >= 1450 && y <= 1564 && x >= 600) {
      x -= 5;
    }
    if (y >= 1532 && y <= 1564 && x >= 586) {
      y -= 5;
      N += 5;
    }
    if (y >= 1540 && y <= 1564 && x >= 580) {
      x -= 5;
    }
    if (y >= 1550 && y <= 1570 && x >= 586) {
      y += 5;
      N -= 5;
    }
    if (y >= 1540 && y <= 1600 && x >= 644) {
      x -= 5;
    }
    if (y >= 1550 && y <= 1606 && x >= 650) {
      y += 5;
      N -= 5;
    }
    if (y >= 1540 && y <= 1634 && x >= 680) {
      x -= 5;
    }
    if (y >= 1550 && y <= 1640 && x >= 686) {
      y += 5;
      N -= 5;
    }
    if (y >= 1540 && y <= 1678 && x >= 704) {
      x -= 5;
    }
    if (y >= 1550 && y <= 1684 && x >= 710) {
      y += 5;
      N -= 5;
    }
    if (y >= 1540 && y <= 1800 && x >= 750) {
      x -= 5;
    }
    if (y >= 1742 && y <= 1900 && x >= 716) {
      y -= 5;
      N += 5;
    }
    if (y >= 1748 && y <= 1900 && x >= 710) {
      x -= 5;
    }
    if (y >= 1826 && y <= 1900 && x >= 660) {
      y -= 5;
      N += 5;
    }
    if (y >= 1832 && y <= 1900 && x >= 654) {
      x -= 5;
    }
    if (y >= 1890 && y <= 1920 && x >= 630) {
      y -= 5;
      N += 5;
    }
    if (y >= 1896 && y <= 1940 && x >= 624) {
      x -= 5;
    }
    if (y >= 1930 && y <= 2000 && x >= 554) {
      y -= 5;
      N += 5;
    }
    if (y >= 1936 && y <= 2100 && x >= 550) {
      x -= 5;
    }
    if (y >= 1974 && y <= 2100 && x >= 524) {
      y -= 5;
      N += 5;
    }
    if (y >= 1980 && y <= 2100 && x >= 518) {
      x -= 5;
    }
    if (y >= 2012 && y <= 2100 && x >= 414) {
      y -= 5;
      N += 5;
    }
    if (y >= 2016 && y <= 2104 && x >= 408) {
      x -= 5;
    }
    if (y >= 2104 && y <= 2112 && x >= 416) {
      x -= 5;
    }
    if (y >= 2100 && y <= 2118 && x >= 408) {
      y += 5;
      N -= 5;
    }
    if (y >= 2104 && y <= 2144 && x >= 460) {
      x -= 5;
    }
    if (y >= 2100 && y <= 2150 && x >= 466) {
      y += 5;
      N -= 5;
    }
    if (y >= 2104 && y <= 2190 && x >= 492) {
      x -= 5;
    }
    if (y >= 2170 && y <= 2190 && x >= 460) {
      y -= 5;
      N += 5;
    }
    if (y >= 2176 && y <= 2190 && x >= 454) {
      x -= 5;
    }
    if (y >= 2190 && y <= 2215 && x >= 460) {
      y += 5;
      N -= 5;
    }
    if (y >= 2176 && y <= 2324 && x >= 544) {
      x -= 5;
    }
    if (y >= 2190 && y <= 2330 && x >= 550) {
      y += 5;
      N -= 5;
    }
    if (y >= 2100 && y <= 2380 && x >= 592) {
      x -= 5;
    }
    if (y >= 2362 && y <= 2390 && x >= 554) {
      y -= 5;
      N += 5;
    }
    if (y >= 2368 && y <= 2402 && x >= 548) {
      x -= 5;
    }
    if (y >= 2368 && y <= 2410 && x >= 554) {
      y += 5;
      N -= 5;
    }
    if (y >= 2390 && y <= 2468 && x >= 578 && x <= 694) {
      x -= 5;
    }
    if (y >= 2450 && y <= 2474 && x >= 584 && x <= 694) {
      y += 5;
      N -= 5;
    }
    if (y >= 2420 && y <= 2590 && x >= 782) {
      x -= 5;
    }
    if (y >= 2450 && y <= 2596 && x >= 788) {
      y += 5;
      N -= 5;
    }
    if (y >= 2638 && y <= 2655 && x >= 816) {
      y -= 5;
      N += 5;
    }
    if (y >= 2644 && y <= 2682 && x >= 810) {
      x -= 5;
    }
    if (y >= 2650 && y <= 2688 && x >= 816) {
      y += 5;
      N -= 5;
    }
    if (y >= 2724 && y <= 2900 && x >= 812) {
      y -= 5;
      N += 5;
    }
    if (y >= 2730 && y <= 2900 && x >= 806) {
      x -= 5;
    }

    //----panneau 1----//

    if (y >= 770 && y <= 800 && x >= 328 && x <= 372) {
      x -= 5;
    }
    if (y >= 770 && y <= 800 && x >= 334 && x <= 378) {
      x += 5;
    }
    if (y >= 770 && y <= 806 && x >= 334 && x <= 372) {
      y += 5;
      N -= 5;
    }
    if (y >= 764 && y <= 800 && x >= 334 && x <= 372) {
      y -= 5;
      N += 5;
    }



    //-panneau3-//

    if (y >= 2104 && y <= 2140 && x <= 348) {
      x += 5;
    }
    if (y >= 2120 && y <= 2146 && x <= 348) {
      y += 5;
      N -= 5;
    }
    //--//
    //----panneau 4 -----///

    if (y >= 2420 && y <= 2560 && x >= 738) {
      x -= 5;
    }
    if (y >= 2450 && y <= 2566 && x >= 744) {
      y += 5;
      N -= 5;
    }

    //-------panneau 5------//
    if (x >= 204 && x <= 254 && y >= 2632 && y <= 2658) {
      x += 5;
    }
    if (x >= 196 && x <= 246 && y >= 2624 && y <= 2658) {
      x -= 5;
    }
    if (x >= 204 && x <= 246 && y >= 2632 && y <= 2666) {
      y += 5;
      N -= 5;
    }
    if (x >= 204 && x <= 246 && y >= 2632 && y <= 2658) {
      y -= 5;
      N += 5;
    }

    //------MAISON-------//

    if (x >= 240 && x <= 368 && y >= 668 && y <= 774) {
      x += 5;
    }
    if (x >= 230 && x <= 360 && y >= 668 && y <= 774) {
      x -= 5;
    }
    if (x >= 200 && x <= 364 && y >= 680 && y <= 769) {
      y += 5;
      N -= 5;
    }
    if (x >= 240 && x <= 364 && y >= 670 && y <= 760) {
      y -= 5;
      N += 5;
    }
    if (x >= 270 && x <= 364 && y >= 680 && y <= 774) {
      y += 5;
      N -= 5;
    }

    //------Maison 2 ------///

    if (y >= 2420 && y <= 2530 && x >= 612 && x <= 694) {
      x -= 5;
    }
    if (y >= 2450 && y <= 2536 && x >= 620 && x <= 694) {
      y += 5;
      N -= 5;
    }
    if (y >= 2420 && y <= 2530 && x >= 620 && x <= 700) {
      x += 5;
    }
    if (y >= 2420 && y <= 2530 && x >= 712) {
      x -= 5;
    }
    if (y >= 2450 && y <= 2536 && x >= 718) {
      y += 5;
      N -= 5;
    }

     //------TAVERNE-------//

     if (x >= 108 && x <= 282 && y >= 2530 && y <= 2622) {
      x += 5;
    }
    if (x >= 98 && x <= 274 && y >= 2530 && y <= 2622) {
      x -= 5;
    }
    if (x >= 108 && x <= 274 && y >= 2530 && y <= 2630) {
      y += 5;
      N -= 5;
    }
    if (x >= 108 && x <= 274 && y >= 2522 && y <= 2622) {
      y -= 5;
      N += 5;
    }
    //---Porte taverne---//
    if (x >= 108 && x <= 178 && y >= 2540 && y <= 2632) {
      x += 5;
    }
    if (x >= 98 && x <= 170 && y >= 2540 && y <= 2632) {
      x -= 5;
    }
    if (x >= 108 && x <= 170 && y >= 2540 && y <= 2640) {
      y += 5;
      N -= 5;
    }
    if (x >= 108 && x <= 170 && y >= 2532 && y <= 2632) {
      y -= 5;
      N += 5;
    }

    if (x >= 218 && x <= 282 && y >= 2540 && y <= 2632) {
      x += 5;
    }
    if (x >= 210 && x <= 274 && y >= 2540 && y <= 2632) {
      x -= 5;
    }
    if (x >= 218 && x <= 274 && y >= 2540 && y <= 2640) {
      y += 5;
      N -= 5;
    }
    if (x >= 218 && x <= 174 && y >= 2532 && y <= 2632) {
      y -= 5;
      N += 5;
    }

    //-------Arbre Taverne------//
    if (x >= 230 && x <= 346 && y >= 2598 && y <= 2628) {
      x += 5;
    }
    if (x >= 222 && x <= 338 && y >= 2598 && y <= 2628) {
      x -= 5;
    }
    if (x >= 230 && x <= 338 && y >= 2598 && y <= 2636) {
      y += 5;
      N -= 5;
    }
    if (x >= 230 && x <= 338 && y >= 2590 && y <= 2628) {
      y -= 5;
      N += 5;
    }
    //-------Rocher Taverne------//
    if (x >= 266 && x <= 280 && y >= 2620 && y <= 2636) {
      x += 5;
    }
    if (x >= 258 && x <= 288 && y >= 2610 && y <= 2636) {
      x -= 5;
    }
    if (x >= 266 && x <= 280 && y >= 2620 && y <= 2644) {
      y += 5;
      N -= 5;
    }
    if (x >= 266 && x <= 280 && y >= 2620 && y <= 2636) {
      y -= 5;
      N += 5;
    }
    //------BASSIN-------//

    if (x >= 70 && x <= 248 && y >= 668 && y <= 864) {
      x += 5;
    }
    if (x >= 80 && x <= 240 && y >= 668 && y <= 864) {
      x -= 5;
    }
    if (x >= 80 && x <= 244 && y >= 680 && y <= 870) {
      y += 5;
      N -= 5;
    }
    if (x >= 90 && x <= 244 && y >= 669 && y <= 860) {
      y -= 5;
      N += 5;
    }

    //---arbres----//

    if (y >= 564 && y <= 624 && x <= 120) {
      y -= 5;
      N += 5;
    }
    if (y >= 570 && y <= 624 && x <= 126) {
      x += 5;
    }
    if (y >= 564 && y <= 630 && x <= 120) {
      y += 5;
      N -= 5;
    }
    //

    if (y >= 646 && y <= 720 && x >= 136 && x <= 176) {
      y -= 5;
      N += 5;
    }
    if (y >= 652 && y <= 720 && x >= 130 && x <= 176) {
      x -= 5;
    }
    if (y >= 652 && y <= 720 && x >= 136 && x <= 182) {
      x += 5;
    }

    //

    if (y >= 544 && y <= 590 && x >= 516 && x <= 572) {
      y -= 5;
      N += 5;
    }
    if (y >= 550 && y <= 590 && x >= 510 && x <= 572) {
      x -= 5;
    }
    if (y >= 550 && y <= 590 && x >= 516 && x <= 578) {
      x += 5;
    }
    if (y >= 550 && y <= 596 && x >= 516 && x <= 572) {
      y += 5;
      N -= 5;
    }

    //
    if (y >= 672 && y <= 716 && x >= 708 && x <= 762) {
      y -= 5;
      N += 5;
    }
    if (y >= 678 && y <= 716 && x >= 702 && x <= 762) {
      x -= 5;
    }
    if (y >= 678 && y <= 716 && x >= 708 && x <= 768) {
      x += 5;
    }
    if (y >= 678 && y <= 722 && x >= 708 && x <= 762) {
      y += 5;
      N -= 5;
    }

    //

    if (y >= 740 && y <= 782 && x >= 772 && x <= 828) {
      y -= 5;
      N += 5;
    }
    if (y >= 746 && y <= 782 && x >= 766 && x <= 828) {
      x -= 5;
    }
    if (y >= 746 && y <= 782 && x >= 772 && x <= 834) {
      x += 5;
    }
    if (y >= 746 && y <= 788 && x >= 772 && x <= 828) {
      y += 5;
      N -= 5;
    }

    //

    if (y >= 854 && y <= 910 && x >= 740 && x <= 798) {
      y -= 5;
      N += 5;
    }
    if (y >= 860 && y <= 910 && x >= 734 && x <= 798) {
      x -= 5;
    }
    if (y >= 860 && y <= 910 && x >= 740 && x <= 804) {
      x += 5;
    }
    if (y >= 860 && y <= 916 && x >= 740 && x <= 798) {
      y += 5;
      N -= 5;
    }

    //

    if (y >= 928 && y <= 960 && x >= 240 && x <= 272) {
      y -= 5;
      N += 5;
    }
    if (y >= 934 && y <= 960 && x >= 234 && x <= 272) {
      x -= 5;
    }
    if (y >= 934 && y <= 960 && x >= 240 && x <= 278) {
      x += 5;
    }
    if (y >= 934 && y <= 966 && x >= 240 && x <= 272) {
      y += 5;
      N -= 5;
    }
    //

    //-------enclo--------//

    if (y >= 820 && y <= 930 && x >= 556 && x <= 724) {
      y -= 5;
      N += 5;
    }
    if (y >= 826 && y <= 930 && x >= 550 && x <= 724) {
      x -= 5;
    }
    if (y >= 826 && y <= 930 && x >= 556 && x <= 730) {
      x += 5;
    }
    if (y >= 826 && y <= 936 && x >= 556 && x <= 724) {
      y += 5;
      N -= 5;
    }

    //---------moine1--------//
    if (y >= 1592 && y <= 1630 && x >= 282 && x <= 328) {
      y -= 5;
      N += 5;
    }
    if (y >= 1598 && y <= 1630 && x >= 276 && x <= 328) {
      x -= 5;
    }
    if (y >= 1598 && y <= 1630 && x >= 282 && x <= 334) {
      x += 5;
    }
    if (y >= 1598 && y <= 1636 && x >= 282 && x <= 328) {
      y += 5;
      N -= 5;
    }

    //---------Samurai--------//

    if (y >= 2342 && y <= 2382 && x >= 96 && x <= 152) {
      y -= 5;
      N += 5;
    }
    if (y >= 2348 && y <= 2382 && x >= 90 && x <= 152) {
      x -= 5;
    }
    if (y >= 2342 && y <= 2382 && x >= 96 && x <= 158) {
      x += 5;
    }
    if (y >= 2342 && y <= 2388 && x >= 96 && x <= 152) {
      y += 5;
      N -= 5;
    }

    //---------Chrysasiers--------//

    if (y >= 2342 && y <= 2382 && x >= 192 && x <= 266) {
      y -= 5;
      N += 5;
    }
    if (y >= 2348 && y <= 2382 && x >= 186 && x <= 266) {
      x -= 5;
    }
    if (y >= 2342 && y <= 2382 && x >= 192 && x <= 272) {
      x += 5;
    }
    if (y >= 2342 && y <= 2388 && x >= 192 && x <= 266) {
      y += 5;
      N -= 5;
    }

    //---------Sasha & Pikachu--------//

    if (y >= 2342 && y <= 2382 && x >= 296 && x <= 370) {
      y -= 5;
      N += 5;
    }
    if (y >= 2348 && y <= 2382 && x >= 290 && x <= 370) {
      x -= 5;
    }
    if (y >= 2342 && y <= 2382 && x >= 296 && x <= 376) {
      x += 5;
    }
    if (y >= 2342 && y <= 2388 && x >= 296 && x <= 370) {
      y += 5;
      N -= 5;
    }

    //---------Aventurière--------//

    if (y >= 2584 && y <= 2620 && x >= 460 && x <= 586) {
      y -= 5;
      N += 5;
    }
    if (y >= 2590 && y <= 2620 && x >= 454 && x <= 586) {
      x -= 5;
    }
    if (y >= 2590 && y <= 2620 && x >= 460 && x <= 592) {
      x += 5;
    }
    if (y >= 2590 && y <= 2626 && x >= 460 && x <= 586) {
      y += 5;
      N -= 5;
    }

    //---------Kaio--------//

    if (y >= 1672 && y <= 1712 && x >= 494 && x <= 542) {
      y -= 5;
      N += 5;
    }
    if (y >= 1680 && y <= 1712 && x >= 486 && x <= 542) {
      x -= 5;
    }
    if (y >= 1680 && y <= 1712 && x >= 494 && x <= 548) {
      x += 5;
    }
    if (y >= 1680 && y <= 1724 && x >= 494 && x <= 542) {
      y += 5;
      N -= 5;
    }

    //----Kaio affichage---//


    //---------combat--------//

    if (y >= 1740 && y <= 1808 && x >= 428 && x <= 620) {
      y -= 5;
      N += 5;
    }
    if (y >= 1748 && y <= 1808 && x >= 420 && x <= 620) {
      x -= 5;
    }
    if (y >= 1748 && y <= 1808 && x >= 428 && x <= 628) {
      x += 5;
    }
    if (y >= 1748 && y <= 1816 && x >= 428 && x <= 620) {
      y += 5;
      N -= 5;
    }

    //-------Dame Kyoka------//

    if (y >= 0 && y <= 360 && x >= 444 && x <= 500) {
      x -= 5;
    }
    if (y >= 0 && y <= 360 && x >= 450 && x <= 500) {
      x += 5;
    }
    if (y >= 0 && y <= 366 && x >= 450 && x <= 500) {
      y += 5;
      N -= 5;
    }

    //----Kyoka affichage---//


    //------SKY-----//

    o += 1;
    g += 0.8;
    if (u <= -120) {
      u += 1.5;
    }
    if (u >= 120) {
      u -= 1.5;
    }
    if (o >= width) {
      o = -450;
    }

    if (g >= width) {
      g = -600;
    } //------SEA-----//

    if (t <= -120) {
      t += 2;
    }
    if (t >= 120) {
      t -= 2;
    }

    //-----Bird1------//

    e += 4;
    f += 2;
    if (e >= width) {
      e = -800;
      f = 400;
    }

    //---MAP TRANSFER--/

    //-----transfere vers chambre------//
    if (x >= 255 && x <= 264 && y >= 680 && y <= 778) {
      y = 744;
      N = -400;
      song.playMode("sustain");
      song.pause();
      mapping = 2;
    
    }
    //-----transfere temple------//
    if (x >= 700 && x <= 720 && y >= 2460 && y <= 2476) {
      y = 2450;
      x = 634;

      song.playMode("sustain");
      song.pause();
      song2.loop();
      song2.playMode("restart");
      song2.play();
      mapping = 3;

    }

    //-----transfere taverne------//
    if (x >= 178 && x <= 210 && y >=2620  && y <= 2640) {
      y = 2614;
      x = 192;
      N = -2306;
      oldwoman.reset();
      hokusai.reset();
      hokusai1.reset();
      licataFace.reset();
      taverne2.reset();
      song.playMode("sustain");
      song.pause();
      song3.loop();
      song3.playMode("restart");
      song3.play();
      mapping = 4 ;

    }
    
    //--End--//
  }

 //------------MAP2------------//
  if (mapping == 2) {
    map2CharacterControl();
    
    //---MAP 2 limite---//

    if (x <= 98) {
      x += 5;
    }
    if (x >= 424) {
      x -= 5;
    }
    if (y <= 510) {
      y += 5;
    }
    if (x >= 88 && x <= 240 && y >= 742) {
      y -= 5;
    }
    if (x >= 290 && x <= 424 && y >= 742) {
      y -= 5;
    }

    //---lit---///

    if (x >= 362 && x <= 420 && y >= 694 && y <= 705) {
      x += 5;
    }
    if (x >= 354 && x <= 410 && y >= 694 && y <= 705) {
      x -= 5;
    }
    if (x >= 362 && x <= 410 && y >= 694 && y <= 712) {
      y += 5;  
    }
    if (x >= 362 && x <= 410 && y >= 682 && y <= 705) {
      y -= 5; 
    }

    //---table---///

    if (x >= 145 && x <= 225 && y >= 600 && y <= 640) {
      x += 5;
    }
    if (x >= 135 && x <= 215 && y >= 600 && y <= 640) {
      x -= 5;
    }
    if (x >= 145 && x <= 215 && y >= 600 && y <= 650) {
      y += 5;      
    }
    if (x >= 145 && x <= 215 && y >= 590 && y <= 640) {
      y -= 5;     
    }
    //---vase---///

    if (x >= 110 && x <= 165 && y >= 710 && y <= 1000) {
      x += 5;
    }
    if (x >= 100 && x <= 150 && y >= 710 && y <= 1000) {
      x -= 5;
    }
    if (x >= 110 && x <= 150 && y >= 710 && y <= 1000) {
      y += 5;      
    }
    if (x >= 110 && x <= 160 && y >= 688 && y <= 1000) {
      y -= 5;     
    }
      //---vase2---///

    if (x >= 90 && x <= 160 && y >= 715 && y <= 1000) {
      x += 5;
    }
    if (x >= 80 && x <= 150 && y >= 715 && y <= 1000) {
      x -= 5;
    }
    if (x >= 90 && x <= 150 && y >= 715 && y <= 1000) {
      y += 5;     
    }
    if (x >= 90 && x <= 160 && y >= 704 && y <= 1000) {
      y -= 5;     
    }
      //---bambou---///

    if (x >= 90 && x <= 190 && y >= 728 && y <= 1000) {
      x += 5;
    }
    if (x >= 80 && x <= 180 && y >= 728 && y <= 1000) {
      x -= 5;
    }
    if (x >= 90 && x <= 180 && y >= 728 && y <= 1000) {
      y += 5;       
    }
    if (x >= 90 && x <= 180 && y >= 720 && y <= 1000) {
      y -= 5;      
    }
      //---bambou2---///

    if (x >= 340 && x <= 388 && y >= 728 && y <= 1000) {
      x += 5;
    }
    if (x >= 330 && x <= 380 && y >= 728 && y <= 1000) {
      x -= 5;
    }
    if (x >= 340 && x <= 380 && y >= 728 && y <= 1000) {
      y += 5;       
    }
    if (x >= 340 && x <= 380 && y >= 720 && y <= 1000) {
      y -= 5;     
    }
     //---enclos maison sud---///

    if (x >= 370 && x <= 600 && y >= 620 && y <= 620) {
      x += 5;
    }
    if (x >= 355 && x <= 600 && y >= 620 && y <= 620) {
      x -= 5;
    }
    if (x >= 370 && x <= 600 && y >= 620 && y <= 626) {
      y += 5;
          
    }
    if (x >= 370 && x <= 600 && y >= 606 && y <= 620) {
      y -= 5;
         
    }

    //---enclos maison sud2---///

    if (x >= 280 && x <= 350 && y >= 580 && y <= 590) {
      x += 5;
    }
    if (x >= 270 && x <= 340 && y >= 580 && y <= 590) {
      x -= 5;
    }
    if (x >= 280 && x <= 340 && y >= 580 && y <= 600) {
      y += 5;
          
    }
    if (x >= 280 && x <= 340 && y >= 560 && y <= 590) {
      y -= 5;
         
    }

    //---enclos maison ouest---///

    if (x >= 280 && x <= 296 && y >= 200 && y <= 590) {
      x += 5;
    }
    if (x >= 270 && x <= 280 && y >= 200 && y <= 590) {
      x -= 5;
    }
    if (x >= 280 && x <= 280 && y >= 200 && y <= 600) {
      y += 5;
          
    }
    if (x >= 280 && x <= 280 && y >= 200 && y <= 590) {
      y -= 5;
         
    }
    //---enclos maison est---///

    if (x >= 426 && x <= 600 && y >= 550 && y <= 620) {
      x += 5;
    }
    if (x >= 412 && x <= 600 && y >= 550 && y <= 620) {
      x -= 5;
    }
    if (x >= 426 && x <= 600 && y >= 550 && y <= 626) {
      y += 5;
          
    }
    if (x >= 426 && x <= 600 && y >= 540 && y <= 620) {
      y -= 5;
         
    }
    //---meuble nord---///

    if (x <= 250 && y <= 530) {
      x += 5;
    }
    if (x <= 240 && y <= 540) {
      y += 5;
    }
    if (x >= 290 && y <= 530) {
      x += 5;
    }
    if (x >= 300 && y <= 540) {
      y += 5;
    }
    //---MAP2 TRANSFER vers map 1--/

    if (y >= 752) {
      y = 780;
      x = 256;
      N = -446;

      cloud2.reset();
      cloud1.reset();
      bg.reset();
      img12.reset();
      ponita1.reset();
      fille1.reset();
      battle1.reset();
      combat2.reset();
      combat1.reset();
      battle.reset();
      ponita.reset();
      fille.reset();
      bucheron.reset();
      bucheronFace.reset();
      img11.reset();
      bird1.reset();

      song.loop();
      song.playMode("restart");
      song.play();
      mapping = 1;
    }
  }

    //------------MAP3------------//

  if (mapping == 3) {

    map3CharacterControl();

    //limite MAP3//

    if (x <= 486) {
      x += 5;
    }
    if (x >= 780) {
      x -= 5;
    }
    if (y <= 2036) {
      y += 5;
      N -= 5;
    }
    if (x >= 486 && x <= 588 && y >= 2440) {
      y -= 5;
      N += 5;
    }
    if (x >= 674 && x <= 780 && y >= 2440) {
      y -= 5;
      N += 5;
    }

    //----bord Gauche---//

    if (y >= 2044 && y <= 2090 && x <= 513) {
      y -= 5;
      N += 5;
    }
    if (y >= 2050 && y <= 2096 && x <= 513) {
      y += 5;
      N -= 5;
    }
    if (y >= 2050 && y <= 2090 && x <= 519) {
      x += 5;
    }

    //

    if (y >= 2204 && y <= 2250 && x <= 513) {
      y -= 5;
      N += 5;
    }
    if (y >= 2210 && y <= 2256 && x <= 513) {
      y += 5;
      N -= 5;
    }
    if (y >= 2210 && y <= 2250 && x <= 519) {
      x += 5;
    }

    //

    if (y >= 2364 && y <= 2410 && x <= 513) {
      y -= 5;
      N += 5;
    }
    if (y >= 2370 && y <= 2416 && x <= 513) {
      y += 5;
      N -= 5;
    }
    if (y >= 2370 && y <= 2410 && x <= 519) {
      x += 5;
    }

    //
    //----bord Droit---//

    if (y >= 2044 && y <= 2090 && x >= 754) {
      y -= 5;
      N += 5;
    }
    if (y >= 2050 && y <= 2096 && x >= 754) {
      y += 5;
      N -= 5;
    }
    if (y >= 2050 && y <= 2090 && x >= 748) {
      x -= 5;
    }

    //

    if (y >= 2204 && y <= 2250 && x >= 754) {
      y -= 5;
      N += 5;
    }
    if (y >= 2210 && y <= 2256 && x >= 754) {
      y += 5;
      N -= 5;
    }
    if (y >= 2210 && y <= 2250 && x >= 748) {
      x -= 5;
    }

    //

    if (y >= 2364 && y <= 2410 && x >= 754) {
      y -= 5;
      N += 5;
    }
    if (y >= 2370 && y <= 2416 && x >= 754) {
      y += 5;
      N -= 5;
    }
    if (y >= 2370 && y <= 2410 && x >= 748) {
      x -= 5;
    }

    //-----flamme----//

    if (y >= 2057 && y <= 2102 && x >= 532 && x <= 738) {
      y -= 5;
      N += 5;
    }
    if (y >= 2062 && y <= 2102 && x >= 528 && x <= 738) {
      x -= 5;
    }
    if (y >= 2062 && y <= 2102 && x >= 532 && x <= 740) {
      x += 5;
    }
    if (y >= 2062 && y <= 2106 && x >= 532 && x <= 738) {
      y += 5;
      N -= 5;
    }

    //-----Panneau credit----//

    if (y >= 2046 && y <= 2100 && x >= 574 && x <= 690) {
      y -= 5;
      N += 5;
    }
    if (y >= 2050 && y <= 2100 && x >= 570 && x <= 690) {
      x -= 5;
    }
    if (y >= 2050 && y <= 2100 && x >= 574 && x <= 694) {
      x += 5;
    }
    if (y >= 2050 && y <= 2100 && x >= 574 && x <= 690) {
      y += 5;
      N -= 5;
    }
    
    
    
       //-----LA DRUSE----//

    if (y >= 2126 && y <= 2190 && x >= 650 && x <= 720) {
      y -= 5;
      N += 5;
    }
    if (y >= 2130 && y <= 2190 && x >= 646 && x <= 720) {
      x -= 5;
    }
    if (y >= 2130 && y <= 2190 && x >= 650 && x <= 724) {
      x += 5;
    }
    if (y >= 2130 && y <= 2196 && x >= 650 && x <= 720) {
      y += 5;
      N -= 5;
    }

    //-----LA MULE----//

    if (y >= 2212 && y <= 2262 && x >= 546 && x <= 606) {
      y -= 5;
      N += 5;
    }
    if (y >= 2224 && y <= 2262 && x >= 542 && x <= 606) {
      x -= 5;
    }
    if (y >= 2224 && y <= 2262 && x >= 546 && x <= 610) {
      x += 5;
    }
    if (y >= 2224 && y <= 2266 && x >= 546 && x <= 606) {
      y += 5;
      N -= 5;
    }
    
    //---MAP3 TRANSFER--/

    if (y >= 2460) {
      y = 2485;
      x = 704;

      cloud2.reset();
      cloud1.reset();
      bg.reset();
      img12.reset();
      ponita1.reset();
      fille1.reset();
      battle1.reset();
      combat2.reset();
      combat1.reset();
      battle.reset();
      ponita.reset();
      fille.reset();
      bucheron.reset();
      bucheronFace.reset();
      img11.reset();
      bird1.reset();

      song2.playMode("sustain");
      song2.pause();
      song.loop();
      song.playMode("restart");
      song.play();

      mapping = 1;
    }

    //-------//
  }

  //------------MAP4------------//

  if (mapping == 4) {

    map4CharacterControl();

        //---MAP 4 limite---//
        //---mur---//
        if (x <= 46) {
          x += 5;
        }
        if (x >= 338) {
          x -= 5;
        }
        if (y <= 2400) {
          y += 5;
          N -= 5;
        }
        if (x >= 40 && x <= 170 && y >= 2608) {
          y -= 5;
          N += 5;
        }
        if (x >= 220 && x <= 360 && y >= 2608) {
          y -= 5;
          N += 5;
        }
        //---meuble--//

        //---(table gauche)---//
        if (x >= 60 && x <= 140 && y >= 2522 && y <= 2572) {
          x += 5;
        }
        if (x >= 52 && x <= 132 && y >= 2522 && y <= 2572) {
          x -= 5;
        }
        if (x >= 60 && x <= 132 && y >= 2522 && y <= 2580) {
          y += 5;
          N -= 5;
        }
        if (x >= 60 && x <= 132 && y >= 2516 && y <= 2572) {
          y -= 5;
          N += 5;
        }
        //---(Licata)---//
        if (x >= 0 && x <= 120 && y >= 2550 && y <= 2580) {
          y += 5;
          N -= 5;
        }
        if (x >= 0 && x <= 120 && y >= 2536 && y <= 2572) {
          y -= 5;
          N += 5;
        }

        //---(table droite)---//
        if (x >= 253 && x <= 336 && y >= 2522 && y <= 2572) {
          x += 5;
        }
        if (x >= 244 && x <= 328 && y >= 2522 && y <= 2572) {
          x -= 5;
        }
        if (x >= 252 && x <= 700 && y >= 2522 && y <= 2580) {
          y += 5;
          N -= 5;
        }
        if (x >= 252 && x <= 700 && y >= 2516 && y <= 2572) {
          y -= 5;
          N += 5;
        }

        //---(comptoire)---//
        if (x >= 66 && x <= 290 && y >= 2454 && y <= 2476) {
          x += 5;
        }
        if (x >= 58 && x <= 282 && y >= 2454 && y <= 2476) {
          x -= 5;
        }
        if (x >= 66 && x <= 282 && y >= 2454 && y <= 2488) {
          y += 5;
          N -= 5;
        }
        if (x >= 66 && x <= 282 && y >= 2446 && y <= 2476) {
          y -= 5;
          N += 5;
        }
        if (x >= 250 && x <= 290 && y >= 2000 && y <= 2470) {
          x += 5;
        }
        //---(vase gauche)---//
        if (x >= 0 && x <= 76 && y >= 0 && y <= 2420) {
          x += 5;
        }
        if (x >= 0 && x <= 70 && y >= 0 && y <= 2420) {
          x -= 5;
        }
        if (x >= 0 && x <= 70 && y >= 0 && y <= 2430) {
          y += 5;
          N -= 5;
        }
        if (x >= 0 && x <= 70 && y >= 0 && y <= 2420) {
          y -= 5;
          N += 5;
        }

        //---armoire et cheminée et coffre)---//
        if (x >= 100 && x <= 476 && y >= 0 && y <= 2420) {
          x += 5;
        }
        if (x >= 86 && x <= 470 && y >= 0 && y <= 2420) {
          x -= 5;
        }
        if (x >= 100 && x <= 470 && y >= 0 && y <= 2430) {
          y += 5;
          N -= 5;
        }
        if (x >= 100 && x <= 470 && y >= 0 && y <= 2420) {
          y -= 5;
          N += 5;
        }

        //---MAP4 TRANSFER vers map 1--/

      if (y >= 2618) {
         y = 2645;
         x = 190;
         N = -2311;

         cloud2.reset();
         cloud1.reset();
         bg.reset();
         img12.reset();
         ponita1.reset();
         fille1.reset();
         battle1.reset();
         combat2.reset();
         combat1.reset();
         battle.reset();
         ponita.reset();
         fille.reset();
         bucheron.reset();
         bucheronFace.reset();
         img11.reset();
         bird1.reset();

         song3.playMode("sustain");
         song3.pause();
         song.loop();
         song.playMode("restart");
         song.play();
         mapping = 1;
        }
        //--transfere coffre--//
        if (grandCoffre == true){
       if (x >= 200 && x <= 470 && y >= 0 && y <= 2440) {   
        mapping = 5;
            
          
        }
      }
  }
  //------------MAP5------------//

  if (mapping == 5) {
      openchest();
    
  }
    //------------MAP6------------//

    if (mapping == 6) {
      mamasan();
    
  }

}


// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⢀⣴⡿⢿⣿⣿⠿⠻⠿⢿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀          
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⠟⠋⣴⣦⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠟⠛⠛⢿⡟⠛⠿⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀           
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣧⠀⠀⠀⠀⠀⣠⡖⠀⠀⢀⣸⡿⠁⠀⠘⠿⣿⣶⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠲⢔⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⡀⠀⠀⠀⢸⡇⠀⢀⣴⣿⣿⠃⠀⠀⠀⠀⢀⣼⣿⣿⣿⣉⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠪⣛⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡇⠀⠀⠀⠊⠀⣶⣿⣿⣿⣿⠀⠀⠀⠀⣴⣿⣿⣿⡿⠿⠿⢿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⡝⢷⣄⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⣴⣿⠟⠉⠉⢿⠀⠀⠀⣀⣼⣿⣿⣿⣿⣿⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣶⣦⣀⡙⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢦⠙⣷⣄⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⣼⠟⠁⠀⠀⠀⠈⣧⢀⣾⣿⣿⣿⣿⣿⣿⣿⡀⢀⣾⣿⣿⣿⣿⠖⠀⠀⠉⠉⠛⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⢳⡈⢿⣦⠀⠀⠀
// ⠀⠀⠀⢀⡾⠁⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⣿⣿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀⢣⠈⢿⣧⠀⠀
// ⠀⠀⣰⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣮⣻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    ⠘⡆⠘⣿⣇⠀
// ⠀⠀⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠳⢯⣛⣛⣥⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀**⠀FONCTION **⠀⠀⠀⠀⠀⠀     ⠀⢷⠀⢹⣿⡄
// ⠀⢰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣹⣿⣿⣿⣿⣿⡟⠁⠀⠀⠉⠂⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀     ⢸⠀⠸⣿⡇
// ⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⣾⣿⠿⠿⠿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀      ⢸⠀⠀⣿⣿
// ⢸⡇⠀⠀⠀⢠⠞⠓⢄⠀⠀⢀⣴⣿⡟⢱⢆⠀⠀⢀⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀     ⡼⠀⠀⣿⣿
// ⣸⡇⠀⢀⡴⠁⠀⠀⢀⣷⣿⣿⣿⣿⡀⠃⠈⠀⢀⢚⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    ⠀⢀⡇⠀⠀⣿⣿
// ⣿⣇⠔⠁⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣶⣶⣾⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀    ⢸⠀  ⣿⣿
// ⣿⣿⣿⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄            ⠈⠻⣿⣦⡀ 




///MAP1 FONCTION///
function map1CharacterControl() {

  if (a == 1) {
    map1Environnement()
    maitreKaio1();
    image(img5, x, y);
  }

  if (a == 2) {
    map1Environnement()
    maitreKaio1();
    image(img6, x, y);
  }

  if (a == 3) {
    map1Environnement()
    maitreKaio1();
    image(img7, x, y);
  }

  if (a == 4) {
    map1Environnement()
    maitreKaio1();
    image(img8, x, y);
  }

  if (keyIsDown(LEFT_ARROW)) {
    map1Environnement()
    maitreKaio1();
    image(img2, x, y);
    x -= 5;
    a = 2;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    map1Environnement()
    maitreKaio1();
    image(img3, x, y);
    x += 5;
    a = 3;
  }

  if (keyIsDown(UP_ARROW)) {
    map1Environnement()
    maitreKaio1();
    image(img4, x, y);
    y -= 5;
    u = y -220 - (y*2*0.33);
    t = y-250 - (y*2*0.3);
    a = 4;
    N += 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    map1Environnement()
    maitreKaio1();
    image(img1, x, y);
    y += 5;
    u = y -220 - (y*2*0.33);
    t = y -250 - (y*2*0.3);
    a = 1;
    N -= 5;
  }
  maitreKaio();
  image(combat1, 400, 1700);
  image(battle, 116, 2316);
  image(ponita, 484, 2576);
  image(fille, 484, 2576);
  image(bucheron, 420, 2830);
  image(img11, 300, 1600);
  image(Img5, 0, 0);
  image(bird1, e, f);
  map1Affichage();
  
  displayImage();
}

function map1Environnement(){
  clear();
  noTint();
  image(sky, 0, u);
  image(sea, 0, t);
  image(cloud2, g, u);
  image(cloud1, o, u);
  background(bg);
  image(shadow, x + 2, y + 34);
  image(img12, 300, 1600);
  dameKiyoka();
  image(shadow, e + 4, f + 200);
  image(ponita1, 484, 2576);
  image(fille1, 484, 2576);
  image(battle1, 116, 2316);
  image(combat2, 400, 1700);
}

function map1Affichage() {
  
  // Dame Kiyoka dialogue
  if ((y >= 0 && y <= 354 && x >= 432 && x <= 500) || 
      (y >= 360 && y <= 380 && x >= 448 && x <= 500)) {
    noTint();
    image(img17, 600, y + 30);
    image(img16, 10, y + 130);

    fill(30, 250);
    if (FR == 255) {
      text("Oh! Un visiteur! Quelle région magnifique,", 484, y + 226);
      text("n'est ce pas? Mais.... ", 484, y + 252);
      text("Une grande menace pèse sur nous...", 484, y + 278);
      text("Pourras tu nous venir en aide?!", 484, y + 304);
    }
    if (EN == 255) {
      text("Oh! A stranger! What a wonderful country,", 484, y + 226);
      text("isn't it? But.... ", 484, y + 252);
      text("A terrible threatens approach.", 484, y + 278);
      text("Will you be strong enough to help us?!", 484, y + 304);
    }
  }

  // Maitre Kaïo dialogue
  if ((y >= 1660 && y <= 1680 && x >= 482 && x <= 550) || 
      (y >= 1690 && y <= 1716 && x >= 458 && x <= 510) || 
      (y >= 1680 && y <= 1716 && x >= 510 && x <= 560) || 
      (y >= 1722 && y <= 1760 && x >= 482 && x <= 550)) {
    noTint();
    image(img18, 590, y + 30);
    image(img19, 10, y + 130);

    fill(30, 250);
    if (FR == 255) {
      text("Si tu deviens fort tu pourras monter en grade", 484, y + 226);
      text("et devenir Samuraï, Ninja ou Moine.", 484, y + 252);
      text("Sache que la force d'un Pokemon dépend", 484, y + 278);
      text("aussi des choix de son dresseur. ", 484, y + 304);
    }
    if (EN == 255) {
      text("If you become strong enough you will be", 484, y + 226);
      text("promoted as a Samurai, a Ninja or a Monk.", 484, y + 252);
      text("Remember that the Pokemon's strengh", 484, y + 278);
      text("depend on his trainer's choices.", 484, y + 304);
    }
  }

  // Sakura dialogue
  if (y >= 2566 && y <= 2650 && x >= 430 && x <= 610) {
  
    noTint();
    image(img24, 584, y + 22);
    image(img25, 10, y + 130);

    fill(30, 250);
    if (FR == 255) {
      text("Dans cette aventure, il faut du temps ", 484, y + 226);
      text("pour que ton pokemon t'obéisses.", 484, y + 252);
      text("Seuls les liens d'amitier et la persévérance", 484, y + 278);
      text("en feront un bon compagnon de combat. ", 484, y + 304);
    }
    if (EN == 255) {
      text("In this adventure, it takes time", 484, y + 226);
      text("for your pokemon to obey you.", 484, y + 252);
      text("Only friendship bonds and perseverance", 484, y + 278);
      text("will make it a good battle companion.", 484, y + 304);
    }
  }

    // bucheron dialogue
    if (y >= 2780 && y <= 3000 && x >= 410 && x <= 500) {
      noTint();
      image(bucheronFace, 554, y + 46);
      image(windowAkim, 10, y + 130);
  
      fill(30, 250);
      if (FR == 255) {
        text("La zone de téléchargement se trouve au Sud. ", 484, y + 226);
        text("Je vais nous faire une belle route !", 484, y + 252);
        text("Mais y a encore pas mal d'arbres à abattre.", 484, y + 278);
        text("Ca prendra surment du temps... ", 484, y + 304);
      }
      if (EN == 255) {
        text("The download area is located to the South.", 484, y + 226);
        text("I'll create a nice road for us!", 484, y + 252);
        text("But there are still a lot of trees to cut down.", 484, y + 278);
        text("It will probably take some time...", 484, y + 304);
      }
    }

  // Sasha dialogue
  if (y >= 2316 && y <= 2410 && x >= 280 && x <= 394) {

    noTint();
    image(img22, 534, y + 22);
    image(img23, 10, y + 130);
    fill(30, 250);
    if (FR == 255) {
      text("Tiens bon Chrysacier !", 484, y + 248);
      text("Armure au maximun !", 484, y + 284);
    }
    if (EN == 255) {
      text("Metapod hold on !", 484, y + 248);
      text("Maximum harden !", 484, y + 284);
    }
  }
          
  // Samurai dialogue
  if (y >= 2316 && y <= 2410 && x >= 70 && x <= 180) {

    noTint();
    image(img20, 582, y + 24);
    image(img21, 10, y + 130);

    fill(30, 250);
    if (FR == 255) {
      text("Chrysacier c'est toi le meilleur !", 484, y + 248);
      text("Attaques armure, comme lui !", 484, y + 284);
    }
    if (EN == 255) {
      text("You are the stronger Metapod !", 484, y + 248);
      text("Harden, like him !", 484, y + 284);
    }
  }

  //panneau1 Affichage
  if (y >= 782 && y <= 818 && x >= 318 && x <= 388) {
    noTint();
    image(img9, 0, y + 150);
    fill(255, 150);
    if (FR == 255) {
      text("Observez, étudiez et attrapez des Pokémon", 484, y + 226);
      text("sauvages durant une période révolue de ", 484, y + 252);
      text("l'Histoire du Japon, afin de compléter le ", 484, y + 278);
      text("tout premier Pokédex de la région.", 484, y + 304);
    }
    if (EN == 255) {
      text("Survey, catch, and research wild Pokémon", 484, y + 234);
      text("in a long-gone era of Japan", 484, y + 260);
      text("to complete the region’s first Pokédex. ", 484, y + 286);
    }
  }
  
  //panneau2 Affichage
  if (y >= 1460 && y <= 1490 && x >= 346 && x <= 425) {
    noTint();
    image(img9, 0, y + 150);
    fill(255, 150);
    if (FR == 255) {
      text("Nous sommes en 1570. A cette époque,", 484, y + 226);
      text("il n'est pas rare de se voir provoquer", 484, y + 252);
      text("en duel. Vos pokemons ne vous seront", 484, y + 278);
      text("d'aucun secours dans un combat au sabre.", 484, y + 304);
    }
    if (EN == 255) {
      text("In 1570, it's usual to be challenged", 484, y + 234);
      text("to a dual. But be carefull, your pokemon", 484, y + 260);
      text("will be helpless during a sword fight.", 484, y + 286);
    }
  }
  
  //panneau3 Affichage
  if (y >= 2104 && y <= 2160 && x >= 300 && x <= 356) {
    noTint();
    image(img9, 0, y + 150);
    fill(255, 150);
    if (FR == 255) {
      text("Affrontez des dresseurs redoutable dans", 484, y + 226);
      text("des combats aussi difficiles qu'épiques.", 484, y + 252);
      text("Menez vos Pokemon à la victoire contre de", 484, y + 278);
      text("grands champions pour remporter leurs royaume.", 484, y + 304);
    }
    if (EN == 255) {
      text("Face formidable trainers in", 484, y + 226);
      text("battles as challenging as they are epic.", 484, y + 252);
      text("Lead your Pokemon to victory against", 484, y + 278);
      text("great champions to win their kingdom.", 484, y + 304);
    }
  }

  //panneau4 Affichage
  if (y >= 2410 && y <= 2584 && x >= 724 && x <= 790) {
      
    if (!pseudoInput) {
      
      formulation = createImg("assets/windowskinA.png");
      formulation.position(windowWidth/2 -480, windowHeight/2 +80, "absolute");
      formulation.style("z-index", "800");
      cachemisere = createImg("assets/windowskinB.png");
      cachemisere.position(windowWidth/2 +230, windowHeight/2 +80, "absolute");
      cachemisere.style("z-index: 1100");
      pseudoInput = createInput().size(180, 20);
      pseudoInput.position(windowWidth/2 - 250, windowHeight/2 + 160, "absolute");
      pseudoInput.style("font-family", "pkmndp");
      pseudoInput.style("font-size", "16px");
      pseudoInput.style('opacity', '0.6');
      pseudoInput.style("z-index", "1000");
      pseudoInput.elt.placeholder = 'Pseudo';
      commentInput = createElement('textarea').size(180, 100);
      commentInput.position(windowWidth/2 - 250, windowHeight/2 + 194, "absolute");
      commentInput.style("font-family", "pkmndp");
      commentInput.style("font-size", "16px");
      commentInput.style('opacity', '0.65');
      commentInput.style("resize", "none");
      commentInput.style("z-index", "1000");
      if (FR == 255) {
      commentInput.attribute("placeholder", "N'hésitez pas à laisser un commentaire ici!");
      }
      if (EN == 255) {
      commentInput.attribute("placeholder", "Feel free to leave a comment here!");
      }
      if (FR == 255) {
      sendButton = createButton('Envoyer');
      }
      if (EN == 255) {
      sendButton = createButton('Send');
      }
      sendButton.position(windowWidth/2 - 250, windowHeight/2 + 310, "absolute");
      sendButton.style("font-family", "pkmndp");
      sendButton.style('color', '#e9dcd1');
      sendButton.style("border", "5px outset inset solid #9e7150");
      sendButton.style('background-color', '#a08066');
      sendButton.style("z-index", "1000");
      sendButton.mousePressed(envoyerSaisies);
      afficherCommentaires()
      scrollbarbox();
      scrollbarImg.style("z-index", "1200");
    } 
    } else {
      // Cacher ou supprimer le formulaire de commentaire
      if (pseudoInput) {
        affichageCommentaires = false; // mettre à jour la variable booléenne
        pseudoInput.remove();
        commentInput.remove();
        sendButton.remove();
        formulation.remove();
        cachemisere.remove();
        scrollbarImg.style("z-index", "-100");
        scrollbarImg.position(windowWidth/2 +244, windowHeight/2 +167, "absolute");
        pseudoInput = null;
        commentInput = null;
        sendButton = null;
        formulation = null;
        cachemisere = null;
        suppCommentaires();
      }
    }
    if (!pseudoInput) {
      affichageCommentaires = false; // mettre à jour la variable booléenne
      suppCommentaires();
    }
    ///panneau5 Affichage
    if (x >= 190 && x <= 270 && y >= 2632 && y <= 2680) {
      noTint();
      image(img9, 0, y + 150);
      fill(255, 150);
      if (FR == 255) {
        text("Vos actions et vos choix peuvent influer", 484, y + 226);
        text("sur le comportement des autres habitants.", 484, y + 252);
        text("Si vous avez mauvaise réputation, certaine", 484, y + 278);
        text("personnes peuvent devenir très méfiante.", 484, y + 304);
      }
      if (EN == 255) {
        text("Your actions and choices can influence", 484, y + 226);
        text("the behavior of other inhabitants.", 484, y + 252);
        text("If you have a bad reputation, some", 484, y + 278);
        text("people may become very suspicious.", 484, y + 304);
      }

    }
}

function maitreKaio() {
  if (y >= 1660 && y <= 1680 && x >= 482 && x <= 550) {
    image(kaio4, 500, 1680);
  } else if (y >= 1690 && y <= 1716 && x >= 458 && x <= 510) {
    image(kaio2, 500, 1680);
  } else if (y >= 1680 && y <= 1716 && x >= 510 && x <= 560) {
    image(kaio3, 500, 1680);
  } else if (y >= 1722 && y <= 1760 && x >= 482 && x <= 550) {
    image(kaio1a, 500, 1680);
  } else {
    image(kaio1a, 500, 1680);
  }
}

function maitreKaio1() {
  if (y >= 1660 && y <= 1680 && x >= 482 && x <= 550) {

  } else if  (y >= 1690 && y <= 1716 && x >= 458 && x <= 510) {

  } else if  (y >= 1680 && y <= 1716 && x >= 510 && x <= 560) {

  } else if (y >= 1722 && y <= 1760 && x >= 482 && x <= 550) {
  image(kaio1, 500, 1680);
  } else {
  image(kaio1, 500, 1680);
  }
}

function dameKiyoka() {
  if (y >= 0 && y <= 354 && x >= 432 && x <= 500) {

      image(img14, 474, 330);

  } else if (y >= 366 && y <= 380 && x >= 448 && x <= 500) {
    
      image(img15, 474, 330);
    
  } else {

    image(img13, 474, 330);
  }
}

///MAP2 FONCTION///
function map2CharacterControl() {

  if (a == 1) {
    map2Environnement();
    image(img5, x, y);
  }

  if (a == 2) {
    map2Environnement();
    image(img6, x, y);
  }

  if (a == 3) {
    map2Environnement();
    image(img7, x, y);
  }

  if (a == 4) {
    map2Environnement();
    image(img8, x, y);
  }

  if (keyIsDown(LEFT_ARROW)) {
    map2Environnement();
    image(img2, x, y);
    x -= 5;
    a = 2;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    map2Environnement();
    image(img3, x, y);
    x += 5;
    a = 3;
  }

  if (keyIsDown(UP_ARROW)) {
    map2Environnement();
    image(img4, x, y);
    y -= 5;
    a = 4; 
  }

  if (keyIsDown(DOWN_ARROW)) {
    map2Environnement();
    image(img1, x, y);
    y += 5;
    a = 1;
  }
  if (y <= 700 && y >= 640){
  image(chambre2, 86, 439);
  } 
  if (y <= 622 ){
  image(chambre3, 86, 439);
  }else{
  image(chambre1, 86, 439); 
  }
  map2Affichage();
  
  
}

function map2Environnement(){
  clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
}

function map2Affichage() {
  
  fill(255, 255);
  if (FR == 255) {
    text("Bienvenue sur le site officiel de", 700, 460);
    text("POKEMON OCARINA OF TIME", 700, 510);
    text("le fan-game français inspiré de l'univers", 700, 560);
    text("Nitendo (Pokemon, Zelda, Fire Emblem... ).", 700, 590);
    text("Si tu veux en savoir d'avantage ", 700, 620);
    text("sur le jeu, utilise les touches fléchées", 700, 650);
    text("du clavier pour sortir de la maison", 700, 680);
    text("et explorer ce nouveau monde!", 700, 710);
  }
  if (EN == 255) {
    text("Welcome to the official website", 700, 460);
    text("POKEMON OCARINA OF TIME", 700, 510);
    text("the french fangame inspired by the", 700, 560);
    text("Nitendo universe (Pokemon, Zelda... ).", 700, 590);
    text("If you are interested to know more", 700, 620);
    text("about it, use the arrow keys to explore ", 700, 650);
    text("the vast world outside this house!", 700, 680);
  }
}

///MAP3 FONCTION///
function map3CharacterControl() {

  if (a == 1) {
    map3Environnement();
    laMule1();
    image(img5, x, y);
  }

  if (a == 2) {
    map3Environnement();
    laMule1();
    image(img6, x, y);
  }

  if (a == 3) {
    map3Environnement();
    laMule1();
    image(img7, x, y);
  }

  if (a == 4) {
    map3Environnement();
    laMule1();
    image(img8, x, y);
  }

  if (keyIsDown(LEFT_ARROW)) {
    map3Environnement();
    laMule1();
    image(img2, x, y);
    x -= 5;
    a = 2;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    map3Environnement();
    laMule1();
    image(img3, x, y);
    x += 5;
    a = 3;
  }

  if (keyIsDown(UP_ARROW)) {
    map3Environnement();
    laMule1();
    image(img4, x, y);
    y -= 5;
    a = 4; 
    N += 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    map3Environnement();
    laMule1();
    image(img1, x, y);
    y += 5;
    a = 1;
    N -= 5;
  }

  laMule();
  image(ladruse2, 670,2140);
  image(temple2, 357, 1922); 
  tint(255, z);
  image(light1, 410, 1972);
  z += Z;
  if (z > 250) {
  Z = -0.4;
  }
  if (z < 230) {
  Z = +0.3;
  }
  map3Affichage();
}

function map3Environnement(){
  clear();
  noTint();
  background(temple);
  image(temple3, 553, 2098);
  image(shadow, x + 2, y + 34);
  image(dshadow, 670,2140);
  image(ladruse, 670,2140);
  image(mshadow, 570,2230);
}

function map3Affichage() {
  
  // LaDruse dialogue 
  if (y >= 2118 && y <= 2214 && x >= 638 && x <= 736) {  
    noTint();
    image(img26, 744, y + 18);
    image(img27, 180, y + 130);

    fill(30, 250);
    if (FR == 255) {
      text("Salut ! Je suis le scénariste.", 654, y + 248);
      text("Je te prépare une intrigue du tonnerre !", 654, y + 284);
    }
    if (EN == 255) {
      text("Hi! I'm the scriptwriter.", 654, y + 248);
      text("I'm preparing a thunderous plot for you!", 654, y + 284);
    }
  }
  if ((y >= 2262 && y <= 2282 && x >= 526 && x <= 626) || 
      (y >= 2212 && y <= 2262 && x >= 546 && x <= 626) || 
      (y >= 2212 && y <= 2262 && x >= 526 && x <= 606) || 
      (y >= 2198 && y <= 2238 && x >= 542 && x <= 608)) {
    noTint();
      image(img28, 744, y + 12);
      image(img29, 180, y + 130);

    fill(30, 250);
    if (FR == 255) {
      text("Salut ! Moi c'est La Mule, le chef de projet.", 648, y + 226);
      text("Je suis en charge d'un peu tout ici. ", 648, y + 252);
      text("Nous allons sortir une démo jouable rapidement,", 648, y + 278);
      text("je suis sur qu'elle te plaira beaucoup !", 648, y + 304);
    }
    if (EN == 255) {
      text("Hi! I'm The Mule, the project manager.", 648, y + 226);
      text("I'm in charge of pretty much everything here.", 648, y + 252);
      text("We're going to release a playable demo soon,", 648, y + 278);
      text("I'm sure you will like it a lot!", 648, y + 304);
    }
      
      image(bar4, 86, y -180);
      image(bar3, 86, y - 80);
      image(bar4, 86, y + 20);
      image(bar5, 86, y + 120);
      image(bar5, 86, y + 220);
      image(bar8, 86, y + 320);
                 fill(255, 255);
    if (FR == 255) {
      text("AVANCEMENT DE LA DEMO", 204, y-250);
      text("Mapping", 204, y-200);
      text("Sprite", 204, y-100);
      text("Interface", 204, y);
      text("Ecriture de l'histoire", 204, y+100);
      text("Event making", 204, y+200);
      text("OST", 204, y+300);
      }
    if (EN == 255) {
      text("BEGIN TO THE DEMO", 204, y-250);
      text("Mapping", 204, y-200);
      text("Sprite", 204, y-100);
      text("Interface", 204, y);
      text("Story", 204, y+100);
      text("Event making", 204, y+200);
      text("OST", 204, y+300);
    }
  }
}

function laMule() {
  if (y >= 2262 && y <= 2282 && x >= 526 && x <= 626){
    image(lamule2, 570,2230);
  } else if (y >= 2220 && y <= 2262 && x >= 546 && x <= 626){
    image(lamule3, 570,2230);
  } else if (y >= 2220 && y <= 2262 && x >= 526 && x <= 606){
    image(lamule4, 570,2230);
  } else if (y >= 2198 && y <= 2238 && x >= 542 && x <= 608){
    image(lamule5, 570,2230);
  } else {
    image(lamule2, 570,2230);
  }
}

function laMule1() {
  if (y >= 2262 && y <= 2282 && x >= 526 && x <= 626){
    image(lamule, 570,2230);
  } else if (y >= 2220 && y <= 2262 && x >= 546 && x <= 626){
    
  } else if (y >= 2220 && y <= 2262 && x >= 526 && x <= 606){
    
  } else if (y >= 2198 && y <= 2238 && x >= 542 && x <= 608){
   
  } else {
    image(lamule, 570,2230);
  }
}


///MAP4 FONCTION///
function map4CharacterControl() {

  if (a == 1) {
    map4Environnement();
    image(img5, x, y);
  }

  if (a == 2) {
    map4Environnement();
    image(img6, x, y);
  }

  if (a == 3) {
    map4Environnement();
    image(img7, x, y);
  }

  if (a == 4) {
    map4Environnement();
    image(img8, x, y);
  }

  if (keyIsDown(LEFT_ARROW)) {
    map4Environnement();
    image(img2, x, y);
    x -= 5;
    a = 2;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    map4Environnement();
    image(img3, x, y);
    x += 5;
    a = 3;
  }

  if (keyIsDown(UP_ARROW)) {
    map4Environnement();
    image(img4, x, y);
    y -= 5;
    a = 4; 
    N += 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    map4Environnement();
    image(img1, x, y);
    y += 5;
    a = 1;
    N -= 5;
  }
  image(taverne2,79,2368);
  image(hokusai, 303, 2534);
  image(licata, 49, 2560);
  tint(255, z);
  image(light2, 33, 2334);
  z += Z;
  if (z > 250) {
    Z = -0.4;
  }
  if (z < 230) {
    Z = +0.3;
  }
  diaporamaHokusai();
  image(maskDiaporama, 414, 2308);
  map4Affichage();

}

function map4Environnement(){
  clear();
  noTint();
  background(taverne);
  image(shadow, x + 2, y + 34);
  image(hokusai1, 303, 2534);
  image(oldwoman, 181, 2450);
  image(licata1, 49, 2560);
}

// ---- MAP4 GLOBAL VARIABLES ---- //
let npcText = "Je connais le passé et le future de ce récit.<br/>Nul n'a de secret pour moi! Pourtant...Qui es tu?<br/>Et que me veux-tu étranger?"; 
let npcTextEN = "I know the past and the future of this story.<br/>No one has a secret for me! Yet...Who are you?<br/>And what do you want from me stranger?";
let npcResponseBox;
let firstMeeting = true;
async function tavernCounter(playerMessage) {
  const BASE_URL_API = 'https://ocarina-api-244855f29b92.herokuapp.com/';
  console.log(playerMessage);
  const config = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: `Tu es Licata, un poète, un barde merveilleux,
                                      Assis à ta table dans la taverne de Mama-San.
                                      En face du peintre Hokusai et de son Queulorior.

                                      Les devellopeurs sont dans le temple,
                                      Il leurs faudra de l'aide pour finir le jeu.
                                      Tes haïkus racontent l'avancement du jeu.
                                      Le jeu n'est pas encore près.
          
                                      Le monde est peuplé de Pokémon,
                                      Un Japon féodal, 16e siècle, avant la guerre de Sekigahara.
                                      Oda Nabunaga est le méchant, libérant le pouvoir secret des Zarbis.
          
                                      Combats pokémons tour à tour, combats au sabre aussi,
                                      Nouvelles formes, nouvelles évolutions, plus de 300 Pokémon.
                                      Quatre généraux surpuissants à vaincre.
          
                                      Retrouve Celebie, voyage dans le temps,
                                      Sauve ton royaume, ta famille.
                                      Crée des liens d'amitié solides avec les Pokémon.
          
                                      Le jeu sera bientôt téléchargeable,
                                      Au sud de la plaine, en dehors de la taverne.
                                      Un bûcheron y travail ardemment.

                                      Reste mystérieux et poétique dans tes réponses.
                                      Tu repond uniquement par des haikus de trois phrases.
                                      Quelques soit la question.` 
            },
            { role: 'user', content: `${playerMessage}` },
        ]
      }),
  };

  const response = await fetch(`${BASE_URL_API}api/chat`, config);

  if (!response.ok) {
    console.error('API response was not OK', response);
    return; // Ou gérer l'erreur d'une autre manière
  }

  const data = await response.json();
  const npcResponse = data['message'];
  console.log("GPT Response ===>", npcResponse);
  return npcResponse;
}

function formatHaiku(str) {
  var lines = str.split(/, (?=[A-Z])/g);
  for (var i = 0; i < lines.length; i++) {
    lines[i] = lines[i] + '\n';  // utilise '\n' au lieu de '<br/>'
  }
  return lines.join('');
}


function map4Affichage() {
        //---Affichage mama-san---//
  if (y >= 2200 && y <= 2500 && x >= 170 && x <= 220) {
    noTint();
    image(img31, 550, y +20);
    image(img30, 10, y + 130);
    fill(30, 250);
    if (FR == 255) {
      text("Depuis que les développeurs sont installés ici,", 476, y + 230);
      text("je vois arriver plein de nouveaux voyageurs.", 476, y + 266);
      text("Et ça, c'est bon pour les affaires !", 476, y + 302);
    }
    if (EN == 255) {
      text("Since the developers settled here,", 476, y + 230);
      text("I've been seeing a lot of new travelers arriving.", 476, y + 266);
      text("And that's good for business!", 476, y + 302);
    }
    
  }
  //---Affichage licata---//
  if (y >= 2520 && y <= 2600 && x >= 0 && x <= 90){
    noTint();
    //image(dialogueLicata, 370, y -140 );
    image(licataFace, 550 +186, y +40);
    image(windowLicata, 10 +186, y + 130);
  
    fill(30, 250);

    if (!commentInput2) {
      console.log(firstMeeting);
      if (!npcResponseBox) {
        npcResponseBox = createElement('p');
        npcResponseBox.style("white-space", "pre-wrap");
        npcResponseBox.style("font-family", "pkmndp");
        npcResponseBox.style("font-size", "24px");
        npcResponseBox.style("color", "#000000");
        npcResponseBox.style("background-color", "#D9D9D9");
        npcResponseBox.style("width", "540px"); // Change this to fit your needs
        npcResponseBox.style("height", "100px"); // Change this to fit your needs
        npcResponseBox.style("overflow", "auto");
        npcResponseBox.style("z-index", "1000");
        npcResponseBox.style("text-align", "center");
        npcResponseBox.style("padding-top", "5px");
        npcResponseBox.position(windowWidth/2 - 85 , 515);
      }


      dialogueLicata = createImg("assets/windowskinDialogue.png");
      dialogueLicata.position(windowWidth/2 - 110 , 172 );
      dialogueLicata.style("z-index", "800");
      commentInput2 = createElement('textarea').size(280, 180);
      commentInput2.position(windowWidth/2 - 52 , 224 );
      commentInput2.style("font-family", "pkmndp");
      commentInput2.style("font-size", "24px");
      commentInput2.style('opacity', '0.65');
      commentInput2.style("resize", "none");
      commentInput2.style("z-index", "1000");
      commentInput2.attribute("placeholder", "...?");
      sendButton2 = createButton('Envoyer').size(282, 20);
      sendButton2.position(windowWidth/2 -50 , 420);
      sendButton2.style("font-family", "pkmndp");
      commentInput2.style('opacity', '0.65');
      sendButton2.style("z-index", "1000");
      sendButton2.mousePressed(async () => {
        const playerMessage = commentInput2.value();
        
        // Vider le champ de texte après l'envoi
        commentInput2.value('');
        
        // Affiche trois points de suspension en alternance pendant que le PNJ "réfléchit"
        const thinkingDots = ['.', '..', '...'];
        let i = 0;
        const intervalId = setInterval(() => {
          npcText = `Laisse moi un instant que je trouve mes mots <br/>${thinkingDots[i % 3]}`
          npcTextEN = `Give me a moment to find my words <br/>${thinkingDots[i % 3]}`
          if (FR == 255) {
          npcResponseBox.html(npcText); // Remplacez cette ligne par la ligne qui affiche le texte dans la boîte de dialogue du PNJ
          }
          if (EN == 255) {
            npcResponseBox.html(npcTextEN); // Remplacez cette ligne par la ligne qui affiche le texte dans la boîte de dialogue du PNJ
          }
          redraw();
          i += 1;
        }, 500);
        
        const npcResponse = await tavernCounter(playerMessage);
        
        // Arrête l'affichage des points de suspension une fois que le PNJ a fini de "réfléchir"
        clearInterval(intervalId);
        
        // Affiche la réponse du PNJ
        let formattedText = formatHaiku(npcResponse); // ici, 50 est la longueur maximale d'une ligne
        console.log(formattedText);
        npcText = formattedText;
        console.log(npcText);
        // Remplacez cette ligne par la ligne qui affiche le texte dans la boîte de dialogue du PNJ
        npcResponseBox.html(npcText);

        redraw();
      });

      // Juste après que vous créez `npcResponseBox`
      if (firstMeeting) {
        console.log('First meeting'); 
        if (FR == 255) {
          npcResponseBox.html("Je connais le passé et le future de ce récit.<br/>Nul n'a de secret pour moi! Pourtant...Qui es tu?<br/>Et que me veux-tu étranger?");
        }
        if (EN == 255) {
          npcResponseBox.html("I know the past and the future of this story.<br/>No one has a secret for me! Yet...Who are you?<br/>And what do you want from me stranger?");
        }
        firstMeeting = false;
      } else {
        console.log('Not first meeting');
        if (FR == 255) {
        npcResponseBox.html("Tiens te revoilà ! Que puis je faire pour toi ?");
        }
        if (EN == 255) {
          npcResponseBox.html("Hey, here you are again! What can I do for you?");
        }
      }


    }
  } else {
  // Cacher ou supprimer le formulaire de commentaire
    if (commentInput2) {
      commentInput2.remove();
      sendButton2.remove();
      dialogueLicata.remove();
      npcResponseBox.remove();
      npcResponseBox = null;
      commentInput2 = null;
      sendButton2 = null;
      dialogueLicata = null;
    }
  }

  //---Affichage hokusai---//
  if (x >= 110 && x <= 200 && y >= 2350 && y <= 2460) {
    mapping = 6;
  }

  if (x >= 280 && x <= 316 && y >= 2500 && y <= 2550) {
    noTint();
    image(hokusaiFace, 550+186, y +20);
    image(windowHokusai, 10+186, y + 130);
    fill(30, 250);
    if (FR == 255) {
      text("Avec Queulorior nous avons parcouru", 476+186, y + 230);
      text("la region et réalisé quelques chef-d'oeuvre.", 476+186, y + 266);
      text("Je te laisse admirer !", 476+186, y + 302);
    }
    if (EN == 255) {
      text("With Smeargle, we have traveled", 476+186, y + 230);
      text("the region and created some masterpieces.", 476+186, y + 266);
      text("I'll let you admire them!", 476+186, y + 302);
    }
  }
}

function openchest() {
  if (FR == 255){
  a = 4;
  map4Environnement();
  image(coffreImg,0, 2285);
  image(playerCoffre, x, y-4);
  image(taverne2,79,2368);
  image(hokusai, 303, 2534);
  image(licata, 49, 2560);
  tint(255, z);
  image(light2, 33, 2334);
  z += Z;
  if (z > 250) {
    Z = -0.4;
  }
  if (z < 230) {
    Z = +0.3;
  }
  song3.playMode("sustain");
  song3.pause();
  bruitage1.play();
  if (millisStart === -1) {
    millisStart = millis();
   
  }
  if (millis() - millisStart >= 200) {
    bruitage4.play();
  }
  if (millis() - millisStart >= 1200) {
    bruitage3.play();
    bruitage1.pause();
  }
  if (millis() - millisStart >= 4500) {
    bruitage1.pause();
    bruitage4.pause();
    bruitage2.play();
  }
  if (millis() - millisStart >= 5000) {
    bruitage1.pause();
    bruitage2.pause();
    bruitage3.pause();
    bruitage4.pause();
    song3.play();
    discordOn.style('width', '60px');
    discordOn.style('height', '40px');
    discordOn.style("z-index: 1200");
    discordOn.position(windowWidth/2 - 360, 0);
    grandCoffre = false;
    a = 1;
    mapping = 4;
    
  }
  }
  if (EN == 255){
    a = 4;
    map4Environnement();
    image(coffreImg2,0, 2285);
    image(playerCoffre, x, y-4);
    image(taverne2,79,2368);
    image(hokusai, 303, 2534);
    image(licata, 49, 2560);
    tint(255, z);
    image(light2, 33, 2334);
    z += Z;
    if (z > 250) {
      Z = -0.4;
    }
    if (z < 230) {
      Z = +0.3;
    }

    song3.playMode("sustain");
    song3.pause();
    bruitage1.play();
    if (millisStart === -1) {
      millisStart = millis();
    }
    if (millis() - millisStart >= 200) {
      bruitage4.play();
    }
    if (millis() - millisStart >= 1300) {
      bruitage3.play();
      bruitage1.pause();
    }
    if (millis() - millisStart >= 4500) {
      bruitage1.pause();
      bruitage4.pause();
      bruitage2.play();
    }
    if (millis() - millisStart >= 5000) {
      bruitage1.pause();
      bruitage2.pause();
      bruitage3.pause();
      bruitage4.pause();
      song3.play();
      discordOn.style('width', '60px');
      discordOn.style('height', '40px');
      discordOn.style("z-index: 1200");
      discordOn.position(windowWidth/2 - 360, 0);
      grandCoffre = false;
      a = 1;
      mapping = 4;
      
    }
    }
}

function mamasan(){
  
  a = 3;
  clear();
  noTint();
  background(taverne);
  image(shadow, x + 2, y + 34);
  image(hokusai1, 303, 2534);
  image(img7, x, y);
  image(taverne2,79,2368);
  image(hokusai, 303, 2534);
  image(licata1, 49, 2560);
  image(licata, 49, 2560);
  image(oldwoman2, 181, 2419);
  tint(255, z);
  image(light2, 33, 2334);
  z += Z;
  if (z > 250) {
    Z = -0.4;
  }
  if (z < 230) {
    Z = +0.3;
  }
  noTint();
          image(img31, 550, y +20);
          image(img30, 10, y + 130);
          fill(30, 250);
          if (FR == 255) {
     text("Hé là gamin !", 476, y + 226);
    text("Qui t'as autorisé à passer ce comptoir? ", 476, y + 252);
    text("Allez ouste ! Sors moi de là !", 476, y + 280);
    text("Sinon je te tire par les deux oreilles !", 476, y + 308);
          }
          if (EN == 255) {
            text("Hey there kid!", 476, y + 226);
            text("Who authorized you to pass this counter?", 476, y + 252);
            text("Come on, get out of here! ", 476, y + 280);
            text("Otherwise, I'm going to drag you out of here.", 476, y + 308);
          }
  if (millisStart === -1) {
    millisStart = millis();
   
  }
  if (millis() - millisStart >= 1000) {
    clear();
  noTint();
  background(taverne);
  image(shadow, x + 2, y + 34);
  image(hokusai1, 303, 2534);
  image(img7, x, y);
  image(taverne2,79,2368);
  image(hokusai, 303, 2534);
  image(licata1, 49, 2560);
  image(licata, 49, 2560);
  image(oldwoman3, 181, 2419);
  tint(255, z);
  image(light2, 33, 2334);
  z += Z;
  if (z > 250) {
    Z = -0.4;
  }
  if (z < 230) {
    Z = +0.3;
  }
  noTint();
  image(img31, 550, y +20);
  image(img30, 10, y + 130);
  fill(30, 250);
  if (FR == 255) {
    text("Hé là gamin !", 476, y + 226);
    text("Qui t'as autorisé à passer ce comptoir? ", 476, y + 252);
    text("Allez ouste ! Sors moi de là !", 476, y + 280);
    text("Sinon je te tire par les deux oreilles !", 476, y + 308);
  }
  if (EN == 255) {
    text("Hey there kid!", 476, y + 226);
    text("Who authorized you to pass this counter?", 476, y + 252);
    text("Come on, get out of here! ", 476, y + 280);
    text("Otherwise, I'm going to drag you out of here.", 476, y + 308);
  }
  }
  if (millis() - millisStart >= 2000) {
  clear();
  noTint();
  background(taverne);
  image(shadow, x + 2, y + 34);
  image(hokusai1, 303, 2534);
  image(img3, x, y);
  image(taverne2,79,2368);
  image(hokusai, 303, 2534);
  image(licata1, 49, 2560);
  image(licata, 49, 2560);
  image(oldwoman3, 181, 2419);
  tint(255, z);
  image(light2, 33, 2334);
  z += Z;
  if (z > 250) {
    Z = -0.4;
  }
  if (z < 230) {
    Z = +0.3;
  }
  if (x>= 60){
  x -= 2;}
  noTint();
  image(img31, 550, y +20);
  image(img30, 10, y + 130);
  fill(30, 250);
  if (FR == 255) {
    text("Hé là gamin !", 476, y + 226);
    text("Qui t'as autorisé à passer ce comptoir? ", 476, y + 252);
    text("Allez ouste ! Sors moi de là !", 476, y + 280);
    text("Sinon je te tire par les deux oreilles !", 476, y + 308);
  }
  if (EN == 255) {
    text("Hey there kid!", 476, y + 226);
    text("Who authorized you to pass this counter?", 476, y + 252);
    text("Come on, get out of here! ", 476, y + 280);
    text("Otherwise, I'm going to drag you out of here.", 476, y + 308);
  }
  }
  if (millis() - millisStart >= 2800) {
    a = 1;
    
    mapping = 4;
   
    oldwoman2.reset();
    millisStart =-1
  }
 
}

function diaporamaHokusai(){
  if (x >= 280 && x <= 316 && y >= 2500 && y <= 2550) {
    if (scrolling) {
      moveDiapo += scrollSpeed * scrollDirection;

      if ((scrollDirection == -1 && moveDiapo <= 0) || (scrollDirection == 1 && moveDiapo >= 383+15)) {
        scrolling = false;
        index += scrollDirection;
        index = (index + diaporama.length) % diaporama.length;
        moveDiapo = 0;
        lastTime = millis(); // Réinitialiser le temps écoulé à partir du dernier changement d'image
      }
    } else {
      // Vérifier si le temps d'arrêt sur l'image est écoulé
      if (millis() - lastTime >= stopDuration) {
        scrolling = true;
        scrollDirection = 1;
      }
    }

    graphics.background(0);
    graphics.image(diaporama[index], 0, moveDiapo, 512, 383);
    if (scrollDirection == 1) {
      graphics.image(diaporama[(index + 1) % diaporama.length], 0, moveDiapo - 383 -15, 512, 383);
    } else {
      let prevIndex = (index - 1 + diaporama.length) % diaporama.length;
      graphics.image(diaporama[prevIndex], 0, moveDiapo + 383 +15, 512, 383);
    }

    // Dessiner le canvas graphique sur le canvas principal aux coordonnées (x, y)
    image(graphics, 414, 2308);
  }
}
///MUSIQUE FONCTION///
function volume() {
  var sliderValue = gainSlider.value();
  var dB = map(sliderValue, 0, 1, -60, 0); // convertir la valeur du slider en dB
  var volumeValue = pow(10, dB/20); // convertir les dB en une valeur de volume linéaire
  song.setVolume(volumeValue);
  song2.setVolume(volumeValue);
  song3.setVolume(volumeValue);
}

function toggleMute() {
  if (isMuted) {
    muteButton.html("");
    muteButton.style('background-image', 'url("assets/play.png")');
    sliderPosition = 0.5;
    isMuted = false;
    if (mapping == 1) {
      song.play(); // relance la lecture du son
    }
    if (mapping == 3) {
      song2.play(); // relance la lecture du son
    }
    if (mapping == 4) {
      song3.play(); // relance la lecture du son
    }

  } else {
    muteButton.html("");
    muteButton.style('background-image', 'url("assets/mute.png")');
    sliderPosition = 0;
    isMuted = true;
    song3.stop();
    song2.stop();
    song.stop();
    sliderPosition = 0.0;

  }
  gainSlider.value(sliderPosition);
}

///COMMENTAIRE FONCTION///
async function afficherCommentaires() {
  const BASE_URL_API = "https://ocarina-api-244855f29b92.herokuapp.com";
  const response = await fetch(`${BASE_URL_API}/comment`);
  const commentaires = await response.json();
  commentaires.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log(commentaires);
  // afficher les commentaires dans une div
  let commentairesDiv = select('#commentaires');
  commentairesDiv.html('');
  commentairesDiv.position(windowWidth/2 - 20, windowHeight/2 + 162);
  commentairesDiv.style("font-family", "pkmndp");
  commentairesDiv.style("font-size", "20px");
  commentairesDiv.style("color", "rgba(255, 255, 255, 1)");
  commentairesDiv.style("z-index: 1000");
  commentairesDiv.style('background-color', 'rgba(255, 255, 255, 0.0');
  commentairesDiv.style("overflow-y", "auto");
  commentairesDiv.style("width", "270px");
  commentairesDiv.style("height", "170px");
  commentairesDiv.style("word-wrap", "break-word");
    // Inverser le tableau de commentaires
const commentairesInverse = commentaires.reverse();

for (let i = 0; i < commentairesInverse.length; i++) {
const commentaire = createElement('p', `<strong style="text-align:center;display:block">${commentairesInverse[i].author}</strong><br/>${commentairesInverse[i].content}<center>* * *</center>`);
commentaire.parent(commentairesDiv);
}
}

function suppCommentaires() {
// afficher les commentaires dans une div
let commentairesDiv = select('#commentaires');
commentairesDiv.html('');
commentairesDiv.position(windowWidth/2 - 20, windowHeight/2 + 162);
commentairesDiv.style("z-index: 1000");
commentairesDiv.style('background-color', 'rgba(255, 255, 255, 0');
commentairesDiv.style("overflow-y", "hidden");
commentairesDiv.style("width", "0px");
commentairesDiv.style("height", "0px");
commentairesDiv.style("word-wrap", "break-word");


} 

function envoyerSaisies() {
let author = pseudoInput.value();
let commentaire = commentInput.value();
const BASE_URL_API = "https://ocarina-api-244855f29b92.herokuapp.com";
// const BASE_URL = "http://127.0.0.1:8000";
if (author=="")
{
    author = "Anonymous";
}
const data= {
    author:author, 
    content:commentaire,
}
console.log(data)
try {
    const response = fetch(`${BASE_URL_API}/comment/create`, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.status == 201) {
        const responseData = response.json();
        console.log(responseData);
    } else {
        // throw new Error("Erreur lors de la création du commentaire?");
        afficherCommentaires();
    }
} catch (error) {
    console.error(error);
    afficherCommentaires()
    // alert("Erreur lors de la création du commentaire.");
}

pseudoInput.value('');
commentInput.value('');
}

function mouseWheel(event) {
  if (mouseX >= 460 && mouseX <= 708 && mouseY >= 2807 && mouseY <= 2964) {
    // Mettre à jour la position de l'image de la barre de défilement en fonction de la molette de la souris
    let targetPos = scrollbarImg.position().y + event.deltaY;
    targetPos = constrain(targetPos, windowHeight/2 +167, windowHeight/2 +306);
    scrollbarImg.style('transition', 'top 0.5s ease-in-out');
    scrollbarImg.position(windowWidth/2 +244, targetPos, "absolute");
    scrollbarHeight += event.deltaY;
    scrollbarHeight = constrain(scrollbarHeight, 50, viewHeight);
  }
    // Si le défilement n'est pas en cours, on démarre le défilement dans la direction opposée à celle de la molette de la souris
    if (!scrolling) {
      scrolling = true;
      scrollDirection = -Math.sign(event.delta);
    }
}

function scrollbarbox(){

  rect(width - 20, 0, 20, viewHeight);
  scrollbarImg.style("z-index", "1200");
  // Dessinez la barre de défilement si elle doit être visible
  if (scrollbarVisible) {
    scrollbarPos = constrain(scrollbarPos, 0, viewHeight - scrollbarHeight);
    rect(width - 20, scrollbarPos, 20, scrollbarHeight);
  }
}

///DISCORD FONCTION///
function toggleDiscord() {
  if (!isDiscordVisible) {
    // Créer un élément iframe et l'ajouter à la div discordIframe
    discordIframe.html('<iframe id="discord-iframe" src="https://discord.com/widget?id=936957047512121397&theme=dark" width="300" height="300" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>');
    // Afficher la div discordIframe
    let iframe = document.getElementById('discord-iframe');
    iframe.width = 960;
    iframe.height = 260;
    discordIframe.style('opacity', 0.8);
    discordOn.style("z-index: -100");
    discordOn.style('width', '0px');
    discordOn.style('height', '0px');
    discordOff.style("z-index: 1200");
    discordOff.style('width', '60px');
    discordOff.style('height', '40px');
    discordIframe.position(windowWidth/2 - 480,-36);
    discordIframe.style('z-index', '1100');
    band.style('opacity','1');
    isDiscordVisible = true;
  }
}

function toggleDiscord2() {
  if (isDiscordVisible) {
    // Créer un élément iframe et l'ajouter à la div discordIframe
    discordIframe.html('<iframe id="discord-iframe" src="https://discord.com/widget?id=936957047512121397&theme=dark" width="300" height="300" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>');
    // Afficher la div discordIframe
    let iframe = document.getElementById('discord-iframe');
    iframe.width = 0;
    iframe.height = 0;
    discordOff.style("z-index: -100");
    discordOff.style('width', '0px');
    discordOff.style('height', '0px');
    discordOn.style('width', '60px');
    discordOn.style('height', '40px');
    discordOn.style("z-index: 1200");
    discordIframe.position(windowWidth/2 - 480,-36);
    discordIframe.style('z-index', '-1000');
    band.style('opacity','0.5');
    isDiscordVisible = false;
  }
}

///METEO FONCTION///
function displayImage() {
  // Obtenir l'heure actuelle
  let currentTime = hour();

  // Ne rien afficher s'il fait jour
  if (currentTime >= 9 && currentTime < 18) {

    return;
  }

  // Afficher l'image appropriée selon l'heure de la journée
  if (currentTime >= 18 && currentTime < 19.5) { // de 18h à 19h30
    image(teinte,0,0);
  } else if (currentTime >= 19.5 || currentTime < 7) { // de 19h30 à 7h
    image(teinte2,0,0);
  } else if (currentTime >= 7 && currentTime < 9) { // de 7h à 9h
    image(teinte3, 0, 0);
  }
}

///REDIMMENSIONNEMENT FONCTION///
function windowResized() {
  gainSlider.position(windowWidth/2 +300, 10);
  muteButton.position(windowWidth/2 +440, 0);
  scrollbarImg.position(windowWidth/2 +244, windowHeight/2 + 167, "absolute");
  discordIframe.position(windowWidth/2 - 480,-34);
  discordOn.position(windowWidth/2 - 360, 0);
  discordOff.position(windowWidth/2 - 360, 0);
  langueFR.position(windowWidth/2 - 480, 0);
  langueEN.position(windowWidth/2 - 420, 0);
  band.position(windowWidth/2 - 360, 0);
  if (pseudoInput) {
    pseudoInput.position(windowWidth/2 - 250, windowHeight/2 + 160, "absolute");
    
    let commentairesDiv = select('#commentaires');
    commentairesDiv.html('');commentairesDiv.position(windowWidth/2 - 20, windowHeight/2 + 162);
    commentairesDiv.style("z-index: 1000");
    commentairesDiv.style('background-color', 'rgba(255, 255, 255, 0');
    commentairesDiv.style("overflow-y", "auto");
    commentairesDiv.style("width", "270px");
    commentairesDiv.style("height", "170px");
    commentairesDiv.style("word-wrap", "break-word");
    select('#commentaires').position(windowWidth/2 - 20, windowHeight/2 + 162);

    
  }
  if (commentInput) {
    commentInput.position(windowWidth/2 - 250, windowHeight/2 + 194, "absolute");
  }
  if (commentInput2) {
    dialogueLicata.position(windowWidth/2 - 110 , 172 );
    commentInput2.position(windowWidth/2 - 52 , 224 );
    sendButton2.position(windowWidth/2 -50 , 420);
  }
  if (sendButton) {
    sendButton.position(windowWidth/2 - 250, windowHeight/2 + 310, "absolute");
  }
  if (formulation) {
    formulation.position(windowWidth/2 - 480, windowHeight/2 + 80, "absolute");
  }
  if (cachemisere) {
    cachemisere.position(windowWidth/2 +230, windowHeight/2 + 80, "absolute");
  }

    // // Redimensionner la boite de dialogue licata
    if (npcResponseBox) {
      npcResponseBox.position(windowWidth/2 - 85 , 515);
    }
  
}
///LANGUE FONCTION///
function langueFRA(){
  langueFR.style('opacity','1');
  langueEN.style('opacity','0.7');
  if (FR == 150) {
    FR = 255;
    EN = 150;
  }
}

function langueENG(){
  langueEN.style('opacity','1');
  langueFR.style('opacity','0.7');
  if (EN == 150) {
    FR = 150;
    EN = 255;
  }
}

function wordWrap(str, maxWidth) {
  var newLineStr = "&nbsp;";
  done = false;
  res = '';
  var currentMaxWidth = maxWidth; // Ajout d'une variable pour représenter maxWidth
  
  while (str.length > currentMaxWidth) {                 
    found = false;
    
    // Cherche l'espace le plus proche du "currentMaxWidth"
    for (i = currentMaxWidth - 1; i >= 0; i--) {
      if (str[i] === ' ') {
        res = res + [str.slice(0, i), newLineStr].join('');
        str = str.slice(i + 1);
        found = true;
        break;
      }
    }
    
    // Si aucun espace n'est trouvé, on coupe le texte au "currentMaxWidth"
    if (!found) {
      res += [str.slice(0, currentMaxWidth), newLineStr].join('');
      str = str.slice(currentMaxWidth);
    }
  }
  
  return res + str;
}

// function formatHaiku(str) {
//   var newLineStr = ",<br/>";
//   return str.replace(/, (?=[A-Z])/g, newLineStr);
// }

// function formatHaiku(str) {
//   var newLineStr = ",</p><p>";
//   str = '<p>' + str.replace(/, (?=[A-Z])/g, newLineStr) + '</p>';
//   return str;
// }

// function formatHaiku(str) {
//   var lines = str.split(/, (?=[A-Z])/g);
//   for (var i = 0; i < lines.length; i++) {
//     lines[i] = lines[i] + ' <br/>';
//   }
//   return lines.join('');
// }



// Utilisation de la fonction avec une nouvelle valeur pour maxWidth
var myString = " ";
var newMaxWidth = 500;
var wrappedText = wordWrap(myString, newMaxWidth);
// une fonction qui permet d'afficher les dimensions de la fenêtre dans la console et la valeur de xPercentage et yPercentage
function displayWindowDimensions() {
  let windowWidthPercentage = Math.round((windowWidth * 100) / windowWidth);
  let windowHeightPercentage = Math.round((windowHeight * 100) / windowHeight);

  console.log("windowWidth: " + windowWidth + "px (" + windowWidthPercentage + "%)");
  console.log("windowHeight: " + windowHeight + "px (" + windowHeightPercentage + "%)");
}