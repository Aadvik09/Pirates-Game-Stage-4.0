class Boat {
    constructor(x,y,width,height,boatPos) {
        this.width = width
        this.height = height
        
        this.image = loadImage("assets/boat.png");

        this.boatPosition = boatPos;

        var options = {
            restitution : 0.8,
            friction : 1,
            density : 1
            
        }

        this.boat = Bodies.rectangle(x,y,width,height,options);

        World.add(world,this.boat);

    }

    display () {
        var pos = this.boat.position;
        push();
        //used when you expect body to have movement from falling/hitting etc.
        translate(pos.x,pos.y);
        imageMode(CENTER);
        image(this.image, 0, this.boatPosition,this.width, this.height);
        pop();

       
    }
    
    
}