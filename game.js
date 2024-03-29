var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started=false;
var level=0;


$(document).keypress(function(){
  if(started===false){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(nextSequence,1000);
    }
  }
  else{
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    var audio2 = new Audio("sounds/wrong.mp3");
    audio2.play();
    $("h1").text("Game Over, Press Any Key to Restart");

    startover();
  }

}


function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColour);
  
}


function playsound(soundkey) {
  var audio1 = new Audio("sounds/" + soundkey + ".mp3");
  audio1.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}



function startover(){
  level=0;
  gamePattern=[];
  started=false;

}