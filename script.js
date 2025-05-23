// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global firebase, createButton, createElement, createInput, constrain, dist, angleMode, DEGREES, arc, clear, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, rectMode, ellipse, lerpColor, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, tint, noTint
          map, mouseX, mouseY, pmouseX, pmouseY, round, strokeWeight, sqrt, line, mouseIsPressed, noFill, windowWidth, windowHeight, noStroke,
          key, keyCode, CENTER, PI, HALF_PI, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, collidePointRect, createP, StickyNote, Chaser, ellipseMode, CENTER, Player, color, textAlign*/


let backgroundColor = 100;
//Chaser stuff
let colorChaser;
let chaser;
let stickyNoteArray = [];
//player stuff
let player;
let x, y, playerWidth, playerHeight, speed, color1;

// Sticky Note Stuff
let createNoteButton;
let trashX;
let trashY;
let trashWidth;
let trashHeight;
let panelInstructions;

function setup() {
  // Global Stuff
  createCanvas(windowWidth - 50, windowHeight - 50);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(CENTER);
  background(backgroundColor);


  //constructor(x, y, size, color, speed)

  // Player Stuff
  x = windowWidth-60;
  y = windowHeight-60;
  playerWidth = 20;
  playerHeight = 20;
  speed = 5;
  color1 = color(50,100,100);
  player = new Player(x, y, playerWidth, playerHeight, speed, color1);
  // Chaser Stuff
  colorChaser = color(0, 100, 100);
  chaser = new Chaser(windowWidth / 2-50, windowHeight / 2-50, 20, colorChaser, player.speed-0.5);

  // Sticky Note Stuff
  panelInstructions = createP(
    "Click the sticky note to edit text, drag the sticky note to move, and drag the grey circle in the bottom right of the sticky note to resize"
  );
  createNoteButton = createButton("New Sticky Note");

  chrome.storage.local.get('stickyNoteArrayOld', function(retrievedData) {
          // Notify that we retrieved
          console.log("retrieved");
          console.log(retrievedData);
          for (let i = 0; i < retrievedData.stickyNoteArrayOld.length; i++) {
            stickyNoteArray.push(new StickyNote(retrievedData.stickyNoteArrayOld[i].x, retrievedData.stickyNoteArrayOld[i].y, retrievedData.stickyNoteArrayOld[i].width, retrievedData.stickyNoteArrayOld[i].height, retrievedData.stickyNoteArrayOld[i].hue, retrievedData.stickyNoteArrayOld[i].text));
            console.log("for loop running");
          }
          console.log(stickyNoteArray);
  });

} //end setup method

function draw() {
  background(backgroundColor);
  displayCreateStickyNotePanel();
  console.log(stickyNoteArray);
  console.log(chaser.x, chaser.y);
  for (let i = 0; i < stickyNoteArray.length; i++) {
    stickyNoteArray[i].display();
    if (stickyNoteArray[i].hasStateChanged()) {
      console.log("state changed");

      chrome.storage.local.set({'stickyNoteArrayOld': stickyNoteArray}, function() {
          // Notify that we saved.
          console.log("saved")
        });

    } //end if
  } //end for

  //Chaser Stuff******
  chaser.draw();
  if (chaser.state === "HIDING") {
    chaser.hide(stickyNoteArray);
  } else if (chaser.state === "CHASING") {
    chaser.chase(player, stickyNoteArray, playerUnderSticky());
    chaser.ping();

  }
  chaser.tag(player);
  //player stuff
  player.draw();
  player.move();
  player.inBounds();
} //end draw method
function playerUnderSticky() {
  let left = player.x - player.width / 2;
  let right = player.x + player.width / 2;
  let top = player.y - player.width / 2;
  let bottom = player.y + player.width / 2;
  let index;
  let arr = [false, index];
  for (let i = 0; i < stickyNoteArray.length; i ++) {
    if(left > stickyNoteArray[i].x && right < stickyNoteArray[i].x2 && top > stickyNoteArray[i].y && bottom < stickyNoteArray[i].y2) {
      arr[0] = true;
      arr[1] = i;
      return arr;
      break;
    }
  }
  arr[0] = false;
  arr[1] = -1;
  return arr;
}

function mousePressed() {
  for (let i = 0; i < stickyNoteArray.length; i++) {
    stickyNoteArray[i].detectMouse();
  } //end for
} //end mousePressed method

function mouseReleased() {
  for (let i = 0; i < stickyNoteArray.length; i++) {
    stickyNoteArray[i].released();
    if (
      stickyNoteArray[i].checkDelete(trashX, trashY, trashWidth, trashHeight) ==
      true
    ) {
      stickyNoteArray.splice(i, 1);

      chrome.storage.local.set({'stickyNoteArrayOld': stickyNoteArray}, function() {
          // Notify that we saved.
          console.log("saved")
        });
        
    } //end if
  } //end for
} //end mouseReleased method

function displayCreateStickyNotePanel() {
  let panelWidth = 250;
  let panelHeight = 380;
  let panelX = 25;
  let panelY = 25;
  let trashStrokeWeight = 10;

  trashWidth = 150;
  trashHeight = 150;
  trashX = panelX;
  trashY = height - trashHeight;

  // Panel Background
  fill(0);
  rect(panelX, panelY, panelWidth, panelHeight);

  // Panel Instructions
  panelInstructions.style("color", "#ffffff");
  panelInstructions.position(panelX + 25, panelY + panelHeight - 140);
  panelInstructions.size(panelWidth - 20, 30);
  panelInstructions.style("font-family", "Lucida Sans Unicode, Lucida Grande, sans-serif");
  panelInstructions.style("font-size", "13px");

  // Delete Sticky Note Panel
  fill(100);
  stroke(0);
  strokeWeight(trashStrokeWeight);
  rect(
    trashX + trashStrokeWeight / 2,
    trashY,
    trashWidth - trashStrokeWeight,
    trashHeight - trashStrokeWeight / 2
  );
  noStroke();
  fill(0);
  textSize(15);
  textAlign(CENTER);
  text(
    "Drag Sticky Notes",
    trashX + trashWidth / 2,
    trashY + trashHeight / 2 - 10
  );
  text(
    "Here to Delete!",
    trashX + trashWidth / 2,
    trashY + trashHeight / 2 + 10
  );

  // Create Note Button
  createNoteButton.style("background", "#ffffff");
  createNoteButton.style("border", "none");
  createNoteButton.style("outline", "none");
  createNoteButton.style("font-family", "Lucida Sans Unicode, Lucida Grande, sans-serif");
  createNoteButton.position(
    (panelWidth - createNoteButton.width + 15) / 2 + panelX,
    panelY + panelHeight - 35
  );
  createNoteButton.mousePressed(createStickyNote);
} //end displayCreateStickyNotePanel method

function createStickyNote() {

  stickyNoteArray.push(new StickyNote(53, 53, 200, 200, random(360), ""));

} //end createStickyNote method

//function keyPressed(): when you are ready to implement it.
