function Buttons() {
   this.buttons = [];
   this.highlighted = -1;
   this.height = 45;
   this.selections = [
      ['a', 'o', 'g', 'p'],
      ['b', 'd', 'p', 'v'],
      ['c', 'k', 's', 'o'],
      ['d', 'b', 'g', 's'],
      ['e', 'i', 'l', 'w'],
      ['f', 'h', 'a', 'o'],
      ['g', 'd', 'n', 's'],
      ['h', 'x', 'f', 'u'],
      ['j', 'g', 'i', 'f'],
      ['l', 'i', 'r', 't'],
      ['m', 'n', 'w', 'e'],
      ['n', 'm', 'u', 'i'],
      ['o', 'u', 'c', 'z'],
      ['p', 'q', 'a', 'f'],
      ['r', 'u', 'l', 'n'],
      ['s', 'c', 'i', 'z'],
      ['t', 'k', 'e', 'l'],
      ['w', 'm', 'v', 'a'],
      ['z', 't', 'v', 'o']
   ];

   this.render = function() {
      push();
      textAlign(CENTER);
      textSize(30);
      for (var x = 0; x < 4; x++) {
         if (this.highlighted == x) {
            fill(0, 255, 255);
         } else {
            fill(220);
         }
         stroke(70);
         strokeWeight(2);
         rect(x * (width / 4), height - this.height - 2, width / 4, this.height, 20);
         fill(0);
         noStroke();
         if (this.buttons[x]) {
            text(this.buttons[x], x * (width / 4), height - this.height - 2, width / 4, this.height, 20);
         } else {
            text('', x * (width / 4), height - this.height - 2, width / 4, this.height, 20)
         }
      }
      pop();
   }

   this.getLetter = function(num) {
      if (this.buttons[num]) {
         return (this.buttons[num]);
      } else {
         return false;
      }
   }

   this.letterClear = function() {
      this.buttons = [];
   }

   this.inputLetters = function(ref) {
      var letters = [];
      for (var i = 0; i < 4; i++) {
         letters.push(this.selections[ref][i]);
      }
      for (var j = 0; j < 4; j++) {
         var r = floor(random(0, letters.length));
         this.buttons.push(letters[r]);
         letters.splice(r, 1);
      }
   }

   this.outputLog = function() {
      var s = '';
      for (var i = 0; i < this.buttons.length; i++) {
         s += this.buttons[i];
      }
      return s;
   }

   this.setHighlight = function(n) {
      this.highlighted = n;
   }
   this.unHighlight = function() {
      this.highlighted = -1;
      spaceLetter = '';
      spaceCode = 0;
   }
}