var b3,b3image;
var monkey , monkey_running
var restart,restartImage;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var Bground,BgroundI;
var ground;
var bananaGroup;
var PLAY=1;
var END=0;
var gameState=1;
var bananaGroup;
var stoneGroup;
var monkeyI;
var backSound;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyI=loadImage("sprite_1.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  BgroundI=loadImage("bg.jpg");
  restartImage=loadImage("re.jpg");
  b3image=loadImage("b3.jpg");
 
  bananaGroup=new Group();
  stoneGroup=new Group();
}



function setup() {
createCanvas(550,480);
score=0;

Bground=createSprite(200,200,500,400);
Bground.addImage(BgroundI);
Bground.scale =1.5;  
monkey=createSprite(80,395,20,60);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;
ground=createSprite(400,430,900,10);
ground.velocityX=-(4+score/100);
ground.x=ground.width/2;
ground.shapeColor="darkgreen"; 
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
monkey.debug=false;
restart = createSprite(280,230);
restart.addImage(restartImage);
restart.scale=0.1;  
restart.visible=false;

}



function draw() { 
  Bground.velocityX=-(3+score/100);
  if(Bground.x < 120){
      Bground.x = Bground.width/2;
}
  
  if(ground.x < 120){
      ground.x = ground.width/2;
}
  
  if(keyDown("space")&&monkey.y>=225){
    monkey.velocityY=-12;
}
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);

         
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
}
  
  if(stoneGroup.isTouching(monkey)){
    gameState=END;
}

  if(gameState===END){
    monkey.visible=false;
    score=0;
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
  Bground.velocityX=0;
  bananaGroup.setVelocityXEach=0;
  stoneGroup.setVelocityXEach=0;
  bananaGroup.setLifetimeEach(-3);
  stoneGroup.setLifetimeEach(-3);
  monkey.changeImage(monkeyI) ;
  restart.visible=true;
  }
  
  food();
  stone();     
  drawSprites();
  
  fill("white");
  stroke("white");
  textSize(15);
  text("SURVIVAL TIME: "+ score,1,50);
  score = score + Math.round(getFrameRate()/60);
   console.log(monkey.y) 
  if(mousePressedOver(restart)){
    reset();
  }
 

}

function reset(){
  gameState=PLAY;
  restart.visible=false;
  bananaGroup.destroyEach();
  stoneGroup.destroyEach();
  monkey.changeAnimation("running",monkey_running);
  score=0;
  monkey.visible=true;
}

function food(){
  if(frameCount %80===0){
  var banana=createSprite(600,405,10,40); 
  banana.velocityX = -(6+score/100);
  banana.addAnimation("ban",bananaImage);
  banana.scale=0.12;  
  banana.y=Math.round(random(150,250));
  banana.lifetime=13.3;
  bananaGroup.add(banana);
  }
}

function stone(){
  if(frameCount%300===0){
    var stone=createSprite(600,405,10,40);
    stone.velocityX=-(6+score/100);
    stone.addAnimation("sto",obstaceImage);
    stone.scale=0.13;
    stone.lifeTIME=50;
    stoneGroup.add(stone);
  }
}


