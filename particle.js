var Particle = function(position) {
   this.acceleration = createVector(0, 0.1);
   this.velocity = createVector(random(-5, 1), random(-5, 0));
   this.position = position.copy();
   this.lifespan = 100.0;
};

Particle.prototype.run = function() {
   this.update();
   this.display();
};

Particle.prototype.update = function() {
   this.velocity.add(this.acceleration);
   this.position.add(this.velocity);
   this.lifespan -= 1.4;
};

Particle.prototype.display = function() {
   push();
   colorMode(HSB, 100);
   stroke(16, 100, 50, this.lifespan);
   strokeWeight(2);
   fill(16, 100, 100, this.lifespan);
   var offsets = [1, -8, 1, -8, 1, -8, 1, -8, 1, -8];
   translate(this.position.x + (150 / 2), this.position.y + (150 / 2));
   rotate(PI);
   beginShape();
   for (var i = 0; i <= 10; i++) {
      var angle = map(i, 0, 10, 0, TWO_PI);
      var r = 12 - offsets[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
   }
   endShape(CLOSE);
   pop();
};

Particle.prototype.isDead = function() {
   if (this.lifespan < 0) {
      return true;
   } else {
      return false;
   }
};

var ParticleSystem = function(position) {
   this.origin = position.copy();
   this.particles = [];
   for (var i = 0; i < 60; i++) {
      this.particles.push(new Particle(this.origin));
   }
};

ParticleSystem.prototype.run = function() {
   for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();
      if (p.isDead()) {
         this.particles.splice(i, 1);
      }
   }
};