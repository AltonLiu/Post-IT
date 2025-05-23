// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global Cover, bullet, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
        textFont, keyIsPressed, SHIFT, round, square, triangle, createButton, createColorPicker, createSlider, mousePressed, rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          mouseClicked, pmouseX, pmouseY, ARROW, CROSS, cursor, mouseX, mouseY, strokeWeight, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke,
          keyCode, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, ellipseMode, CENTER, rectMode, keyIsDown, textAlign, millis, sin, sqrt, CORNER, floor, dist*/

/*function draw() {
  background(0);
  chaser.draw();
  chaser.move(mouseX, mouseY, arr);
  if(chaser.state == "CHASING") {
    chaser.ping();
  }
  chaser.found();
}*/
let tempx, tempy, angle;
class Chaser {
  constructor(x, y, size, color, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.state = "CHASING"; //HIDING OR CHASING
    this.randomX = random(this.size, windowWidth);
    this.randomY = random(this.size, windowHeight);
    this.randomNum;
    this.storedX;
    this.storedY;
    this.xVel = 0;
    this.yVel = 0;
    this.pingX = this.x;
    this.pingY = this.y;
    this.pingSize = 1;
  }
  draw() {
    //Circle
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
  hide(arr) {
    this.color = color(296, 87, 51);
    if (arr.length === 0) {
      let x = this.randomX - this.x;
      let y = this.randomY - this.y;
      let angle;
      if (x > 0 && y > 0) {
        angle = Math.atan(y / x);
      } else if (x < 0 && y > 0) {
        angle = Math.atan(y / x) + Math.PI;
      } else if (x < 0 && y < 0) {
        angle = Math.atan(y / x) + Math.PI;
      } else if (x > 0 && y < 0) {
        angle = Math.atan(y / x) + 2 * Math.PI;
      }
      this.xVel = this.speed * Math.cos(angle);
      this.yVel = this.speed * Math.sin(angle);
      this.x += this.xVel;
      this.y += this.yVel;
    } else {
      let half = Math.floor(arr.length / 2);
      let x = arr[half].x - this.x + arr[half].width / 2;
      let y = arr[half].y - this.y + arr[half].height / 2;
      let angle;
      if (x > 0 && y > 0) {
        angle = Math.atan(y / x);
      } else if (x < 0 && y > 0) {
        angle = Math.atan(y / x) + Math.PI;
      } else if (x < 0 && y < 0) {
        angle = Math.atan(y / x) + Math.PI;
      } else if (x > 0 && y < 0) {
        angle = Math.atan(y / x) + 2 * Math.PI;
      }
      this.xVel = this.speed * Math.cos(angle);
      this.yVel = this.speed * Math.sin(angle);
      this.x += this.xVel;
      this.y += this.yVel;
    }
  }
  chase(player, arr, under) {
    this.color = color(0, 58, 70);
    if (arr.length === 0) {
      let x = player.x - this.x;
      let y = player.y - this.y;
      let angle;
      if (x > 0 && y > 0) {
        angle = Math.atan(y / x);
      } else if (x < 0 && y > 0) {
        angle = Math.atan(y / x) + Math.PI;
      } else if (x < 0 && y < 0) {
        angle = Math.atan(y / x) + Math.PI;
      } else if (x > 0 && y < 0) {
        angle = Math.atan(y / x) + 2 * Math.PI;
      }
      this.xVel = this.speed * Math.cos(angle);
      this.yVel = this.speed * Math.sin(angle);
      this.x += this.xVel;
      this.y += this.yVel;
    } else {
      if (!under[0]) {
        let x = player.x - this.x;
        let y = player.y - this.y;
        let angle;
        if (x > 0 && y > 0) {
          angle = Math.atan(y / x);
        } else if (x < 0 && y > 0) {
          angle = Math.atan(y / x) + Math.PI;
        } else if (x < 0 && y < 0) {
          angle = Math.atan(y / x) + Math.PI;
        } else if (x > 0 && y < 0) {
          angle = Math.atan(y / x) + 2 * Math.PI;
        }
        this.xVel = this.speed * Math.cos(angle);
        this.yVel = this.speed * Math.sin(angle);
        this.x += this.xVel;
        this.y += this.yVel;
      } else if (under[0]) {
        let gap = dist(player.x, player.y, this.x, this.y);
        if (gap < 75) {
          let x = player.x - this.x;
          let y = player.y - this.y;
          let angle;
          if (x > 0 && y > 0) {
            angle = Math.atan(y / x);
          } else if (x < 0 && y > 0) {
            angle = Math.atan(y / x) + Math.PI;
          } else if (x < 0 && y < 0) {
            angle = Math.atan(y / x) + Math.PI;
          } else if (x > 0 && y < 0) {
            angle = Math.atan(y / x) + 2 * Math.PI;
          }
          this.xVel = this.speed * Math.cos(angle);
          this.yVel = this.speed * Math.sin(angle);
          this.x += this.xVel;
          this.y += this.yVel;
        } else {
          let half = Math.floor(arr.length / 2);
          let x = arr[half].x - this.x + arr[half].width / 2;
          let y = arr[half].y - this.y + arr[half].height / 2;
          let angle;
          if (x > 0 && y > 0) {
            angle = Math.atan(y / x);
          } else if (x < 0 && y > 0) {
            angle = Math.atan(y / x) + Math.PI;
          } else if (x < 0 && y < 0) {
            angle = Math.atan(y / x) + Math.PI;
          } else if (x > 0 && y < 0) {
            angle = Math.atan(y / x) + 2 * Math.PI;
          }
          this.xVel = this.speed * Math.cos(angle);
          this.yVel = this.speed * Math.sin(angle);
          this.x += this.xVel;
          this.y += this.yVel;
        }
      }
    }
  }
  ping() {
    noFill();
    strokeWeight(2);
    stroke(this.color);
    ellipse(this.pingX, this.pingY, this.pingSize);
    this.pingX = this.x;
    this.pingY = this.y;
    this.pingSize++;
    if (this.pingSize > 100) {
      this.pingSize = 1;
    }
  }
  tag(player) {
    let err = 10;
    if (
      this.x + this.size / 2 + err > player.x &&
      this.x - this.size / 2 - err < player.x &&
      this.y + this.size / 2 + err > player.y &&
      this.y - this.size / 2 - err < player.y
    ) {
      if (this.state === "CHASING") {
        this.state = "HIDING";
        this.randomX = random(this.size, windowWidth);
        this.randomY = random(this.size, windowHeight);
        player.reset();
        this.reset();
      } else {
        this.state = "CHASING";
        player.reset();
        this.reset();
      }
    }
  }
  reset() {
    this.x = windowWidth / 2 - 50;
    this.y = windowHeight / 2 - 50;
  }
}
