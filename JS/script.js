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
var words 			= ["appel","hond","lepel","kat","auto","fiets","computer","badschuim","konijn","bus","school",
					   "webdesign","hoofdje","zwengel","chinees","golfclub","polyethyleen","meubel","zaak"];		   
var wordToGuess 	= pickRandomword(words);
var placeholder     =[];
var placeHolderHTML =document.getElementById("placeholder");
var chances 		=6;
var buttonpressed 	="";
var bttns 			=document.getElementsByTagName("button");
var IMG_PATH        ="img/";
var IMG_EXT         =".png";

for (var i = 0; i < bttns.length; i++) 
{
	bttns[i].addEventListener("click",onBttnClick);
}
for(var i  = 0;i<wordToGuess.length; i++)
    {
        placeholder.push("_");
    }
placeHolderHTML.innerHTML=placeholder.join(" ");

chance.subscribe(changeImage)
chance.subscribe(gameOver)
button.subscribe(buttonWasPressed)

function pickRandomword(words)
{
	ranndomNumber = Math.floor( Math.random() * 18  );
	wordToGuess = words[ranndomNumber].toUpperCase();
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
}
function changeImage()
{
    var chanceValue=chance.publish();
    var img=document.getElementsByTagName("img")[0];
    img.src=IMG_PATH+chanceValue+IMG_EXT;
    console.log(chanceValue);
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
          alert("Game Over!");  
        }
    else
        {
            return;
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
        seconds--;
        
        if (seconds < 0) {
            minutes--;
            seconds = 59;
        }
        
        if (minutes == 0 && seconds == 0) {
            minInHTML.innerHTML = "0" + 0;
            secInHTML.innerHTML = "0" + 0;
            clearInterval(interval);
            GameOver();
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
        console.log(totalTime);
    }
}

Clock(0, 15);
