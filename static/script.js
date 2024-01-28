let colors = ["red", "green", "blue", "yellow"];
let pattern = [];
let answer = [];
let level = 1;
let gameOver = true;
var green = new Audio("../sounds/green.mp3");
var red = new Audio("../sounds/red.mp3");
var yellow = new Audio("../sounds/yellow.mp3");
var blue = new Audio("../sounds/blue.mp3");
var wrong = new Audio("../sounds/wrong.mp3");


$(document).on("keydown", function(){
    if (gameOver){
        generateColor();
        $("#statusBoard").text("Level 1");
        gameOver = false;
    }
});

$(".block").click(function(e) {
    if (!gameOver){
        clickedColor = $(e.target).attr("id");
        answer.push(clickedColor);
        pressButton(clickedColor);
        checkAnswer();
    }
});

function pressButton(color) {
    var audioElement = null;

    // Reset the playback position for all audio elements
    green.currentTime = 0;
    red.currentTime = 0;
    yellow.currentTime = 0;
    blue.currentTime = 0;
    wrong.currentTime = 0;

    switch (color) {
        case "green":
            audioElement = green;
            break;
        case "red":
            audioElement = red;
            break;
        case "yellow":
            audioElement = yellow;
            break;
        case "blue":
            audioElement = blue;
            break;
        case "wrong":
            audioElement = wrong;
            break;
    }

    if (audioElement) {
        // Plays the selected sound
        audioElement.play();
    }

    const overlay = $("#"+color);
    overlay.css("opacity", "0.5");
    setTimeout(() => {
        overlay.css("opacity", "1");
    }, 200);
}

function generateColor(){
    pattern.push(colors[Math.floor(Math.random()*4)]);
    pressButton(pattern[pattern.length-1]);
}

function checkAnswer(){
    if (answer[answer.length-1] === pattern[answer.length-1]) {
        if (answer.length === pattern.length){
            answer.length = 0;
            level += 1;
            $("#statusBoard").text("Level " + level);
            setTimeout(() => {
                generateColor();
                
            }, 300);
        }
    }
    else {
        $("#statusBoard").text("Game Over. Press any key to play again.")
        pressButton("wrong");
        answer.length = pattern.length = 0;
        level = 1;
        gameOver = true;
    }
}
