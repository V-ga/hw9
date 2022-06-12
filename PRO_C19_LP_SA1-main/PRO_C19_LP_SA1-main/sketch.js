var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostjumping = loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600, 600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,5,5);
  ghost.addImage('standing',ghostImg);
  ghost.scale = 0.5;

  door = createSprite(400,50,5,5);
  door.addImage('door',doorImg);

  doorsGroup = createGroup()

  score = 0;

}

function draw() {
  background(200);


  if (gamestate === "play"){

    ghost.y = ghost.y+1;
    door.y = door.y+1;
  
    if(tower.y > 400){
        tower.y = 300
      }
  
    
      ghost.velocityY = -1;
    
  
    if(keyDown("Left")){
      ghost.x= ghost.x-1;
    }
  
    if(keyDown("Right")){
      ghost.x = ghost.x+1
    }
  
    if(ghost.y>600){
      gameState = "restart";
    }
    if(ghost.isTouching(door)){
      gameState = "pause";

    text("Score: "+ score, 500,50);
      score = score + Math.round(frameCount/60);
    }
  
    if (gameState === 'pause'){
      text("game over")

    }
    spawnDoors();
  }

 

 

  drawSprites();

}
function spawnDoors() {
   if (frameCount % 60 === 0) {
    door = createSprite(600,100,40,10);
    door.x = Math.round(random(10,60));
    door.addImage(doorImage);

    door.velocityY = 3;
    
    door.lifetime = 200;
    
   
    door.depth = ghost.depth;
    door.depth = ghost.depth + 1;
 
    doorsGroup.add(door);
    
   }
}


