var bgroundImg,ninja,ninjaImg,star,starImg,snake,snakeImg,score,restartImg,gameoverImg,gameState
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload(){
    bgroundImg = loadImage("images/background.jpg")
   ninjaImg = loadAnimation("images/mario0.png","images/mario1.png", "images/mario2.png", 
   "images/mario3.png", "images/mario4.png","images/mario5.png","images/mario6.png","images/mario7.png",
   "images/mario8.png","images/mario9.png","images/mario10.png","images/mario11.png" )

   
   starImg = loadAnimation("images/star 0.png","images/star 1.png","images/star 2.png","images/star 3.png",
   "images/star 4.png","images/star 5.png"
   ,"images/star 6.png","images/star 7.png","images/star 8.png",
   "images/star 9.png","images/star 10.png","images/star 11.png","images/star 12.png"
   ,"images/star 13.png","images/star 14.png","images/star 15.png","images/star 16.png",
   "images/star 17.png","images/star 18.png","images/star 19.png"
   ,"images/star 20.png")


   snakeImg = loadAnimation("images/snakes 0.png","images/snakes 1.png","images/snakes 2.png","images/snakes 3.png",
   "images/snakes 4.png","images/snakes 5.png"
   ,"images/snakes 6.png","images/snakes 7.png","images/snakes 8.png",
   "images/snakes 9.png","images/snakes 10.png","images/snakes 11.png","images/snakes 12.png"
   ,"images/snakes 13.png","images/snakes 14.png","images/snakes 15.png")

restartImg = loadImage("images/restart.png")

gameoverImg = loadImage("images/gameOver.png")

}








function setup(){
createCanvas(1550,700)
bground = createSprite(1050,100,1550,750);
  bground.addImage("bground",bgroundImg);
bground.scale=5.5
  bground.velocityX = -15  ;
bground.x=bground.width/2



ninja = createSprite(150,600,10,10);
ninja.addAnimation("ninja",ninjaImg);
ninja.scale=0.5
ninja.setCollider("circle",0,0,200)

score=0


gameOver = createSprite(500,350);
gameOver.addImage(gameoverImg);

restart = createSprite(500,400);
restart.addImage(restartImg);

gameOver.scale = 1;
restart.scale = 1;

gameOver.visible = false;
restart.visible = false;

invisibleGround = createSprite(50,620,400,10);
invisibleGround.visible = false;

starsGroup = new Group();
snakesGroup = new Group();
}


function draw(){
background(0)

if (gameState === PLAY){


if (bground.x < 0){
bground.x=bground.width/2    
}

if(ninja.isTouching(starsGroup)){
score=score+1

starsGroup[0].destroy()
}
if(ninja.isTouching(snakesGroup)){
  
  gameState=END
  snakesGroup[0].destroy ()
  }



console.log(ninja.y)

if( keyDown ("space")&& ninja.y >=489){
ninja.velocityY = -16
}

ninja.velocityY = ninja.velocityY + 1



}


else if (gameState===END){
  gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    bground.velocityX = 0;
    ninja.velocityY = 0;
    
    snakesGroup.setVelocityXEach(0);
    starsGroup.setVelocityXEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
   snakesGroup.setLifetimeEach(-1);
    starsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }



  
}











ninja.collide(invisibleGround);

drawSprites()

text("Score: "+ score, 500,50);

spawnStars()
spawnsnakes()
}

function reset(){
  gameState = PLAY;
  bground.velocityX = -(6)
  gameOver.visible = false;
  restart.visible = false;
  
  snakesGroup.destroyEach();
  starsGroup.destroyEach();
  
  ninja.changeAnimation("ninja",ninjaImg);
  
  score = 0;
  
}


function spawnStars() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var star = createSprite(1550,300,10,10);
   
    star.y = Math.round(random(300,500));
    star.addAnimation("star",starImg);
   star.scale = 0.5;
    star.velocityX = -15;
    star.setCollider("circle",0,0,100)
     //assign lifetime to the variable
    star.lifetime = 1000;
    
    //adjust the depth
    star.depth = ninja.depth;
    ninja.depth = ninja.depth + 1;
    
    //add each cloud to the group
    starsGroup.add(star);
  }
}


function spawnsnakes() {
  if(frameCount % 60 === 0) {
    var snake = createSprite(600,550,10,40);
    snake.debug=true
    snake.setCollider("circle",50,45,100)
    snake.velocityX = -15 
  snake.addAnimation("snake",snakeImg);
    
    //assign scale and lifetime to the obstacle           
    snake.scale = 0.5;
    snake.lifetime = 300;
    //add each obstacle to the group
    snakesGroup.add(snake);
  }
}