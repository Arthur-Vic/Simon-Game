
let buttonColors = ["red", "blue", "green", "yellow"]

let gamePattern = []

let userClickedPattern = []

let level = 0

function freshGame(){
    gamePattern = []
    userClickedPattern = []
    level = 0
    nextSequence();
};

function newColor(){
    randomColor = buttonColors[Math.floor(Math.random()*4)];
    gamePattern.push(randomColor);
};

function animateSequence() {
    let i = 0;
    function nextIteration() {
        if (i < gamePattern.length) {
            $(`#${gamePattern[i]}`).fadeOut(100);
            playSound(gamePattern[i]);
            $(`#${gamePattern[i]}`).fadeIn(100);
        i++;
        setTimeout(nextIteration, 300);
        };
    };
    nextIteration();
};

function nextSequence(){
    newColor();
    userClickedPattern = []
    animateSequence()
    $('h1').text(`Level: ${level}`);
    level++
};

function playSound(name){
    $(`.audio.${name}`)[0].play();
};

function animatePress(currentColor){
    $(`#${currentColor}`).addClass('pressed')
    setTimeout(function(){
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
};

function checkAnswer(){
let index = userClickedPattern.length - 1
    if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[index]){
        $('h1').html('GAME OVER');
        playSound('wrong');
        $('h1').on('click', function(){
            freshGame();
        });
        
    }else{;
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 500);
        };
    };
};


//GameStart
$(document).on('keydown', function(){
    if (level === 0){
        freshGame();
    };
});

//GameInteraction
$('.btn').on('click', function(){
    let id = $(this).attr('id')
    userClickedPattern.push(id);
    playSound(id);
    animatePress(id);
    checkAnswer();
});