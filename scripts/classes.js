var friction = 0;

class ball {
  constructor(x, y) {
    // mouse x and y
    this.w = 5;
    this.h = 5;
    this.xSpeed = (Math.random()*11) - 5;
    this.ySpeed = (Math.random()*11) - 5;
    this.colour = "#000000";
    if (x == undefined || y == undefined) {
      let insideRect;
      do {
        insideRect = false;
        this.x = (x == undefined ? Math.floor(Math.random()*(canvas.width - canvas.width*0.2) + canvas.width*0.1) : x);
        this.y = (y == undefined ? Math.floor(Math.random()*(canvas.height - canvas.height*0.2) + canvas.height*0.1) : y);
        for (let i = 0; i < rects.length; i++) {
          if (rects[i].x < this.x + this.w     &&
              rects[i].x + rects[i].w > this.x &&
              rects[i].y < this.y + this.h     &&
              rects[i].y + rects[i].h > this.y) {
            insideRect = true;
            this.x = undefined;
            this.y = undefined;
            break;
          }
        }
      } while (insideRect);
    }
    else {
      this.x = x;
      this.y = y;
    }
  }
  collision(obj) {
      if (obj.x < this.x + this.w &&
          obj.x + obj.w > this.x &&
          obj.y < this.y + this.h &&
          obj.y + obj.h > this.y) {
        for (let count = 0; count < 100; count++) {
        let prevX = this.x - (this.xSpeed*(count + 1)/stepSize);
        let prevY = this.y - (this.ySpeed*(count + 1)/stepSize);
        let notColliding = false;
        if (prevX <= obj.x || prevX >= obj.x + obj.w) {
          this.xSpeed *= -(1 - friction);
          this.x = prevX; 
          this.y = prevY;
          notColliding = true;
        }
        if (prevY >= obj.y + obj.h || prevY <= obj.y) {
          this.ySpeed *= -(1 - friction);
          this.x = prevX; 
          this.y = prevY;
          notColliding = true;
        }
        if (notColliding) {
          console.log(count);
          return;
        }
      }
      }

    }
}
class rect {
  constructor(x, y, w, h) {
    if (x == undefined || y == undefined || w == undefined || h == undefined) {
      let insideRect;
      do {
        insideRect = false;
        this.x = (x == undefined ? canvas.width*0.15  + Math.floor(Math.random() * canvas.width*0.7)  : x);
        this.y = (y == undefined ? canvas.height*0.15 + Math.floor(Math.random() * canvas.height*0.7) : y);
        this.w = (w == undefined ? canvas.width*0.1   + Math.floor(Math.random() * canvas.width*0.5)  : w);
        this.h = (h == undefined ? canvas.height*0.1  + Math.floor(Math.random() * canvas.height*0.5) : h);   
        for (let i = 0; i < balls.length; i++) {
          if (balls[i].x < this.x + this.w     &&
              balls[i].x + balls[i].w > this.x &&
              balls[i].y < this.y + this.h     &&
              balls[i].y + balls[i].h > this.y) {
            insideRect = true;
            this.x = undefined;
            this.y = undefined;
            this.w = undefined;
            this.h = undefined;
            break;
          }
        }
      } while (insideRect);
    }
    else {
      this.x = (x == undefined ? canvas.width*0.15  + Math.floor(Math.random() * canvas.width*0.7)  : x);
      this.y = (y == undefined ? canvas.height*0.15 + Math.floor(Math.random() * canvas.height*0.7) : y);
      this.w = (w == undefined ? canvas.width*0.1   + Math.floor(Math.random() * canvas.width*0.5)  : w);
      this.h = (h == undefined ? canvas.height*0.1  + Math.floor(Math.random() * canvas.height*0.5) : h);   
    }
    // this is magic dw about it
    
  }
}