var ball;
var databasee, position;
var balloonImg,backgroundImg;

function preload(){
balloonImg=loadAnimation("images/1.png","images/3.png","images/4.png");
backgroundImg=loadImage("images/background.png");
    
}


function setup(){
    
    //establishing connection with db
    database = firebase.database();

    createCanvas(1000,700);
    ball = createSprite(250,250,10,10);
    ball.addAnimation("label",balloonImg);
    ball.scale=0.5;
    

    //listener is created by .ons

    var ballPositionRef  = database.ref('ball/position');
    ballPositionRef.on("value",readPosition);
}

function draw(){
    background(backgroundImg);
        if(position !=undefined) {

            if(keyDown(LEFT_ARROW)){
                writePosition(-1,0);
            }
            else if(keyDown(RIGHT_ARROW)){
                writePosition(1,0);
            }
            else if(keyDown(UP_ARROW)){
                writePosition(0,-1);
                if(ball.scale>0.01){
                    ball.scale-=0.01
                }
        
            }
            else if(keyDown(DOWN_ARROW)){
                writePosition(0,+1);
                if(ball.scale<0.5){
                    ball.scale+=0.01
                }
                
            }

    }
    drawSprites();
    
    
}

function writePosition(x,y){
    //.update updates the value in the database, takes JSON parameter
// to read or write we should refer to the node -> by .ref()
   database.ref('ball/position').update({
       x:position.x+x,
       y:position.y+y,
   });
}

function readPosition(data){

    position = data.val(); //.val() extracts the value in data and puts it in the variable

    ball.x= position.x;
    ball.y= position.y;
}