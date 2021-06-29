var PLAY = 1;

var END = 0;

var gamestate = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,
obstacle6,obstaclesGroup;

var score=0;

var  gameOver , gameOverImage;
var restart , restartImage ;
var  checkpointsound,jumpsound,diesound;
 var msg = "Winner Winner Chicken Denner";

 
  
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
 
  diesound = loadSound("die.mp3");
  jumpsound = loadSound("jump.mp3");
  checkpointsound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);

  
 
  
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
   gameOver=createSprite(300,50,50,50);
  gameOver.addImage("geameOver",gameOverImage);
  gameOver.scale=0.5;
   gameOver.visible= false; 
  
   restart=createSprite(300,100,50,50);
  restart.addImage("restart",restartImage);
    restart.scale=0.5;
  restart.visible=false;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  trex.debug=false;
  trex.setCollider('circle',0,0,50);
  
}

function draw() {
  background("lightblue");
  
 
  textSize(10);
  text("score" + score,500,20);
 
   console.log(msg);
  
  
 if (gamestate=== PLAY){
 
   score=score + Math.round(getFrameRate()/60);
  
   
  ground.velocityX = -(4+Math.round(score/100));
  
   if(score>0 && score %100===0){
   checkpointsound.play ();
    text('You have scored ',+score,500,40);
   }
   
   if(keyDown("space") && trex.y>=150) {
    trex.velocityY = -10;
   jumpsound.play();
     jumpsound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.4;
  
   if (ground.x < 0){
    ground.x = ground.width/2;
      } 
   
    spawnClouds();
  
  spawnObstacles();
  
   if (obstaclesGroup.isTouching(trex)){
     diesound.play();
      
    trex.velocityY = -10;
    
    gamestate = END;
   }
   
}  
  else if(gamestate=== END){
    
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
    
    trex.changeAnimation("collided",trex_collided);
    
   
    gameOver.visible= true; 
    restart.visible=true;
  
    if(mousePressedOver(restart)){
      resetup();
      
    }
  }
 
   trex.collide(invisibleGround);
 
  
  //spawn the clouds
 
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -(3+Math.round(score/100));
   
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    cloud.lifetime=200;
    cloudsGroup.add(cloud);
    
   
    }
}
 function spawnObstacles(){
   
   if(frameCount % 60 === 0) {
     obstacle=createSprite(600,160,10,10);
     obstacle.velocityX =  -(5+Math.round(score/100));
     
     var rand =Math.round( random(1,6));
     switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;   
      case 2: obstacle.addImage(obstacle2);
      break; 
      case 3: obstacle.addImage(obstacle3);
      break; 
      case 4: obstacle.addImage(obstacle4);
      break; 
      case 5: obstacle.addImage(obstacle5);
      break; 
      case 6: obstacle.addImage(obstacle6);
      break; 
    default:break;
   }
     obstacle.scale=0.5;
     obstacle.lifetime=130;
     obstaclesGroup.add(obstacle);
   }
   

 }

function resetup (){
  
  score=0;
 
   gameOver.visible= false; 
    restart.visible=false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
trex.changeAnimation("running", trex_running);  
   gamestate=PLAY;
}




















