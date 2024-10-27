if (mapping == 3) {
    if (a == 1) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
      image(lamule, 570,2230);
      image(img5, x, y);
      image(lamule2, 570,2230);
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
    }
    if (a == 2) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
      image(lamule, 570,2230);
      image(img6, x, y);
      image(lamule2, 570,2230);
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
    }
    if (a == 3) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
      image(lamule, 570,2230);
      image(img7, x, y);
      image(lamule2, 570,2230);
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
    }
    if (a == 4) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
      image(lamule, 570,2230);
      image(img8, x, y);
      image(lamule2, 570,2230);
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
    }

    if (keyIsDown(LEFT_ARROW)) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
      image(lamule, 570,2230);
      image(img2, x, y);
      image(lamule2, 570,2230);
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
      x -= 5;
      a = 2;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
      image(lamule, 570,2230);
      image(img3, x, y)
      image(lamule2, 570,2230);;
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
      x += 5;
      a = 3;
    }

    if (keyIsDown(UP_ARROW)) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
      image(lamule, 570,2230);
      image(img4, x, y);
      image(lamule2, 570,2230);
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
      y -= 5;
      a = 4;
      N += 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
      image(lamule, 570,2230);
      image(img1, x, y);
      image(lamule2, 570,2230);
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
      y += 5;
      a = 1;
      N -= 5;
    }

    tint(255, z);
    image(light1, 410, 1972);
    z += Z;
    if (z > 250) {
      Z = -0.4;
    }
    if (z < 230) {
      Z = +0.3;
    }

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
    
    //-------------La DRUSE AFFICHAGE-----------//

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
        text("Congratulations !", 654, y + 248);
        text("You have just discovered the official Discord !", 654, y + 284);
      }
    }

    
    
    //-----LA MULE----//

    if (y >= 2220 && y <= 2262 && x >= 546 && x <= 606) {
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
    
    //---------AFFICHAGE LA MULE--------//
    
    if (y >= 2262 && y <= 2282 && x >= 526 && x <= 626) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
       if (a == 1) {
      image(lamule, 570,2230);
      image(img5, x, y);
      image(lamule2, 570,2230);
    }
    if (a == 2) {
      image(lamule, 570,2230);
      image(img6, x, y);
      image(lamule2, 570,2230);
    }
    if (a == 3) {
      image(lamule, 570,2230);
      image(img7, x, y);
      image(lamule2, 570,2230);
    }
    if (a == 4) {
      image(lamule, 570,2230);
      image(img8, x, y);
      image(lamule2, 570,2230);
    }

    if (keyIsDown(LEFT_ARROW)) {
      
      image(lamule, 570,2230);
      image(img2, x, y);
      image(lamule2, 570,2230);


    }

    if (keyIsDown(RIGHT_ARROW)) {
      
      image(lamule, 570,2230);
      image(img3, x, y)
      image(lamule2, 570,2230);


    }

    if (keyIsDown(UP_ARROW)) {
      
      image(lamule, 570,2230);
      image(img4, x, y);
      image(lamule2, 570,2230);


    }

    if (keyIsDown(DOWN_ARROW)) {
      
      image(lamule, 570,2230);
      image(img1, x, y);
      image(lamule2, 570,2230);


    }
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
      
      tint(255, z);
      image(light1, 410, 1972);
      z += Z;
      if (z > 250) {
      Z = -0.4;
      }
      if (z < 230) {
      Z = +0.3;
    }
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
        text("If you become strong enough you will be", 648, y + 226);
        text("promoted as a Samurai, a Ninja or a Monk.", 648, y + 252);
        text("Remember that the Pokemon's strengh", 648, y + 278);
        text("depend on his trainer's choices.", 648, y + 304);
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
    
    if (y >= 2212 && y <= 2262 && x >= 546 && x <= 626) {
      
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
       if (a == 1) {
      image(img5, x, y);
      image(lamule3, 570,2230);
    }
    if (a == 2) {
      image(img6, x, y);
      image(lamule3, 570,2230);
    }
    if (a == 3) {
      image(img7, x, y);
      image(lamule3, 570,2230);
    }
    if (a == 4) {
      image(img8, x, y);
      image(lamule3, 570,2230);
    }

    if (keyIsDown(LEFT_ARROW)) {
      
      image(img2, x, y);
      image(lamule3, 570,2230);
    }

    if (keyIsDown(RIGHT_ARROW)) {

      image(img3, x, y)
      image(lamule3, 570,2230);
    }

    if (keyIsDown(UP_ARROW)) {

      image(img4, x, y);
      image(lamule3, 570,2230);
    }

    if (keyIsDown(DOWN_ARROW)) {

      image(img1, x, y);
      image(lamule3, 570,2230);
    }
      
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
         
      tint(255, z);
      image(light1, 410, 1972);
      z += Z;
      if (z > 250) {
      Z = -0.4;
      }
      if (z < 230) {
      Z = +0.3;
    }
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
        text("If you become strong enough you will be", 648, y + 226);
        text("promoted as a Samurai, a Ninja or a Monk.", 648, y + 252);
        text("Remember that the Pokemon's strengh", 648, y + 278);
        text("depend on his trainer's choices.", 648, y + 304);
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
    
    if (y >= 2212 && y <= 2262 && x >= 526 && x <= 606) {
    
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
       if (a == 1) {

      image(img5, x, y);
      image(lamule4, 570,2230);

    }
    if (a == 2) {

      image(img6, x, y);
      image(lamule4, 570,2230);

    }
    if (a == 3) {

      image(img7, x, y);
      image(lamule4, 570,2230);

    }
    if (a == 4) {

      image(img8, x, y);
      image(lamule4, 570,2230);

    }

    if (keyIsDown(LEFT_ARROW)) {

      image(img2, x, y);
      image(lamule4, 570,2230);


    }

    if (keyIsDown(RIGHT_ARROW)) {

      image(img3, x, y)
      image(lamule4, 570,2230);


    }

    if (keyIsDown(UP_ARROW)) {

      image(img4, x, y);
      image(lamule4, 570,2230);


    }

    if (keyIsDown(DOWN_ARROW)) {

      image(img1, x, y);
      image(lamule4, 570,2230);


    }
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
          
      tint(255, z);
      image(light1, 410, 1972);
      z += Z;
      if (z > 250) {
      Z = -0.4;
      }
      if (z < 230) {
      Z = +0.3;
      }
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
        text("If you become strong enough you will be", 648, y + 226);
        text("promoted as a Samurai, a Ninja or a Monk.", 648, y + 252);
        text("Remember that the Pokemon's strengh", 648, y + 278);
        text("depend on his trainer's choices.", 648, y + 304);
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
    
        if (y >= 2198 && y <= 2238 && x >= 542 && x <= 608) {
      clear();
      noTint();
      background(temple);
      image(temple3, 553, 2098);
      image(shadow, x + 2, y + 34);
      image(dshadow, 670,2140);
      image(ladruse, 670,2140);
      image(mshadow, 570,2230);
       if (a == 1) {
      
      image(img5, x, y);
      image(lamule5, 570,2230);

    }
    if (a == 2) {
      
      image(img6, x, y);
      image(lamule5, 570,2230);

    }
    if (a == 3) {
      
      image(img7, x, y);
      image(lamule5, 570,2230);

    }
    if (a == 4) {
      
      image(img8, x, y);
      image(lamule5, 570,2230);

    }

    if (keyIsDown(LEFT_ARROW)) {
      
      image(img2, x, y);
      image(lamule5, 570,2230);


    }

    if (keyIsDown(RIGHT_ARROW)) {
      
      image(img3, x, y)
      image(lamule5, 570,2230);


    }

    if (keyIsDown(UP_ARROW)) {
      
      image(img4, x, y);
      image(lamule5, 570,2230);


    }

    if (keyIsDown(DOWN_ARROW)) {
      
      image(img1, x, y);
      image(lamule5, 570,2230);


    }
      image(ladruse2, 670,2140);
      image(temple2, 357, 1922);
      tint(FR);
      image(flagFR, 0, y - 316);
      tint(EN);
      image(flagEN, 60, y - 316);
          
      tint(255, z);
      image(light1, 410, 1972);
      z += Z;
      if (z > 250) {
      Z = -0.4;
      }
      if (z < 230) {
      Z = +0.3;
      }
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
        text("If you become strong enough you will be", 648, y + 226);
        text("promoted as a Samurai, a Ninja or a Monk.", 648, y + 252);
        text("Remember that the Pokemon's strengh", 648, y + 278);
        text("depend on his trainer's choices.", 648, y + 304);
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