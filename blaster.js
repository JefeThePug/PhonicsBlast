function Blaster() {
   this.r = 25;
   this.pos = createVector(width / 2, height - (2 * this.r));
   this.rotation = 0;
   this.heading = -PI / 2;
   this.isFiring = false;
   this.cartridge = 10;
   this.hearts = [];
   this.keyDown;
   this.keyColor;

   this.firing = function(b, hKey, hColor) {
      this.isFiring = b;
      if (!b) {
         this.cartridge = 10;
         this.keyDown = '';
         this.keyColor = '';
      } else {
         this.keyDown = hKey;
         this.keyColor = hColor;
      }
   }

   this.fire = function() {
      this.hearts.push(new Heart(this.pos, this.heading, this.keyDown, this.keyColor))
   }

   this.setRotation = function(a) {
      this.rotation = a;
   }

   this.getRotation = function() {
      return this.rotation;
   }

   this.turn = function(angle) {
      if (angle) {
         this.heading = angle;
      } else {
         this.heading += this.rotation;
      }
      this.heading = constrain(this.heading, PI / 8 - (PI), -(PI / 8));
   }

   this.update = function() {
      if (this.isFiring) {
         this.cartridge++;
         if (this.cartridge > 10) {
            this.cartridge = 1;
         }
         if (this.cartridge == 1) {
            this.fire();
         }
      }
      for (i = this.hearts.length - 1; i >= 0; i--) {
         this.hearts[i].render();
         this.hearts[i].update();
         if (this.hearts[i].edges()) {
            this.hearts.splice(i, 1);
         } else if (character.length) {
            for (j = character.length - 1; j >= 0; j--) {
               if (character[j].isHit(this.hearts[i])) {
                  this.hearts.splice(i, 1);
                  break;
               }
            }
         }
      }
   }

   this.render = function() {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading + PI / 2);
      translate(0, -25);
      translate(0, 10);
      fill(255, 255, 0);
      stroke(1);
      strokeWeight(5);
      triangle(0, -this.r - 10, -this.r, this.r, this.r, this.r);
      pop();
   }
}