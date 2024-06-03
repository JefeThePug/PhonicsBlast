var Point = function(position, t, s) {
   this.acceleration = createVector(0, 0.01);
   this.velocity = createVector(0, -5);
   this.position = position.copy();
   this.lifespan = 100.0;
   this.t = t;
   this.neg = ((t.substr(0, 1) == '-') ? true : false);
   this.offset = s;


   this.run = function() {
      this.update();
      this.display();
   }

   this.update = function() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= .4;
   }

   this.display = function() {
      push();
      noStroke();
      if (this.t.length == 3) {
         stroke(0);
         strokeWeight(5);
         fill(0, 225, 228);
         textSize(40);
      } else {
         textSize(34);
         noStroke();
         if (this.neg) {
            fill(255, 0, 0, 99);
         } else {
            fill(19, 141, 0, 99);
         }
      }
      translate(this.position.x + this.offset, this.position.y + this.offset);
      text(this.t, 0, 0, 50, 50);
      pop();
   };

   this.isDead = function() {
      if (this.lifespan < 0) {
         return true;
      } else {
         return false;
      }
   }
}