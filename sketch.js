const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boat;
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  

  cannon = new Cannon(180, 110, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  //continually updates the engine 
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  //shows cannonballs in the array 
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
  }

  cannon.display();
  showBoats();
}

function keyPressed() {

  //shoots cannonball using trajectory and the angle 
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  }
}

function showBoats () {
  if (boats.length > 0) {

    //if boats have something in them, and the boat is 300 away from the right of the screen, and last boat is not undefined
    if (boats[boats.length - 1] === undefined || 
      boats[boats.length - 1].boat.position.x < width - 300) {

        //positons array for random 
        var positions = [-40,-60,-20,-70]; 

        var position = random(positions);

        boat = new Boat(width - 70,height - 70, 170, 180, position);
        boats.push(boat);   

    }
    for (var i = 0;i < boats.length;i++ ) {
      if (boats[i]){
        //boats[i].boat gives velocity to every boat in the array (current boat)
        Matter.Body.setVelocity(boats[i].boat, {x:-0.8,y:0});

        boats[i].display();
      }
    }
  } else {
    boat = new Boat(width - 70,height - 70, 170, 180, -80);
    boats.push(boat);
  }


}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}
