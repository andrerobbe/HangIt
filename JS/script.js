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

