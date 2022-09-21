var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img
var zombie, zombieImg;


var zombieGroup;
var life = 3;



function preload(){
  
 

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  zombieImg = loadImage("assets/zombie.png")


  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionar a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//criar o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //criar sprites para representar as vidas restantes
   heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.addImage(heart1Img)
  heart1.scale = 0.4
  heart1.visible = false

   heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale =0.4
  heart2.visible = false

   heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale = 0.4
  heart3.visible = false

    //criar o grupo para os zumbis   
    zombieGroup = new Group()
}

function draw() {
  background(0); 


    //exibir a imagem apropriada de acordo com as vidas restantes
    if(life===3){
      heart3.visible = true
      heart2.visible = false
      heart1.visible = false
    }

    if(life===2){
      heart3.visible = false
      heart2.visible = true
      heart1.visible = false
    }
  
    if(life===1){
      heart3.visible = false
      heart2.visible = false
      heart1.visible = true
    }
    //ir para gameState (estado do jogo) "você perdeu" quando restar 0 vidas 
    if(life===0){
      heart3.visible = false
      heart2.visible = false
      heart1.visible = false
      player.destroy()
    }


  
  //mover o jogador para cima e para baixo e tornar o jogo compatível com dispositivos móveis usando touches (toques)
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//disparar as balas e mudar a imagem do atirador para a posição de tiro quando a tecla espaço for pressionada
if(keyWentDown("space")){
  
  player.addImage(shooter_shooting)
  
 
}

//o jogador volta à imagem original quando paramos de pressionar a tecla espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


//destruir o zumbi quando o jogador toca nele
if(zombieGroup.isTouching(player)){
for(var i=0; i<zombieGroup.length; i++){
if(zombieGroup[i].isTouching(player)){
zombieGroup[i].destroy()
life = life-1
}
}
}




//chamar a função para gerar os zumbis
enemy()


drawSprites();
text("Vidas = " + life,displayWidth-200,displayHeight/2-280)
}



//criar função para gerar os zumbis
function enemy(){
  if(frameCount%50===0){

    //atribuir posições x e y aleatórias para o zumbi aparecer
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    //add imagem ao zumbi, velocidade e diminuir a escala dele
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.lifetime = 400

    //add o zumbi ao grupo
   zombieGroup.add(zombie)

  }

}
