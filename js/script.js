
function drawPitch(width, height) {
//function to draw the canvas area of the handball field
    let middleField = height - 100; //where the middle of the field should be placed
    let centerField = width/2;
    
    myGameArea.context.fillStyle = 'green'; // colors handball pitch green
    myGameArea.context.fillRect(5, 12, width, height);
    myGameArea.context.clearRect(0, middleField, width, 3); // center line of the handball pitch
    
    function drawGoal(x) {
        myGameArea.context.fillStyle = "red";
        myGameArea.context.fillRect(x, 0, 10, 16);
        myGameArea.context.clearRect(x, 4, 10, 4)
        myGameArea.context.clearRect(x, 12, 10, 4)
      }
    
    drawGoal(centerField-150); //draw first goal posts
    drawGoal(centerField+150); //draw second goal posts
    
    function drawCicles(x, y, radius, startAngle, endAngle, lineDash){
        myGameArea.context.beginPath(); 
        myGameArea.context.arc(x, y, radius, startAngle, endAngle);
        myGameArea.context.lineWidth = 5;
        myGameArea.context.strokeStyle = 'white';
        myGameArea.context.setLineDash(lineDash);
        myGameArea.context.stroke();
        myGameArea.context.closePath();
    }

    drawCicles(centerField, middleField, 75, 0, Math.PI *2, [0]); //circle in the center of the handball pitch
    drawCicles(centerField-175, 0, 200, Math.PI*0.5, Math.PI, [0]); // 1/4 circle, left side of handball field
    drawCicles(centerField+175, 0, 200, 0, Math.PI/2, [0]); // 1/4 circle, right side of handball field
    //drawCicles(centerField-250, 20, 200, Math.PI*0.5, Math.PI, [5, 10]); // 1/4 circle, left side of handball field
    //drawCicles(centerField+175, 0, 200, 0, Math.PI/2); // 1/4 circle, right side of handball field

    function drawLine (lineDash){
        myGameArea.context.beginPath();
        myGameArea.context.setLineDash(lineDash);
        myGameArea.context.moveTo(centerField-175, 200);
        myGameArea.context.lineTo(centerField+175, 200);
        myGameArea.context.lineWidth = 5;
        myGameArea.context.strokeStyle = 'white';
        myGameArea.context.stroke();
    }    
    drawLine([0]);
    //drawLine([5, 10]);
  };
  
  var myGameGoalKeeper;
  var myBackground;
  var myGameBall;
  var height = 680;
  var width = 1000;
  
  function startGame() {
    myGameArea.start();  
      
    var backgroundCanvas = drawPitch(width,height);
    myBackground = new component(1000, 700, backgroundCanvas, 0, 0, "image");
    myGameGoalKeeper = new component(150, 100, "image/NiklasLandinCopy1.png", 420, 10, "image");
    myGameBall = new component(50, 50, "image/ball-removebg-preview.png", width/2-20, 300, "image"); //init for the ball
  }
  
  var myGameArea = {
      canvas : document.createElement("canvas"),
      start : function() {
          this.canvas.width = width;
          this.canvas.height = height;
          this.context = this.canvas.getContext("2d");
          document.body.insertBefore(this.canvas, document.body.childNodes[0]);
          this.frameNo = 0;
          this.interval = setInterval(updateGameArea, 20);
          },
      clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      stop : function() {
          clearInterval(this.interval);
      }
  }
  
  function component(width, height, color, x, y, type) {
      this.type = type;
      if (type === "image") {
          this.image = new Image();
          this.image.src = color;
      }
      this.width = width;
      this.height = height;
      this.speedX = 0;
      this.speedY = 0;    
      this.x = x;
      this.y = y;    
      this.update = function() {
          ctx = myGameArea.context;
          if (type == "image") {
              ctx.drawImage(this.image, 
                  this.x, 
                  this.y,
                  this.width, this.height);
          } else {
              ctx.fillStyle = color;
              ctx.fillRect(this.x, this.y, this.width, this.height);
          }
      }
      this.newPos = function() {
          this.x += this.speedX;
          this.y += this.speedY;     
          //console.log(myGameBall.x + "place X: " + this.x);   
          //console.log("place Y: " + this.y);
      }

  }

function throwBall(){
    myGameBall.speedY = -1; 
    //myGameBall.speedX = -0.5; rammer stolpen
    myGameBall.speedX = 0; 
}

function goalKeeperSave(){
    let centerField = width/2;
    goalPosition1 = centerField-150; 
    goalPosition2 = centerField+150; 

    if (myGameGoalKeeper.y>=(myGameBall.y-20) && myGameGoalKeeper.x-120<=myGameBall.x && myGameGoalKeeper.x+120>=myGameBall.x){
        console.log("keeper: " + myGameGoalKeeper.x + " 1X ball: " + myGameBall.x);
        console.log("keeper: " + myGameGoalKeeper.y + " Y ball: " + (myGameBall.y-40));
        myGameArea.stop();
        console.log("goal keeper save the ball");
    } 

    else if (myGameBall.y <= 0 && (myGameBall.x > goalPosition2 || myGameBall.x < goalPosition1)){
        console.log(" 1X ball: " + myGameBall.x + "stolpe 1:" + goalPosition1);
        console.log(" Y ball: " + (myGameBall.y)+ "stolpe 2:" + goalPosition2);
        myGameArea.stop();
        console.log("outside of the goal");
    }

    else if (myGameBall.y <= 0 && (myGameBall.x < goalPosition2 || myGameBall.x > goalPosition1)){
        console.log(" 1X ball: " + myGameBall.x + "stolpe 1:" + goalPosition1);
        console.log(" Y ball: " + (myGameBall.y)+ "stolpe 2:" + goalPosition2);
        myGameArea.stop();
        console.log("goal");
    }
}

  function updateGameArea() {
      myGameArea.clear();
      drawPitch(width,height);
      myGameGoalKeeper.newPos();    
      myGameGoalKeeper.update();
      myGameBall.newPos();    
      myGameBall.update();
      throwBall();
      goalKeeperSave();
  }
  
  function moveup() {
    myGameGoalKeeper.speedY = -1; 
}

function movedown() {
    myGameGoalKeeper.speedY = 1; 
}

function moveleft() {
    myGameGoalKeeper.speedX = -1; 
}

function moveright() {
    myGameGoalKeeper.speedX = 1; 
}

function clearmove() {
    myGameGoalKeeper.speedX = 0; 
    myGameGoalKeeper.speedY = 0; 
}

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 38: // up arrow
        player.speedY -= 1;
        break;
      case 40: // down arrow
        player.speedY += 1;
        break;
      case 37: // left arrow
        player.speedX -= 1;
        break;
      case 39: // right arrow
        player.speedX += 1;
        break;
    }
  });  

  document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0;
  });