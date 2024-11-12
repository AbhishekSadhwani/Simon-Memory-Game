const btnColors = ["red", "blue","yellow","green"];
let isGameStarted = false;
let gamePattern = [];
let userPattern = [];
let level = 0;

// function to handle sound play
const playSound = (color) => {
    const colorSound= new Audio("sounds/"+color+".mp3");
    colorSound.play();
};

// function to handle animation of button when it is clicked
const handleBtnAnimation = (color) => {    
    
    // add class pressed to button
    $("."+color).addClass("pressed");
    
    // remove class after 100ms
    setTimeout(() => {
        $("."+color).removeClass("pressed");
    },100);
}


// function to generate sequence
const nextSequence = () => {
    // reseting userPattern when a sequence starts
    userPattern = [];

    // increasing level
    level++;
    $("h1").text("Level "+level);

    // generate a random number between 0-3
    const randomNum = Math.floor(Math.random() * 4);
    // getting hold of a random color from the array using the random number generated as index
    const randomColor = btnColors[randomNum];
    $("."+randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    gamePattern.push(randomColor);
};


const checkAnswer = (currentLevel) => {
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            },1000);
        }
        
        return true;

    }else{
        playSound("wrong");
        $("body").addClass("wrong-answer");
        setTimeout(()=> {
            $("body").removeClass("wrong-answer");
        },100)
        $("h1").text("Game Over, Press Any Key to Restart");
        restartGame();
    }
};


const restartGame = () => {
    gamePattern = [];
    level = 0;
    isGameStarted = false;
}


// handling keypress which will start the game
$(document).keypress(() => {
    if(!isGameStarted){
        nextSequence();
        isGameStarted = true;
    }
})


// handling user click
$("button").click((e) => {
    const currentBtnColor = e.target.value;
    userPattern.push(currentBtnColor);
    playSound(currentBtnColor);
    handleBtnAnimation(currentBtnColor);    
    checkAnswer(userPattern.length - 1);
} );


