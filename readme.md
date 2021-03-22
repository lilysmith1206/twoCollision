2D Collision Simulator

This simulates collisions between balls and rectangles, with a self-built 2D Collision Engine.

The engine slices up each interval of time into five segments to better calculate collisions, which I found to be the optimal slice. More and it is too slow, and less and there are problems with faster speeds.

Each generated ball or rectangle is randomly positioned, though the ball's width and height are always the same. The size of the canvas can be adjusted, though it will destroy any balls outside the canvas' bounds.

The scripts that run the collision are located in collision.js.

KNOWN BUGS:

Excess amount of rectangles causes lag.