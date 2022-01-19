
function drawPitch(width, height, goalPosition1, goalPosition2, centerField) {
//function to draw the canvas area of the handball field
    let middleField = height - 100; //where the middle of the field should be placed
    let radius = 400;
    
    myGameArea.context.fillStyle = 'green'; // colors handball pitch green
    myGameArea.context.fillRect(5, 12, width, height);
    myGameArea.context.clearRect(0, middleField, width, 3); // center line of the handball pitch
    myGameArea.context.clearRect((width/2)-80, radius+75, 160, 5); // center line of the handball pitch
    
    function drawGoal(x) {
        myGameArea.context.fillStyle = "red";
        myGameArea.context.fillRect(x, 0, 10, 16);
        myGameArea.context.clearRect(x, 4, 10, 4)
        myGameArea.context.clearRect(x, 12, 10, 4)
      }
    
    drawGoal(goalPosition1); //draw first goal posts
    drawGoal(goalPosition2); //draw second goal posts
    
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
    drawCicles(centerField-175, 0, radius, Math.PI*0.5, Math.PI, [0]); // 1/4 circle, left side of handball field
    drawCicles(centerField+175, 0, radius, 0, Math.PI/2, [0]); // 1/4 circle, right side of handball field
    //drawCicles(centerField-250, 20, 200, Math.PI*0.5, Math.PI, [5, 10]); // 1/4 circle, left side of handball field
    //drawCicles(centerField+175, 0, 200, 0, Math.PI/2); // 1/4 circle, right side of handball field

    function drawLine (lineDash){
        myGameArea.context.beginPath();
        myGameArea.context.setLineDash(lineDash);
        myGameArea.context.moveTo(centerField-175, radius);
        myGameArea.context.lineTo(centerField+175, radius);
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
  var height = 850;
  var width = 1800;
  var centerField = width/2;
  var goalPosition1 = centerField-250; 
  var goalPosition2 = centerField+250;
  var penaltyLeft = 5;
  var scoreLandin = 0;
  var scoreComputer = 0;
  var reachLevel = 1;
  var speedOfY = -4;
  var speedOfX = randomIntFromInterval(-1.8, 1.8);
  
  function startGame() {
    myGameArea.start();  
    var backgroundCanvas = drawPitch(width, height, goalPosition1, goalPosition2, centerField);
    myBackground = new component(1000, 700, backgroundCanvas, 0, 0, "image");
    myGameGoalKeeper = new component(150, 100, "image/NiklasLandinCopy1.png", width/2-60, 10, "image");
    myGameBall = new component(50, 50, "image/ball-removebg-preview.png", width/2-20, 500, "image"); //init for the ball
    
    myShootLeft = new component("30px", "Consolas", "black", 100, 500, "text");
    myLevel = new component("30px", "Consolas", "black", 100, 550, "text");
    myLevelIncrease = new component("50px", "Consolas", "red", 100, 450, "text");
    myScoreLandin = new component("30px", "Consolas", "black", 1400, 500, "text");
    myScoreComputer = new component("30px", "Consolas", "black", 1400, 550, "text");
    myResult = new component("50px", "Consolas", "black", 600, 450, "text");
    myCompletion = new component("60px", "Consolas", "red", 600, 600, "text");
    
    myWinKeeper = new component(400, 400, "image/LandinTakesBall.jfif", width/2-200, 0, "image");
    myLoseKeeper = new component(400, 400, "image/LandinMissesBall.jfif", width/2-200, 0, "image");
    myTotalWin = new component(400, 400, "image/winPicture3.jfif", width/2-200, 0, "image");
    myTotalLose = new component(400, 400, "image/losePicture.jfif", width/2-200, 0, "image");
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
          } 
          else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
          }
          else {
              ctx.fillStyle = color;
              ctx.fillRect(this.x, this.y, this.width, this.height);
          }
      }
      this.newPos = function() {
          this.x += this.speedX;
          this.y += this.speedY;     
      }
  }

function throwBall(){
    myGameBall.speedY = speedOfY; 
    myGameBall.speedX = speedOfX; 
    console.log(myGameBall.speedX);
}

function randomIntFromInterval(min, max) { 
    //let randomnum = Number((Math.random() * (max - min + min) + min).toFixed(2));
    let randomnum = Number((Math.random() * max).toFixed(2));
    randomnum *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    return randomnum;

    //var num = Math.floor(Math.random()*99) + 1; // this will get a number between 1 and 99;
//num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
}

function goalKeeperSave(){
    if (myGameGoalKeeper.y>=(myGameBall.y-20) && myGameGoalKeeper.x-120<=myGameBall.x && myGameGoalKeeper.x+120>=myGameBall.x){
        penaltyLeft -=1;
        scoreLandin +=1;
        return ("Saved");
    } 
    else if (myGameBall.y <= 0 && (myGameBall.x > goalPosition2 || myGameBall.x < goalPosition1)){
        penaltyLeft -=1;
        scoreLandin +=1;
        return "Saved";
    }
    else if (myGameBall.y <= 0 && (myGameBall.x < goalPosition2 || myGameBall.x > goalPosition1)){
        penaltyLeft -=1;
        scoreComputer +=1;
        return "Goal";
    }
    else{
        return ("no");
    }
}

//Keyboard
document.addEventListener('keydown', logKey);

function logKey(e) {
    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
          case 38: // up arrow
          myGameGoalKeeper.speedY -= 1;
            break;
          case 40: // down arrow
          myGameGoalKeeper.speedY += 1;
            break;
          case 37: // left arrow
          myGameGoalKeeper.speedX -= 1;
            break;
          case 39: // right arrow
          myGameGoalKeeper.speedX += 1;
            break;
        }
      });

      document.addEventListener('keyup', (e) => {
        myGameGoalKeeper.speedX = 0;
        myGameGoalKeeper.speedY = 0;
      });
}

function resetValues() {
    penaltyLeft = 5;
    scoreLandin = 0;
    scoreComputer = 0;
}

function countBoard (penaltyLeft, scoreLandin, scoreComputer){
    //document.querySelector('#penalty-throw span').innerText = penaltyLeft;
    myShootLeft.text = "Penalty throw left: " + penaltyLeft;
    myLevel.text = "Level: " + reachLevel + "/5";
    myScoreLandin.text = "Landin saved: " + scoreLandin;
    myScoreComputer.text = "Computer scored: " + scoreComputer;
    
    myShootLeft.update();
    myLevel.update();
    myScoreLandin.update();
    myScoreComputer.update();
}

function resultScoring(result){
    if (result !== "no" || penaltyLeft<=0){        
        countBoard(penaltyLeft, scoreLandin, scoreComputer);
        myGameArea.stop();

        if (result === "Goal"){
            if (scoreComputer === 3){
                myResult.text = "GAME OVER";
                myResult.update();
                myTotalLose.newPos();
                myTotalLose.update();

                resetValues();
                speedOfY = -4; //reset speed and level on game over
                speedOfX = randomIntFromInterval(-1.8, 1.8);
                reachLevel = 1;

                myGameArea.stop();
            }
            else {
                myResult.text = "Computer scored - Buuhh";
                myResult.update();

                myLoseKeeper.newPos();
                myLoseKeeper.update();
            }
        } 
        else if (result === "Saved"){
            if (scoreLandin === 3){
                //speed level should be increased
                myResult.text = "Denmark win EU 2022";
                myResult.update();

                myTotalWin.newPos();
                myTotalWin.update();
                
                if (reachLevel<=4){
                    reachLevel +=1;
                    speedOfY = speedOfY-4;
                    myLevelIncrease.text = "LEVEL UP!!"
                    myLevelIncrease.update();

                } else { //Game is completed
                    myCompletion.text = "GAME COMPLETED!!!";
                    myCompletion.update();
                    speedOfY = -4; //reset speed
                    speedOfX = randomIntFromInterval(-1.8, 1.8);
                    reachLevel = 1;
                } 
                
                resetValues();
                myGameArea.stop();
            }
            else{
                myResult.text = "Landin/you took the ball";
                myResult.update();

                myWinKeeper.newPos();
                myWinKeeper.update();
            }        
        }
        
    //new random position of X
    if (result === "Saved" || result === "Goal"){
        console.log(typeof(reachLevel));
        switch (reachLevel){
            case 1:
                speedOfX = randomIntFromInterval(-1.8, 1.8);
                break;
            case 2:
                speedOfX = randomIntFromInterval(-3.5, 3.5);
                break;
            case 3:
                speedOfX = randomIntFromInterval(-5.4, 5.4);
                break;
            case 4:
                speedOfX = randomIntFromInterval(-7.4, 7.4);
                break;
            case 5:
                speedOfX = randomIntFromInterval(-10.4, 10.4);
                break;
        }
    }
        result ="no"; //reset result
    }
    
}

  function updateGameArea() {
    myGameArea.clear();
    result = goalKeeperSave();  
    
    drawPitch(width, height, goalPosition1, goalPosition2, centerField);  
    myGameGoalKeeper.newPos();    
    myGameGoalKeeper.update();
    myGameBall.newPos();    
    myGameBall.update();
    
    throwBall();
    countBoard(penaltyLeft, scoreLandin, scoreComputer);
    resultScoring(result);
    
  }
  