

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickPattern = [];

var started = false;

var level = 0;

//Start Game
$(document).on("keydown", () => {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", (e) => {
    var userChosenColour = e.target['id'];
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length - 1);

});

checkAnswer = (currentLevel) => {

    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over,press Any key to Restart.");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


nextSequence = () => {
    userClickPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

playSound = (name) => {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


animatePress = (currentColour) => {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}



startOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
}












