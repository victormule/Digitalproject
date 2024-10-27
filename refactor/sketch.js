let shadow; // picture of shadow

let flagEN;
let flagFR;
let FR = 255; // Interface langue
let EN = 150;

let song; // song map1
let song2; // song map3
let song3; // song map4

let bruitage1;
let bruitage2;
let bruitage3; // chest treasure
let bruitage4;

let fr = 100; //starting FPS

/* The above code is declaring and initializing variables for various images and elements, setting
initial values for various parameters, and defining functions for displaying comments, controlling
audio, and displaying a Discord widget. It also includes a slider and scrollbar for user
interaction, and a variable for tracking the start time of the program. */

let ch; // map2 bg


let temple;// map3
let temple2;
let z = 200;
let Z = 0.2;
let light1;
let light2;// map3

let taverne;// map 4
let taverne2;
let grandCoffre = true;
let coffreImg;
let coffreImg2;
let playerCoffre;
let oldwoman;// map 4

// map1
let Img5; //Tree
let bg; // map1 bg
let sky; // {
let cloud1;   // map1 sky gif
let cloud2;
let sea; // }
let bird1; // map1
let combat1;
let combat2;
let battle;
let battle1;
let ponita;
let ponita1; 
let fille;
let fille1;
let kaio1;
let kaio1a;
let kaio2;
let kaio3;
let kaio4;
let teinte;
let teinte2;
let teinte3;
let g = -600;// coordonée nuages
let e = -100;
let f = 800;
let o = -400;
let u = 0;// lien character
let t = 0;// coordonée nuages
let sliderPosition = 1;
let scrollbarPos = 0;
let scrollbarHeight = 200;
let viewHeight = 400;
let scrollbarVisible = false;
let scrollbarImg;
let listeCommentaires = [];
let commentairesDiv;
let commentaire;
let pseudo;
let nouveauCommentaire;
let cachemisere;
let affichageCommentaires = false;
let formulaire;
let pseudoInput;
let commentInput;
let sendButton;
let formulation;// map1

let currentTime;
let mapping = 2;
let x = 260;
let y = 590;
let a = 1;
let N = -400;
let font;
let fontsize = 28;
let gainSlider;
let muteButton;
let isMuted = false;
let discordDiv;
let discordIframe;
let isDiscordVisible = false;
let discordOn;
let discordOff;
let millisStart = -1;






/**
 * The function preloads various images and sounds for use in a JavaScript program.
 */
function preload() {
  font = loadFont("font/pkmndp.ttf");
  song = loadSound("assets/littleroot.mp3");
  song2 = loadSound("assets/temple-of-time-Robert-Austin.mp3");
  //song3 = loadSound("assets/Tethys.mp3");
  song3 = loadSound("assets/DistantRoads.mp3");
  bg = loadImage("assets/plaine.gif");
  ch = loadImage("assets/chambre.png");
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
  bar1 = loadImage('assets/BAR1.png')
  bar2 = loadImage('assets/BAR2.png')
  bar3 = loadImage('assets/BAR3.png')
  bar4 = loadImage('assets/BAR4.png')
  bar5 = loadImage('assets/BAR5.png')
  bar6 = loadImage('assets/BAR6.png')
  bar7 = loadImage('assets/BAR7.png')
  bar8 = loadImage('assets/BAR8.png')
  Img5 = loadImage("assets/Tree.png");
  flagEN = loadImage("assets/flagEN.png");
  flagFR = loadImage("assets/flagFR.png");
  frameRate(fr);
  
 
}


/**
 * This function sets up various elements and functionalities for a web page, including audio files,
 * buttons, sliders, and a Discord widget.
 */
function setup() {
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
  bruitage1 = createAudio("assets/Door01.ogg");
  bruitage2 = createAudio("assets/Door02.ogg");
  bruitage3 = createAudio("assets/item.mp3");
  bruitage4 = createAudio("assets/chest.ogg");

  //bandeau 
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
//gainSlider.style('background', 'red'); // changer la couleur de fond du slider
  gainSlider.style('color', 'white'); // changer la couleur du texte du slider
  gainSlider.style('outline', 'none'); // enlever le contour du slider
//gainSlider.style('webkitAppearance', 'none'); // enlever le style par défaut du slider
//gainSlider.style('appearance', 'none');
//gainSlider.style('borderRadius', '10px'); // arrondir les coins du slider
//gainSlider.style('backgroundImage', 'linear-gradient(to right, #ff8080, #ff80bf)'); // utiliser un dégradé pour la couleur de fond du slider
//gainSlider.style('cursor', 'pointer'); // changer le curseur lorsqu'on survole le slider
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
  // Créer un div pour le widget Discord et l'ajouter au DOM
  discordIframe = createDiv();
  discordIframe.position(windowWidth/2-780, 0);
  discordIframe.style('z-index', '-1000');


windowResized();

}


function draw() {
  let cnv = createCanvas(960, 3400);
  cnv.position(0, N, "relative");
  currentTime = hour();

  if (isMuted) {
    sliderPosition = 0;
    gainSlider.value(sliderPosition);  
  } else {
    sliderPosition = 1;
    sliderPosition = gainSlider.value();
  }
 
  volume();
  

  if(mapping == 1) {
    // callMap1();
  }

  
  if(mapping == 2) {
    // callMap2(); 
  }
    
  if(mapping == 4) {
    // callMap4(); 
  }
    

  if (mapping == 5) {
    openchest(); 
  }
    

  if (mapping == 6) {
    mamasan(); 
  }
    
  if(mapping == 3) {
    // callMap3(); 
  }

 

  
}
//-----------------Fonction-------------------------//
/* The above code is a JavaScript function that is triggered when the mouse wheel is scrolled. It
checks if the mouse is within a specific area on the screen and if so, updates the position of an
image representing a scrollbar based on the direction and amount of scrolling. It also adjusts the
height of the scrollbar based on the scrolling. The `constrain()` function is used to limit the
position and height of the scrollbar within certain bounds. The `style()` function is used to add a
CSS transition effect to the scrollbar movement. */
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
}
 


/**
 * This function draws a scrollbar box on the right side of the screen and displays the scrollbar if it
 * is visible.
 */
function scrollbarbox(){

  rect(width - 20, 0, 20, viewHeight);
  scrollbarImg.style("z-index", "1200");
  // Dessinez la barre de défilement si elle doit être visible
  if (scrollbarVisible) {
    scrollbarPos = constrain(scrollbarPos, 0, viewHeight - scrollbarHeight);
    rect(width - 20, scrollbarPos, 20, scrollbarHeight);
  }
}


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

async function afficherCommentaires() {
  const BASE_URL = "http://127.0.0.1:8000";
  const response = await fetch(`${BASE_URL}/comment`);
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
const BASE_URL = "http://127.0.0.1:8000";
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
    const response = fetch(`${BASE_URL}/comment/create`, {
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




function windowResized() {
  gainSlider.position(windowWidth/2 +300, 10);
  muteButton.position(windowWidth/2 +440, 0);
  scrollbarImg.position(windowWidth/2 +244, windowHeight/2 + 167, "absolute");
  discordIframe.position(windowWidth/2 - 480,-34);
  discordOn.position(windowWidth/2 - 360, 0);
  discordOff.position(windowWidth/2 - 360, 0);
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
  if (sendButton) {
    sendButton.position(windowWidth/2 - 250, windowHeight/2 + 310, "absolute");
  }
  if (formulation) {
    formulation.position(windowWidth/2 - 480, windowHeight/2 + 80, "absolute");
  }
  if (cachemisere) {
    cachemisere.position(windowWidth/2 +230, windowHeight/2 + 80, "absolute");
  }


  

}


///---------fonctionSaisie()3------------------///
//ouvrir coffre---//
function openchest() {
  if (FR == 255){
  a = 4;
  clear();
  noTint();
  background(taverne);
  image(oldwoman, 181, 2450);
  image(shadow, x + 2, y + 34);
  image(coffreImg,0, 2285);
  image(playerCoffre, x, y-4);
  image(taverne2,79,2368);
  tint(FR);
  image(flagFR, 0, y - 316);
  tint(EN);
  image(flagEN, 60, y - 316);

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
    clear();
    noTint();
    background(taverne);
    image(oldwoman, 181, 2450);
    image(shadow, x + 2, y + 34);
    image(coffreImg2,0, 2285);
    image(playerCoffre, x, y-4);
    image(taverne2,79,2368);
    tint(FR);
    image(flagFR, 0, y - 316);
    tint(EN);
    image(flagEN, 60, y - 316);
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
  image(img7, x, y);
  image(taverne2,79,2368);
  // image(oldwoman2, 181, 2450);
  image(oldwoman2, 181, 2419);
  
  tint(FR);
  image(flagFR, 0, y - 316);
  tint(EN);
  image(flagEN, 60, y - 316);
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
  image(img7, x, y);
  image(taverne2,79,2368);
  // image(oldwoman2, 181, 2450);
  image(oldwoman3, 181, 2419);
  tint(FR);
  image(flagFR, 0, y - 316);
  tint(EN);
  image(flagEN, 60, y - 316);
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
  image(img3, x, y);
  image(taverne2,79,2368);
  // image(oldwoman2, 181, 2450);
  image(oldwoman3, 181, 2419);
  tint(FR);
  image(flagFR, 0, y - 316);
  tint(EN);
  image(flagEN, 60, y - 316);
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
    discordIframe.style('z-index', '100');
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


function mousePressed() {
  if (mapping == 1) {
    if (mouseX >= 0 && mouseX <= 60 && mouseY <= y - 300) {
      FR = 255;
      EN = 150;
    }
    if (mouseX > 60 && mouseX <= 120 && mouseY <= y - 300) {
      FR = 150;
      EN = 255;
    }
  }
  if (mapping == 2) {
    if (mouseX >= 0 && mouseX <= 60 && mouseY <= 436) {
      FR = 255;
      EN = 150;
      //window.location.href = "index2.html";
    }
    if (mouseX > 60 && mouseX <= 120 && mouseY <= 436) {
      FR = 150;
      EN = 255;
      //window.location.href = "index2.html";
    }
  }
  if (mapping == 3) {
    if (mouseX >= 0 && mouseX <= 60 && mouseY <= y - 270) {
      FR = 255;
      EN = 150;
    }
    if (mouseX > 60 && mouseX <= 120 && mouseY <= y - 270) {
      FR = 150;
      EN = 255;
    }

  }
  if (mapping == 4) {
    if (mouseX >= 0 && mouseX <= 60 && mouseY <= y - 270) {
      FR = 255;
      EN = 150;
    }
    if (mouseX > 60 && mouseX <= 120 && mouseY <= y - 270) {
      FR = 150;
      EN = 255;
    }

  }


}


