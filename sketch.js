var lane;
var player, playerRunning, playerCrashed;
var score;
var shield8, shield8_previous, shield8Image, shield8Group;
var knife, knifeImage, knifeGroup;
var gameOver, gameOverImage;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

function preload() {
  playerRunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  playerCrashed = loadAnimation("trex_collided-1.png");

  gameOverImage = loadImage("gameOver.png");

  knifeImage = loadImage("knife.png");

  shield8Image = loadImage("900px-I-8svg.png");
  
}

function setup() {
 createCanvas(500,400);

  gameOver = createSprite(200,200,20,20);
  gameOver.addImage("gameover",gameOverImage);
  gameOver.visible = false;
  
  score = 0;
  
  knifeGroup = new Group();
  shield8Group = new Group();

  player = createSprite(200,350,100,20);
  player.addAnimation("running",playerRunning);
  player.addAnimation("crashed",playerCrashed);
  
}


function draw() {
 background("white");
  
  text("Score: " + score,25,25);
 
  

  if (shield8Group.isTouching(player)) {
    score = score + 1;
     shield8_previous.destroy();
   }

   

  if (gameState == PLAY) {
    player.changeAnimation("running",playerRunning);
    gameOver.visible = false;
    createShield();
    createKnife();
    createLane();
  }

  
  player.x = mouseX;

 // shield8Group.isTouching(player,hit);

 
  if (knifeGroup.isTouching(player)) {
    gameState = END;
  }

 
  if (gameState == END) {
    player.changeAnimation("crashed",playerCrashed);
    gameOver.visible = true;
    lane.velocityY = 0;
    shield8.velocityY = 0;
    knife.velocityY = 0;
    shield8Group.destroyEach();
  }



  drawSprites();
  }

  

 // function hit(shield,player) {
  //  shield8.destroy();
  //  score = score + 1;
 // }

function createShield() {    
    if (frameCount % 60 == 0) {
      shield8_previous = shield8;
      shield8 = createSprite(200,0,40,40);
      shield8.addImage("interstate8",shield8Image);
      shield8.scale = 0.1;
      shield8.x = Math.round(random(20,380));
      shield8.velocityY = 3;
      shield8.lifetime = 400;
      shield8Group.add(shield8);
      }
    }

  function createKnife() {

    if (frameCount % 600 == 0) {
      knife = createSprite(200,0,40,40);
      knife.addImage("knife",knifeImage);
      knife.x = Math.round(random(20,380));
      knife.lifetime = 400;
      knife.velocityY = 2;
      knifeGroup.add(knife);
      }
  }
  
     function createLane() {

    if (frameCount % 30 == 0) {
      lane = createSprite(200,0,10,100);
      lane.lifetime = 400;
      lane.velocityY = 5;
    }
  }




