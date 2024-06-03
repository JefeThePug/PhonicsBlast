function Heart(sPos, angle, hKey, hColor) {
   this.r = 10;
   this.pos = createVector(sPos.x, sPos.y);
   this.vel = p5.Vector.fromAngle(angle);
   this.vel.mult(8);
   this.keyDown = hKey;
   this.keyColor = hColor;
   this.sfMiss = loadSound('assets/sounds/Miss.wav');

   this.update = function() {
      this.pos.add(this.vel);
   }

   this.render = function() {
      var offsets = [2, 1, 0, 2, 6, 2, 0, 1, 2, 3, 4, 4, 0, 4, 4, 3];
      push();
      colorMode(HSB, 100);
      stroke(1);
      strokeWeight(2);
      var c = map(this.keyColor, 65, 91, 1, 100);
      fill(c, 100, 100);
      translate(this.pos.x, this.pos.y - 20);
      rotate(PI);
      beginShape();
      for (var i = 0; i <= 16; i++) {
         var angle = map(i, 0, 16, 0, TWO_PI);
         var r = this.r - offsets[i];
         var x = r * cos(angle);
         var y = r * sin(angle);
         vertex(x, y);
      }
      endShape(CLOSE);
      pop();
   }

   this.edges = function() {
      if (this.pos.x > width || this.pos.x < 0 || this.pos.y < 0) {
         for (var j = 0; j < character.length; j++) {
            character[j].s += 5;
            var newpos = createVector(constrain(this.pos.x, 50, width - 50), constrain(this.pos.y, 150, height - 50));
            Points.push(new Point(newpos, '-2', 0));
            SCORE -= 2;
            this.sfMiss.play();
         }
         return true;
      } else {
         return false;
      }
   }

}