 //------------MAP2------------//

 if (mapping == 2) {
    if (a == 1) {
      clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
      image(img5, x, y);
      tint(FR);
      image(flagFR, 0, 392);
      tint(EN);
      image(flagEN, 60, 392);
    }
    if (a == 2) {
      clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
      image(img6, x, y);
      tint(FR);
      image(flagFR, 0, 392);
      tint(EN);
      image(flagEN, 60, 392);
    }
    if (a == 3) {
      clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
      image(img7, x, y);
      tint(FR);
      image(flagFR, 0, 392);
      tint(EN);
      image(flagEN, 60, 392);
    }
    if (a == 4) {
      clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
      image(img8, x, y);
      tint(FR);
      image(flagFR, 0, 392);
      tint(EN);
      image(flagEN, 60, 392);
    }

    if (keyIsDown(LEFT_ARROW)) {
      clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
      image(img2, x, y);
      tint(FR);
      image(flagFR, 0, 392);
      tint(EN);
      image(flagEN, 60, 392);
      x -= 5;
      a = 2;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
      image(img3, x, y);
      tint(FR);
      image(flagFR, 0, 392);
      tint(EN);
      image(flagEN, 60, 392);
      x += 5;
      a = 3;
    }

    if (keyIsDown(UP_ARROW)) {
      clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
      image(img4, x, y);
      tint(FR);
      image(flagFR, 0, 392);
      tint(EN);
      image(flagEN, 60, 392);
      y -= 5;
      a = 4;
    }

    if (keyIsDown(DOWN_ARROW)) {
      clear();
      noTint();
      background(ch);
      image(shadow, x + 2, y + 34);
      image(img1, x, y);
      tint(FR);
      image(flagFR, 0, 392);
      tint(EN);
      image(flagEN, 60, 392);
      y += 5;
      a = 1;
    }
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
      img11.reset();
      bird1.reset();

      song.loop();
      song.playMode("restart");
      song.play();
      mapping = 1;
    }
  }