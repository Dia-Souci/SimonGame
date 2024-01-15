var color= ['green','red','yellow','blue'];
var colorSeq =[];
var userColorSeq =[];
var gameStarted = false;
function nextSeq(){
    userColorSeq =[];
    var randomBox = Math.floor(Math.random()*4);
    var colorChosen= color[randomBox];
    colorSeq.push(colorChosen);
    $('#' +colorChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorChosen);
    lvl++;
    $("#level-title").text("level "+lvl);
}

var lvl=0;

    
$(document).keypress(function(){
    if(!gameStarted){
        gameStarted=true;
        nextSeq();
    }
});
    



$(".btn").on("click",function(){
    if(gameStarted){
        var id=$(this).attr("id");
        userColorSeq.push(id);
        animatedPress(id);
        playSound(id);
        clickCheck(userColorSeq.length-1);
    }
        
});



function playSound(name){
    switch (name){
        case 'green' : var green = new Audio("sounds/green.mp3"); green.play(); break;
        case 'red' : var red = new Audio("sounds/red.mp3"); red.play(); break;
        case 'yellow' : var yellow = new Audio("sounds/yellow.mp3"); yellow.play(); break;
        case 'blue' : var blue = new Audio("sounds/blue.mp3"); blue.play(); break;
    }
}
function animatedPress(currentcolor){
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("pressed");
    },100);
}



function clickCheck(level){
    if(userColorSeq[level]===colorSeq[level]){
        if(userColorSeq.length===colorSeq.length){
            setTimeout(function(){
                nextSeq();
            },1000);
        }
    }else{
        var wrong = new Audio("sounds/wrong.mp3"); wrong.play() ;
            $("body").addClass("game-over");
            $("#level-title").text("Press Any Key to Start");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            restart();

    }
    
}

function restart(){
    userColorSeq=[];
    colorSeq = [];
    lvl =0;
    gameStarted=false;
}