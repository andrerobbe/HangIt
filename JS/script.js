//OBSERVABLE PATERN
function Observable(){
	var Myself=this;
	Myself.data;
	Myself.subscribers=[];
	Myself.methods={
		subscribe:function (callback) {
			Myself.subscribers.push(callback);
		},
		 publish: function( data ) {
	    	if (typeof data !== 'undefined') {
		    	Myself.data = data;
		        for (var i = 0; i < Myself.subscribers.length; i++) {
		        	 Myself.subscribers[i](data);
		        }
	    	} else {
	    		return Myself.data
	    	}
	    }
	}
return Myself.methods
};
//DECLARATION OF VARIABLES
var button          = new Observable();
var chance          = new Observable();
var time            = new Observable();
var completed       = new Observable();
var sterren         = new Observable();
var stars_LI        =document.getElementsByClassName("star_image");
var words 			= //["appel","hond","lepel","kat","auto","fiets","computer","badschuim","konijn","bus","school",
                       //"webdesign","hoofdje","zwengel","chinees","golfclub","polyethyleen","meubel","zaak"];
                       ["LOL","TEST","LUL","FK","OOOOO"];		   
var wordToGuess 	= pickRandomword();
var placeholder     = [];
var gameStatus      = document.getElementById("game_status");
var placeHolderHTML = document.getElementById("placeholder");
var chances 		= 6;
var buttonpressed 	= "";
var bttns 			= document.querySelectorAll(".buttons button");
var IMG_PATH        = "img/";
var IMG_EXT         = ".png";
var TOTAL_SECONDS   = 1;
var TOTAL_MINUTES   = 3;
var game_is_running = true;
var stars           = 0;
var nextwordbttn    = document.getElementById("nextword");
var restartgamebttn = document.getElementById("restartgame");
nextwordbttn.disabled=true;
restartgamebttn.disabled=true;
nextwordbttn.addEventListener("click",NextWord);
restartgamebttn.addEventListener("click",GameRestart);

Clock(TOTAL_MINUTES,TOTAL_SECONDS);
for (var i = 0; i < bttns.length; i++) 
{
	bttns[i].addEventListener("click",onBttnClick);
}
for(var i  = 0;i<wordToGuess.length; i++)
    {
        placeholder.push("_");
    }
placeHolderHTML.innerHTML=placeholder.join(" ");

chance.subscribe(changeImage);
chance.subscribe(gameOver);
button.subscribe(buttonWasPressed);
time.subscribe(CheckIfTimeIsup);
completed.subscribe(gameComplete);
sterren.subscribe(StarImages);
sterren.subscribe(EntireGameComplete);
function StarImages()
{
    var ster=sterren.publish();
    for (var i = 0; i < stars_LI.length; i++) {
        if(i<ster)
        {
           stars_LI[i].src=IMG_PATH+"star_active"+IMG_EXT; 
        }
    }
}
function EntireGameComplete()
{
    if (sterren.publish()>=5) 
    {
    game_status.innerHTML = "Game Complete Congrats!";
    nextwordbttn.disabled=true;
    restartgamebttn.disabled=false;
    for (var i = 0; i < bttns.length; i++) 
        {
            bttns[i].disabled=true;
        }
    }
}
function GameRestart()
{
window.location="index.html";
}
function NextWord()
{
    if (stars<6) {
        var wordToGuess= pickRandomword();
    chances=6;
    chance.publish(chances);
    placeholder=[];
    for (var i = 0; i < bttns.length; i++) 
            {
             bttns[i].disabled=false;
            }
    for(var i  = 0;i<wordToGuess.length; i++)
    {
        placeholder.push("_");
    }
    placeHolderHTML.innerHTML=placeholder.join(" ");
    game_is_running=true;
    nextwordbttn.disabled=true;
    game_status.innerHTML=" ";
    }
}
function pickRandomword()
{
	ranndomNumber = Math.floor( Math.random() * words.length );
	wordToGuess = words[ranndomNumber].toUpperCase();
    if (ranndomNumber != -1) {
        words.splice(ranndomNumber, 1);
    }
	return wordToGuess;
}
function OneChanceless()
{
	chances--;
	chance.publish(chances);
}
function onBttnClick(event)
{
    var buttonvalue=event.currentTarget.id;
    button.publish(buttonvalue);
}
function checkIfInArray(string)
{
    if(wordToGuess.indexOf(string) !=-1)
        {
            changePlaceholderToLetter(string);
        }
    else
    {
        OneChanceless();
    }
}
function changePlaceholderToLetter(string)
{
    var WordToArray=wordToGuess.split("");
    for(var i=0; i<WordToArray.length;i++)
        {
            if(WordToArray[i]==string)
                {
                    placeholder[i]=string;
                    placeHolderHTML.innerHTML=placeholder.join(" ");
                }
        }
    completed.publish(placeholder);
}
function changeImage()
{
    var chanceValue=chance.publish();
    var img=document.getElementsByTagName("img")[0];
    img.src=IMG_PATH+chanceValue+IMG_EXT;
}
function buttonWasPressed()
{
    buttonpressed=button.publish();
    checkIfInArray(buttonpressed);
    disableBttn(buttonpressed);
}
function disableBttn(buttontoDisable)
{
    document.getElementById(buttontoDisable).disabled=true;
}
function gameOver()
{
    var chanceValue=chance.publish();
    if(chanceValue<=0)
        {
          for (var i = 0; i < bttns.length; i++) 
            {
	         bttns[i].disabled=true;
            }
            game_status.innerHTML = "Game over! Press the restart button to play again.";
            game_is_running = false;
            restartgamebttn.disabled=false;
        }
        else
        {
            return;
        }
    
}
function gameComplete(){
    var word = completed.publish();
    if( placeholder.indexOf("_") == -1 ){
        game_status.innerHTML = "You guessed the word! 1 star was added. Press Nextword to Continue";
        game_is_running = false;
        nextwordbttn.disabled=false;
        stars++;
        sterren.publish(stars);
    }
}

function Clock (min, sec) {
    var seconds = sec;
    var minutes = min;
    var secInHTML   = document.getElementById("seconds");
    var minInHTML   = document.getElementById("minutes");
    
    var interval    = setInterval(DecreaseTime, 1000);
    
    function DecreaseTime () {
        var totalTime   = "";
        if (game_is_running){
            seconds--;
        }
        
        if (seconds < 0) {
            minutes--;
            seconds = 59;
        }
        
        if (minutes == 0 && seconds == 0) {
            minInHTML.innerHTML = "0" + 0;
            secInHTML.innerHTML = "0" + 0;
            clearInterval(interval);
        }
        
        minInHTML.innerHTML = minutes;
        secInHTML.innerHTML = seconds;
        
        if (seconds < 10) {
            secInHTML.innerHTML = "0" + seconds;
        }
        
        if (minutes < 10) {
            minInHTML.innerHTML = "0" + minutes;
        }
        
        totalTime = minutes + seconds;
        time.publish(totalTime);
    }
}
function CheckIfTimeIsup()
{
    var totalTime=time.publish();
    if(totalTime==0)
    {
        for (var i = 0; i < bttns.length; i++) 
            {
             bttns[i].disabled=true;
            }
        game_status.innerHTML = "Time ran out! Try again";
        restartgamebttn.disabled=false;
    }
}

