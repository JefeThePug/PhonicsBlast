//class variables
var blaster;
var textBlocks;
var character = [];
var Stars;
var Points = [];

//images
var bg;
var logo;
var instruc;
var highscorebg;
var characterSet = [];

//booleans
var isOver;
var StartScreenDisplay;
var instructionScreen;
var HallOfFame;
var emptyCartridge;
var scoreIn;
var checkingScores;

// integers and strings
var ref = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W', 'Z'];
var SCORE;
var spaceCode;
var spaceLetter;
var famerName;

//database content
var database;
var myKey;
var leaderboard = [];

//sounds
var BGM;
var sfCharClear;
var sfGameOver;
var sfLetterPress;


function preload() {
   createCanvas(800, 569);
   bg = loadImage('assets/bg.jpg');
   logo = loadImage('assets/logo.jpg');
   instruc = loadImage('assets/instruc.jpg');
   highscorebg = loadImage('assets/highscore.jpg');
   for (var i = 0; i < ref.length; i++) {
      characterSet[i] = loadImage('assets/' + ref[i] + ".png");
   }
   BGM = loadSound('assets/sounds/BGM.mp3');
   sfCharClear = loadSound('assets/sounds/CharClear.wav');
   sfGameOver = loadSound('assets/sounds/GameOver.wav');
   sfLetterPress = loadSound('assets/sounds/LetterPress.wav');
}

function setup() {
   //createCanvas(800, 569);
   blaster = new Blaster();
   StartScreenDisplay = true;
   instructionScreen = false;
   HallOfFame = false;
   isOver = false;
   emptyCartridge = false;
   scoreIn = false;
   checkingScores = true;
   textBlocks = new Buttons();
   SCORE = 0;
   spaceLetter = '';
   spaceCode = 0;
   famerName = '';
   var config = {
      apiKey: "AUTHKEY",
      authDomain: "heartsafarileaderboard.firebaseapp.com",
      databaseURL: "https://heartsafarileaderboard.firebaseio.com",
      storageBucket: "heartsafarileaderboard.appspot.com",
      messagingSenderId: "ID"
   };
   firebase.initializeApp(config);
   database = firebase.database();
   var ref = database.ref('HIGHSCORE');
   //ref.once('value').then(gotData);
   ref.on('value', gotData, errData);

   BGM.loop();
}

function gotData(data) {
   leaderboard = [];
   var scores = data.val();
   var keys = Object.keys(scores).sort(function(a, b) {
      return scores[a].score < scores[b].score ? 1 : 0;
   });
   for (var j = 0; j < keys.length; j++) {
      var k = keys[j];
      var name = scores[k].name;
      var score = scores[k].score;
      leaderboard.push([k, name, score]);
   }
   return false;
}

function startDisplay() {
   BGM.pause();
   push();
   background(logo);
   strokeWeight(5);
   fill(162, 244, 86);
   rect(width / 2 - 80, height - 100, 200, 80, 20);

   strokeWeight(3);
   fill(255, 244, 86);
   rect(width / 4 - 140, height - 50, 200, 40, 20);
   fill(162, 244, 255);
   rect((3 * width) / 4 - 30, height - 50, 200, 40, 20);

   textAlign(CENTER);
   textSize(70);
   noStroke();
   fill(1);
   text("PLAY", width / 2 - 72.5, height - 100, 200, 80);
   textSize(30);
   text("Instructions", width / 4 - 135, height - 48, 200, 50);
   text("Top 10", (3 * width) / 4 - 25, height - 48, 200, 50);
   pop();
   return false;
}

function instructionsDisplay() {
   push();
   translate(0, 0);
   background(instruc);
   textSize(20);
   textAlign(CENTER);
   fill(0);
   rect(0, height - 30, 800, 40);
   fill(255);
   text("Click anywhere to go back.", 0, height - 25, 800, 40);
   return false;
}

function gamePlay() {
   if (!BGM.isPlaying()) {
      BGM.play();
   }
   background(bg);
   blaster.render();
   blaster.turn();
   blaster.update();
   if (!character.length) {
      var n = floor(random(0, characterSet.length));
      var c = new Character(characterSet[n], ref[n]);
      textBlocks.inputLetters(n);
      character.push(c);
      textBlocks.unHighlight();
   }
   fill(255, 255, 0);
   strokeWeight(5);
   ellipse(width / 2, height - 30, 80, 100);
   fill(1);
   var offsets = [2, 1, 0, 2, 6, 2, 0, 1, 2, 3, 4, 4, 0, 4, 4, 3];
   push();
   noStroke();
   translate(width / 2, height - 65);
   rotate(PI);
   beginShape();
   for (var i = 0; i <= 16; i++) {
      var angle = map(i, 0, 16, 0, TWO_PI);
      var r = 10 - offsets[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
   }
   endShape(close);
   pop();
   rect(0, height - 50, width, 50);
   if (SCORE >= 0) {
      fill(0, 101, 12);
   } else {
      fill(101, 0, 12);
   }
   if (Stars) {
      Stars.run();
   }
   textSize(40);
   var theScore = 'score:\xA0' + SCORE.toString();
   text(theScore, width / 2 + 120, height - 100, 100, 100);
   textBlocks.render();
   for (var j = character.length - 1; j >= 0; j--) {
      character[j].render();
      character[j].update();
      if (character[j].s > 200) {
         textBlocks.unHighlight();
         gameOver();
      } else if (character[j].s < 100) {
         Stars = new ParticleSystem(character[j].pos);
         Points.push(new Point(character[j].pos, '+10', character[j].s));
         character.splice(j, 1);
         SCORE += 10;
         sfCharClear.play();
         blaster.hearts = [];
         textBlocks.letterClear();
      }
   }
   if (emptyCartridge) {
      push();
      textSize(30);
      fill(255, 0, 0);
      text("No letter selected", 80, height - 100, width - 80, 100);
      pop();
   }
   for (var p = Points.length - 1; p >= 0; p--) {
      Points[p].run();
      if (Points[p].isDead()) {
         Points.splice(p, 1);
      }
   }
   return false;
}

function highScoreMenu() {
   background(highscorebg);
   if (!checkingScores) {
      textSize(30);
      fill(0);
      text('Enter your name:', 50, 35, 300, 60);
      textSize(40);
      fill(21, 47, 245);
      text(famerName, 60, 85, 300, 60);
      text(SCORE, 325, 85, 300, 60);
      push();
      strokeWeight(3);
      textAlign(CENTER);
      textSize(36);
      translate(12, 90);
      for (var i = 0; i < 4; i++) {
         translate(0, 70);
         for (var j = 0; j < 7; j++) {
            if (i == 3 && j == 5) {
               break;
            }
            translate(50, 0);
            stroke(200, 170, 0);
            fill(255);
            rect(0, 0, 40, 60, 20);
            noStroke();
            fill(0);
            text(ref[(7 * i) + j], 5, 10, 40, 60);
         }
         translate(-350, 0);
      }
      translate(150, 100);
      textSize(26);
      fill(255);
      stroke(200, 170, 0);
      rect(0, 0, 90, 60, 20);
      fill(0);
      noStroke();
      text('BACK', 4, 15, 90, 60);
      translate(100, 0);
      fill(0, 255, 0);
      stroke(200, 170, 0);
      rect(0, 0, 110, 60, 20);
      fill(0);
      noStroke();
      text('SUBMIT', 4, 15, 110, 60);
      pop();
   } else {
      push();
      stroke(0);
      strokeWeight(8);
      fill(162, 244, 86);
      rect(50, 100, 370, 100, 20);
      fill(0);
      beginShape(); //back arrow
      vertex(80, 150);
      vertex(95, 130);
      vertex(95, 140);
      vertex(135, 140);
      vertex(135, 160);
      vertex(95, 160);
      vertex(95, 170);
      endShape(CLOSE);
      noStroke();
      textSize(60);
      textAlign(CENTER);
      text("Go Back", 95, 115, 360, 100);
      pop();
   }
   highScoreDisplay();
   return false;
}

function highScoreDisplay() {
   push();
   textSize(20);
   textAlign(LEFT);
   fill(0);
   translate(500, 150);
   for (i = 0; i < 10; i++) {
      translate(0, 35);
      if (i <= leaderboard.length - 1) {
         text((i + 1) + ".  " + leaderboard[i][1], 0, 0, 150, 35);
         text(leaderboard[i][2], 200, 0, 50, 35);
         if (!checkingScores) {
            if (leaderboard[i][0] == myKey) {
               fill(255, 255, 0, 100);
               rect(-10, -7.5, 280, 35, 20);
               fill(0);
            }
         }
      }
   }
   pop();
   return false;
}

function draw() {
   if (StartScreenDisplay) {
      startDisplay();
   } else if (instructionScreen) {
      instructionsDisplay();
   } else if (HallOfFame) {
      highScoreMenu();
   } else {
      gamePlay();
   }
}

function keyPressed() {
   if (keyCode == RIGHT_ARROW) {
      blaster.setRotation(0.02);
   } else if (keyCode == LEFT_ARROW) {
      blaster.setRotation(-0.02);
   } else if (keyCode > 64 && keyCode < 91) {
      textBlocks.unHighlight();
      blaster.firing(true, key, keyCode);
      var keyspot = textBlocks.outputLog().indexOf(key.toLowerCase());
      if (keyspot >= 0) {
         textBlocks.setHighlight(keyspot);
         spaceLetter = key;
         spaceCode = keyCode;
         emptyCartridge = false;
      }
   } else if (key == ' ') {
      if (spaceCode === 0) {
         emptyCartridge = true;
      } else {
         blaster.firing(true, spaceLetter, spaceCode);
         emptyCartridge = false;
      }
   }
   return false;
}

function keyReleased() {
   if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
      blaster.setRotation(0);
   } else if ((keyCode > 64 && keyCode < 91) || key == ' ') {
      blaster.firing(false);
   }
   return false;
}

function mousePressed() {
   if (StartScreenDisplay) {
      if (mouseX >= width / 2 - 80 && mouseX <= width / 2 + 120 && mouseY >= height - 100 && mouseY <= height - 20) {
         StartScreenDisplay = false;
      } else if (mouseX >= width / 4 - 140 && mouseX <= width / 4 + 60 && mouseY >= height - 50 && mouseY <= height - 10) {
         StartScreenDisplay = false;
         instructionScreen = true;
      } else if (mouseX >= (3 * width) / 4 - 30 && mouseX <= (3 * width) / 4 + 170 && mouseY >= height - 50 && mouseY <= height - 10) {
         StartScreenDisplay = false;
         HallOfFame = true;
      }
      return false;
   } else if (instructionScreen) {
      instructionScreen = false;
      StartScreenDisplay = true;
      return false;
   } else if (isOver) {
      restartGame();
      return false;
   } else if (HallOfFame) {
      if (checkingScores) {
         if (mouseX >= 50 && mouseX <= 420 && mouseY >= 100 && mouseY <= 200) {
            StartScreenDisplay = true;
            HallOfFame = false;
         }
      } else {
         nameInput();
      }
   } else { //game play
      if (mouseY >= height - textBlocks.height - 2 && mouseY < height) {
         var z = ceil(mouseX / (width / 4)) - 1;
         var mKey = textBlocks.getLetter(z);
         textBlocks.setHighlight(z);
         if (mKey) {
            mKey = mKey.toUpperCase();
            var mCode = ref.indexOf(mKey) + 65;
            spaceLetter = mKey;
            spaceCode = mCode;
            emptyCartridge = false;
         }
      } else {
         if (spaceCode === 0) {
            emptyCartridge = true;
         } else {
            blaster.firing(true, spaceLetter, spaceCode);
            emptyCartridge = false;
         }
      }
   }
   return false;
}

function mouseMoved() {
   if (mouseY < height - textBlocks.height - 2 && mouseY > 0) {
      blaster.turn(atan2(mouseY - (height - 50), mouseX - (width / 2)));
   }
   return false;
}

function mouseReleased() {
   blaster.setRotation(0);
   blaster.firing(false);
   return false;
}

function nameInput() {
   if (checkingScores) {
      return false;
   }
   var x = mouseX;
   var y = mouseY;
   var tableX;
   var tableY;
   if (y >= 165 && y <= 215) {
      tableY = 0;
   } else if (y >= 235 && y <= 285) {
      tableY = 1;
   } else if (y >= 305 && y <= 355) {
      tableY = 2;
   } else if (y >= 375 && y <= 425) {
      tableY = 3;
   } else {
      tableY = -1;
   }
   if (x >= 65 && x <= 100) {
      tableX = 0;
   } else if (x >= 115 && x <= 150) {
      tableX = 1;
   } else if (x >= 165 && x <= 200) {
      tableX = 2;
   } else if (x >= 215 && x <= 250) {
      tableX = 3;
   } else if (x >= 265 && x <= 300) {
      tableX = 4;
   } else if (x >= 315 && x <= 350) {
      tableX = 5;
   } else if (x >= 365 && x <= 400) {
      tableX = 6;
   } else {
      tableX = -1;
   }
   if (tableX >= 0 && tableY >= 0 && famerName.length < 7) {
      famerName += ref[(7 * tableY) + tableX];
      var updates = {};
      updates['/HIGHSCORE/' + myKey + '/name'] = famerName;
      database.ref().update(updates);
      updateLeaderboard();
      sfLetterPress.play();
   } else if (mouseY > 474 && mouseY < 526) {
      if (mouseX >= 65 && mouseX <= 150) {
         famerName = famerName.slice(0, -1);
         var updates = {};
         updates['/HIGHSCORE/' + myKey + '/name'] = famerName;
         database.ref().update(updates);
         updateLeaderboard();
         sfLetterPress.play();
      } else if (mouseX >= 165 && mouseX <= 270) {
         scoreIn = false;
         SCORE = 0;
         famerName = '';
         sfLetterPress.play();
         HallOfFame = false;
         StartScreenDisplay = true;
         checkingscores = true;
      }
   }
   return false;
}

function gameOver() {
   BGM.pause();
   sfGameOver.play();
   noLoop();
   push();
   background(134, 0, 0, 95);
   fill(0);
   textAlign(CENTER);
   textSize(60);
   stroke(255);
   strokeWeight(5);
   text('GAME OVER', 0, height / 4, width, 100);
   text('FINAL SCORE\xA0' + SCORE.toString(), 0, height / 4 + 130, width, 100);

   var toHS = false;
   var nextText = "RESTART";
   var endofLB = 9;
   if (leaderboard.length - 1 < endofLB) {
      endofLB = leaderboard.length - 1;
   }
   if (SCORE > leaderboard[endofLB][2] || endofLB < 9) {
      toHS = true;
      nextText = "HIGH SCORE!";
      checkingScores = false;
   }

   fill(0, 255, 255);
   stroke(70);
   strokeWeight(5);
   rect(width / 2 - 100, (3 * height) / 4, 200, 70, 20);
   fill(125);
   stroke(70);
   strokeWeight(5);
   rect(width / 2 - 100, (3 * height) / 4 + 80, 200, 45, 20);
   fill(0);
   textSize(20);
   noStroke();
   text('HOME', width / 2 - 90, (3 * height) / 4 + 92.5, 190, 45);
   textSize(26);
   text(nextText, width / 2 - 90, (3 * height) / 4 + 15, 190, 45);
   isOver = true;
   pop();
   return false;
}

function restartGame() {
   if (mouseX >= width / 2 - 100 && mouseX <= width / 2 + 100 && mouseY >= (3 * height) / 4 && mouseY <= (3 * height) / 4 + 70) {
      character = [];
      textBlocks.letterClear();
      blaster.hearts = [];
      Points = [];
      var n = floor(random(0, characterSet.length));
      textBlocks.inputLetters(n);
      character.push(new Character(characterSet[n], ref[n]));
      textBlocks.unHighlight();
      isOver = false;
      if (!checkingScores) {
         if (!scoreIn) {
            submitScore();
         }
         HallOfFame = true;
      } else {
         SCORE = 0;
      }
      loop();
      redraw();
   }
   return false;
}

function submitScore() {
   var data = {
      name: famerName,
      score: SCORE
   };
   var ref = database.ref('HIGHSCORE');
   var result = ref.push(data);
   myKey = result.key;
   return false;
}

function updateLeaderboard() {
   for (var i = 0; i < leaderboard.length; i++) {
      if (leaderboard[i][0] === myKey) {
         leaderboard[i][1] = famerName;
      }
   }
   return false;
}

function errData(err) {
   console.log("Error!");
   console.log(err);
   return false;
}