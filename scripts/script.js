var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var darkMode = false;
var balls = [];
// generates random block
var rects = [/*new rect(50 + Math.floor(Math.random()*350), 50 + Math.floor(Math.random()*350), 150 + Math.floor(Math.random()*100), 150 + Math.floor(Math.random()*100))*/];
var deletion = [];
const stepSize = 5;

const width = 10; // walls width
//generates walls: left, top, right, bottom
// for collision
rects.push(new rect(-width, -width, width, canvas.height + width + 10));
rects.push(new rect(0, -width, canvas.width + width + 10, width + 1));
rects.push(new rect(canvas.width, 0, width, canvas.height + width + 10));
rects.push(new rect(-width, canvas.height, canvas.width + 10, width + 1));
let object = undefined;
iterate();
const id = setInterval(iterate, 20);

function drawRect(obj) {
  ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
}
// for collision purposes
/*function distanceBetween(obj1X, obj1Y, obj2X, obj2Y) {
  let x = obj2X - obj1X;
  let y = obj2Y - obj1Y;
  return Math.hypot(x, y);
}
function highlightSurroundings(obj) {
  const range = 50;
  for (let i = 0; i < balls.length; i++) {
    if (balls[i] != obj) {
      // top left, top right, bottom left, bottom right
      let distanceCorners = [distanceBetween(balls[i].x, balls[i].y, obj.x, obj.y), distanceBetween(balls[i].x + balls[i].w, balls[i].y, obj.x, obj.y), distanceBetween(balls[i].x, balls[i].y + balls[i].h, obj.x, obj.y), distanceBetween(balls[i].x + balls[i].w, balls[i].y + balls[i].h, obj.x, obj.y)];
      let corner = 0;
      for (let j = 0; j < distanceCorners.length; j++) {
        if (Math.abs(distanceCorners[j]) < range) {
          ctx.strokeStyle = "#00FF00";
          corner = j;
          break;
        }
      }
      ctx.beginPath();
      ctx.moveTo(obj.x, obj.y);
      ctx.lineTo(balls[i].x + balls[i].w/2, balls[i].y + balls[i].h/2);
      ctx.stroke();
      ctx.strokeStyle = "#000000";

    }
  }
}*/
function iterate() {
  ctx.fillStyle = (darkMode ? "#000000" : "#FFFFFF");
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = (darkMode ? "#FFFFFF" : "#000000");
  ctx.globalAlpha = 0.3;
  for (let i = 0; i < rects.length; i++) {
    drawRect(rects[i]);
  }
  if (object !== undefined) {
    highlightSurroundings(object);
  }
  ctx.globalAlpha = 1;
  for (let i = 0; i < balls.length; i++) {
    let deleted = false;
    for (let step = 0; step < stepSize; step++) {
    rects.forEach(x => balls[i].collision(x));
    //balls.forEach(x => {
    //  if (x != balls[i]) {balls[i].collision(x)};
    //});
    balls[i].x += balls[i].xSpeed/5;
    balls[i].y += balls[i].ySpeed/5;
    if (balls[i].x < -5 || balls[i].x > canvas.width + 5 || balls[i].y < -5 || balls[i].y > canvas.height + 5) {
      deleted = true;
      balls.splice(i, 1);
      break;
      }
    }
  if (!deleted) {
    drawRect(balls[i]);
  }
  } 
}