/* global firebase, createButton, createElement, createInput, constrain, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, lerpColor, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          map, mouseX, mouseY, pmouseX, pmouseY, round, strokeWeight, sqrt, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke,
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, collidePointRect, CORNERS, CORNER, ellipseMode, CENTER, collidePointCircle collideRectRect */

class StickyNote {

  constructor(x, y, w, h, r, t){

    this.x = x; //50
    this.y = y; //65;
    this.width = w; //200;
    this.height = h; //200;
    this.hue = r; //random(360);
    this.text = t; //"";

    this.circleX;
    this.circleY;
    this.x2 = this.x + this.width;
    this.y2 = this.y + this.height;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragging = false;
    this.draggingResize = false;
    this.circleDiameter = 15;
    this.textInput = createElement("textarea", this.text);
    this.deleteSelf = false;
    this.stateChanged;

  }//end constructor method

  display() {
    if (this.dragging) {

      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
      this.x2 = this.x + this.width;
      this.y2 = this.y + this.height;

    }//end if

    if (this.draggingResize) {

      this.x2 = mouseX;
      this.y2 = mouseY;
      this.width = this.x2 - this.x;
      this.height = this.y2 - this.y;

    }//end if

    this.circleX = this.x + this.width + sqrt(this.circleDiameter / 2);
    this.circleY = this.y + this.height + sqrt(this.circleDiameter / 2);

    if(collidePointRect(mouseX, mouseY, this.x, this.y, this.width, this.height) || collidePointCircle(mouseX, mouseY, this.circleX, this.circleY, this.circleDiameter)) {

      fill(50);
      ellipse(this.circleX, this.circleY, this.circleDiameter, this.circleDiameter);
      this.textInput.style('background', color(this.hue, 100, 75).toString('#rrggbb'));

    } else {

      this.textInput.style('background', color(this.hue, 100, 90).toString('#rrggbb'));

    }//end if

    this.textInput.position(this.x + 10, this.y + 10);
    this.textInput.size(this.width - 10, this.height - 10);
    this.textInput.style("color", "#ffffff");
    this.textInput.style("padding", "15px");
    this.textInput.style("box-sizing", "border-box");
    this.textInput.style("font-family", "Lucida Sans Unicode, Lucida Grande, sans-serif");
    this.textInput.style("font-size", "18px");

  }//end display instance method

  detectMouse() {//detects if the sticky note is being dragged

    if(collidePointRect(mouseX, mouseY, this.x, this.y, this.width, this.height)) {

      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;

    }//end if

    if (collidePointCircle(mouseX, mouseY, this.circleX, this.circleY, this.circleDiameter)) {

      this.draggingResize = true;

    }//end if

  }//end detectMouse instance method

  released() {

    this.dragging = false;
    this.draggingResize = false;

  }//end released instance method

  checkDelete(trashX, trashY, trashWidth, trashHeight) {//when sticky note is dragged into the bottom right corner this method returns true, causing it to be removed from the stickyNotesArray in script.js

    if(collideRectRect(this.x, this.y, this.width, this.height, trashX, trashY, trashWidth, trashHeight)) {

      this.textInput.remove();
      this.deleteSelf = true;

    }//end if

    return this.deleteSelf;

  }//end deleteSelf instance method

  hasStateChanged () {// Whenever text or position is changed, returns true, causing the array to be saved in google chrome
    this.stateChanged = false;

    if (this.dragging == true || this.draggingResize == true) {

      this.stateChanged = true;

    }//end if

    if (this.text != this.textInput.value()) {

      this.text = this.textInput.value();
      this.stateChanged = true;

    }//end if

    return this.stateChanged;

  }//end detectStateChange instance method

}//end StickyNote class
