const buttons = document.getElementsByTagName('button');
const inputs = [...document.getElementsByTagName('input')];
const canvasControls = inputs.filter(x => x.type == "range" || x.type == "number");
const lengthControls = canvasControls.filter(x => x.name == "width" || x.name == "height");
const frictionControl = canvasControls.filter(x => x.name == "friction");
const drawingCheck = inputs.filter(x => x.type == "checkbox")[0];
let newRect = [];
// see classes.js for the formulae for random positioning and lengths

// spawns a ball at a randomly given location within 80% of the height and width of the canvas
buttons[0].addEventListener('click', function() {
  balls.push(new ball());
});

// spawns a rectangle at a randomly given location within 80% of the height and width of the canvas, with a random length and height 
buttons[1].addEventListener('click', function() {
  rects.push(new rect());
});
// highlighting collision stuff, broken
/*buttons[2].addEventListener('click', function() {
  object = (object == undefined ? balls[Math.floor(Math.random()*balls.length)] : undefined);
});*/

lengthControls[0].addEventListener('input', function() {
  canvas.width = this.value;
  lengthControls[1].value = this.value;
  resetWalls();
});
lengthControls[1].addEventListener('input', function() {
  canvas.width = this.value;
  lengthControls[0].value = this.value;
  resetWalls();
});
lengthControls[2].addEventListener('input', function() {
  canvas.height = this.value;
  lengthControls[3].value = this.value;
  resetWalls();
});
lengthControls[3].addEventListener('input', function() {
  canvas.height = this.value;
  lengthControls[2].value = this.value;
  resetWalls();
});
frictionControl[0].addEventListener('input', function() {
  friction = this.value;
  frictionControl[1].value = this.value;
});

frictionControl[1].addEventListener('input', function() {
  friction = this.value;
  frictionControl[0].value = this.value;
});
function resetWalls() {
  rects[0] = new rect(-width, -width, width, canvas.height + width + 10);
  rects[1] = new rect(0, -width, canvas.width + width + 10, width + 1);
  rects[2] = new rect(canvas.width, 0, width, canvas.height + width + 10);
  rects[3] = new rect(-width, canvas.height, canvas.width + 10, width + 1);
  /*const prevColour = ctx.fillStyle;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = prevColour;*/
}
canvas.addEventListener('click', function(e) {
  if (drawingCheck.checked) {
    if (newRect.length == 0) {
      newRect = [[0,0], [0,0]];
      newRect[0] = [e.clientX, e.clientY];
    }
    else {
      if (newRect[0][0] > e.clientX) {
        newRect[1][0] = newRect[0][0];
        newRect[0][0] = e.clientX;
      }
      else {
        newRect[1][0] = e.clientX;
      }
      if (newRect[0][1] > e.clientY) {
        newRect[1][1] = newRect[0][1];
        newRect[0][1] = e.clientY;
      }
      else {
        newRect[1][1] = e.clientY;
      }
      rects.push(new rect(newRect[0][0], newRect[0][1], newRect[1][0] - newRect[0][0], newRect[1][1] - newRect[0][1]));
      newRect = [];
    }
  }
  else {
    balls.push(new ball(e.clientX, e.clientY));
  }
}, false);
