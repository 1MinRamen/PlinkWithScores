const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var ground;
var engine,world;

var particles = [];
var plinkos = [];
var divisions = [];

var count = 0;
var score = 0;
var particle;
var turn = 0;

var gamestate = "start";

var divisionHeight = 300;

function setup() {
  createCanvas(800,800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <= width; k = k + 80){
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,75));
  }
  for (var j = 50; j <= width - 10; j = j + 50){
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <= width; j = j + 50){
    plinkos.push(new Plinko(j,275));
  }
  for (var j = 50; j <= width - 10; j = j + 50){
    plinkos.push(new Plinko(j,375));
  }
}

function draw() {
  background(0);
  Engine.update(engine);

  // if (frameCount%120===0){
  //   particles.push(new Particle(random(width/2-10,width/2+10),10,10));
  // }

  fill("white");
  textSize(25);
  text("Score: " + score, 20,40);

  text("500", 20,550);
  text("500", 100,550);
  text("500", 180,550);
  text("500", 260,550);

  text("100", 340,550);
  text("100", 420,550);
  text("100", 500,550);

  text("200", 580,550);
  text("200", 660,550);
  text("200", 740,550);

  ground.display();
  
  for (var k = 0; k < divisions.length; k++){
    divisions[k].display();
  }

  for (var j = 0; j < plinkos.length; j++){
    plinkos[j].display();
  }

  // for (var e = 0; e < particles.length; e++){
  //   particles[e].display();
  // }
  if (particle != null){
    particle.display();

    if(particle.body.position.y>760){
      if(particle.body.position.x<300){
        score=score+500;
        particle=null;
        if (count>=5) gamestate = "end";
      }
      else if(particle.body.position.x<600 && particle.body.position.x>301){
        score=score+100;
        particle=null;
        if (count>=5) gamestate = "end";
      }
      else if(particle.body.position.x<900 && particle.body.position.x>601){
        score=score+200;
        particle=null;
        if (count>=5) gamestate = "end";
      }
    }
  }

  if (gamestate === "end"){
    textSize(100);
    text("GAME OVER",150,250);
  }
}

function keyPressed(){
  if(gamestate !== "end" && keyCode === 32){
    count = count + 1;
    particle = new Particle(mouseX,10,10);
  }
}