var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOverImg, restartImg;
var gameOver, restart;

var monkeydi;

var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var background1, background1Img

function preload() {

  background1Img = loadImage("jungle.jpg");

  monkeydi = loadAnimation(" monkey_1.png");

  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("RESTART.png");
}



function setup() {
  createCanvas(600, 400);

  background1 = createSprite(600, 400);
  background1.addImage(background1Img);
  background1.x = background1.width / 2;


  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
  monkey.scale = 0.1
  monkey.addAnimation("collided", monkeydi);

  ground = createSprite(400, 390, 900, 10);
  ground.visible = false;
  ground.x = ground.width / 2;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  gameOver = createSprite(200, 100);
  gameOver.addImage(gameOverImg);

  restart = createSprite(200, 200);
  restart.addImage(restartImg);

  score = 0;

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

}


function draw() {

  background(255);

  
  if (gameState === PLAY) {
    ground.velocityX = -4;

    background1.velocityX = -4;

    monkey.velocityY = monkey.velocityY + 0.8;

    if (background1.x < 0) {
      background1.x = background1.width / 2;
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (FoodGroup.isTouching(monkey)) {
      score = score + 1;
    }

    if (keyWentDown("space") && monkey.y >= 270) {
      monkey.velocityY = -12;
    }

    monkey.collide(ground);
    spawnFood();
    spawnObstacles();

    if (obstaclesGroup.isTouching(monkey)) {
      gameState = END;
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    background1.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);

    gameOver.visible = true;
    restart.visible = true;


    monkey.changeAnimation("collided", monkeydi);

    obstaclesGroup.setLifetimeEach(-1)
    FoodGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
    }

  }
  drawSprites();
  fill("black");
  textSize(20);
  text("Score: " + score, 200, 50);



}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 250, 40, 10);
    banana.y = random(300, 320);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 3

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.1

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(800, 370, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;

    //lifetime to the obstacle     
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();

  monkey.changeAnimation("moving", monkey_running);

  score = 0;
}