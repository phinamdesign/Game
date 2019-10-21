var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ball = {
    x: 20,
    y: 20,
    radius:15,
    dx: 5,
    dy: 2
};

var plank = {
    width: 100,
    height: 20,
    x : 0,
    y : canvas.height - 20,
    speed:10,
    isMovingRight : false,
    isMovingLeft : false,
};

var isGameOver = false;

var BrickConfig = {
    ofsetx: 25,
    ofsety: 25,
    margin: 25,
    width: 70,
    height: 15,
    totalRow: 4,
    totalCol: 6
};

var BrickList = [];

for(var i=0 ; i<BrickConfig.totalRow ; i++){
    for(var j=0; j<BrickConfig.totalCol ; j++){
        BrickList.push({
            x:BrickConfig.ofsetx + j * (BrickConfig.width + BrickConfig.margin),
            y:BrickConfig.ofsety + i * (BrickConfig.height + BrickConfig.margin) ,
            isBroken : false
        });
    }

};

function drawPlank(){
    ctx.beginPath();
    ctx.rect(plank.x,plank.y,plank.width,plank.height);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
};

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 37){
        plank.isMovingLeft = false;
    }else if (event.keyCode == 39){
        plank.isMovingRight = false;
    }
});

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37){
        plank.isMovingLeft = true;
    }else if (event.keyCode == 39){
        plank.isMovingRight = true;
    }
});
function drawball() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius,0,Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function framesball() {
    if (ball.x < ball.radius || ball.x > canvas.width-ball.radius){
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius){
        ball.dy = -ball.dy;
    }
}



function drawBricks() {
    BrickList.forEach(function(b){
       if(!b.isBroken){
        ctx.beginPath();
        ctx.rect(b.x,b.y,BrickConfig.width,BrickConfig.height);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
       }

    })
}

function coordinatesball() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function collisionPlank() {
    if (ball.x + ball.radius >= plank.x && ball.x + ball.radius <= plank.x + plank.width &&
        ball.y + ball.radius >= canvas.height - plank.height){
        ball.dy = -ball.dy;
    }
}
function vachambong(){
    BrickList.forEach(function(b){
        if(!b.isBroken){
            if(ball.x + ball.radius >= plank.x && ball.x + ball.radius <= plank.x + plank.width &&
                ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + BrickConfig.radius){
                ball.dy = -ball.dy;
                b.isBroken = true;
            }
        }
    });

}

function updateCoordinatesball() {
    if (plank.isMovingLeft){
        plank.x -= plank.speed;
    }else if (plank.isMovingRight){
        plank.x += plank.speed;
    }

    if (plank.x <0){
        plank.x = 0;
    }else if (plank.x > canvas.width - plank.width){
        plank.x = canvas.width - plank.width;
    }
}

function checkGameOver() {
    if (ball.y > canvas.height-ball.radius){
        isGameOver = true;
    }
}
 function handleGameOver() {
     alert("Thua cuộc");
 }

function draw() {
    if(isGameOver){
        handleGameOver();
    }else {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawball();
        drawPlank();
        drawBricks()
        updateCoordinatesball();
        framesball();
        coordinatesball();
        collisionPlank();
        checkGameOver();
        requestAnimationFrame(draw);
    }
}
draw();

