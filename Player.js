// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global firebase, createButton, createElement, createInput, constrain, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, lerpColor, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          map, mouseX, mouseY, pmouseX, pmouseY, round, strokeWeight, sqrt, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke,
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, keyIsDown */

//Capitalize player
class Player {
  constructor(x, y, playerWidth, playerHeight, speed, color) {
    this.x = x;
    this.y = y;
    this.width = playerWidth;
    this.height = playerHeight;
    this.speed = speed;
    this.color = color;
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.width, this.height);
    noStroke();
  }
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }

    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
  }
  inBounds() {
    if (this.x + this.width / 2 > windowWidth - 50) {
      this.x = windowWidth - 50 - this.width / 2;
    } else if (this.x - this.width / 2 < 0) {
      this.x = this.width / 2;
    } else if (this.y + this.height / 2 > windowHeight - 50) {
      this.y = windowHeight - 50 - this.height / 2;
    } else if (this.y - this.height / 2 < 0) {
      this.y = this.height/2;
    }
  }
  reset() {
    this.x = windowWidth-60;
    this.y = windowHeight-60;
  }
}

/*function keyPressed() {
  if ((keyPressed = UP_ARROW)) {
    player.dir = "UP";
  }
  if ((keyPressed = DOWN_ARROW)) {
    player.dir = "DOWN";
  }
  if ((keyPressed = LEFT_ARROW)) {
    player.dir = "LEFT";
  }
  if ((keyPressed = RIGHT_ARROW)) {
    player.dir = "RIGHT";
  }
}

class player {
  constructor(x, y, width, height, speed, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.color = color;
  }

  move(dir) {
    if (player.dir == "UP") {
      player.y -= this.speed;
    } else if (dir == "DOWN") {
      this.y += this.speed;
    } else if (dir == "RIGHT") {
      this.x += this.speed;
    } else if (dir == "LEFT") {
      this.x -= this.speed;
    }
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, this.width, this.height);
    noStroke();
  }
*/

/*   move(dir) {
    if (dir == "UP") {
      this.y -= this.speed;
    } else if (dir == "DOWN") {
      this.y += this.speed;
    } else if (dir == "RIGHT") {
      this.x += this.speed;
    } else if (dir == "LEFT") {
      this.x -= this.speed;
    }
    */
