function Character(img, hKey) {
   this.pos = createVector(floor(random(0, width - 151)), floor(random(0, height / 2)));
   this.img = img;
   this.keySet = hKey;
   this.s = 150;
   this.xDirection = -1;
   this.yDirection = -1;
   this.sfPointUp = loadSound('assets/sounds/PointUp.mp3');
   this.sfPointDown = loadSound('assets/sounds/PointDown.wav');

   this.render = function() {
      image(this.img, this.pos.x, this.pos.y, this.s, this.s);
   }

   this.update = function() {
      this.pos.x = this.pos.x + 1.0 * this.xDirection;
      this.pos.y = this.pos.y + 0.8 * this.yDirection;
      if (this.pos.x > (width - 150) || this.pos.x < 0) {
         this.xDirection *= -1;
      }
      if (this.pos.y > height / 2 || this.pos.y < 0) {
         this.yDirection *= -1;
      }
   }

   this.isHit = function(heart) {
      var distance = dist(this.pos.x, this.pos.y, heart.pos.x, heart.pos.y)
      if (distance <= this.s + heart.r) {
         if (heart.keyDown != this.keySet) {
            this.s += 10;
            SCORE -= 5;
            Points.push(new Point(this.pos, '-5', this.s));
            this.sfPointDown.play();
         } else {
            this.s -= 10;
            SCORE += 2;
            Points.push(new Point(this.pos, '+2', this.s));
            this.sfPointUp.play();
         }
         return true;
      }
      return false;
   }

}