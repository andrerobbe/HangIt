// https://www.joezimjs.com/javascript/javascript-design-patterns-observer/

function Observable() {
	
	// Create reference to this by renaming this, so you can still use this inside functions
	var _self = this;

	// members that will collect necessary data
	_self.data;
    _self.subscribers = []

    // Public methods
	_self.methods = {

		// Triggered when data is set (using publish method)
	    subscribe: function(callback) {
	        // In most situations, you would check to see if the
	        // callback already exists within the subscribers array,
	        // but for the sake of keeping us on track and because
	        // this isn't necessarily included, we'll leave it out.
	        // Just add the callback to the subscribers list
	        _self.subscribers.push(callback);
	    },

	    unsubscribe: function(callback) {
	        var i = 0,
	            len = _self.subscribers.length;
	        // Iterate through the array and if the callback 
	        // found, remove it.
	        for (; i < len; i++) {
	            if (_self.subscribers[i] === callback) {
	                _self.subscribers.splice(i, 1);
	                // Once we've found it, we don't need to
	                // continue, so just return.
	                return;
	            }
	        }
	    },

	    // Used to set and retrieve current value
	    publish: function( data ) {

	    	if (typeof data !== 'undefined') {

		    	_self.data = data;
		        // Iterate over the subscribers array and call each of
		        // the callback functions.
		        for (var subscriberKey = 0; subscriberKey < _self.subscribers.length; ++subscriberKey) {
		            _self.subscribers[ subscriberKey ](data);
		        }
	    	} else {
	    		return _self.data
	    	}
	    }
	}

	return _self.methods
};
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

for (var i = 0; i < bttns.length; i++) {
	bttns[i].addEventListener("click",onBttnClick);
}
for(var i  = 0;i<wordToGuess.length; i++)
    {
        placeholder.push("_");
    }
placeHolderHTML.innerHTML=placeholder.join(" ");

chance.subscribe( function(){
	var chanceValue=chance.publish();
})
button.subscribe( function(){
    buttonpressed=button.publish();
    checkIfInArray(buttonpressed);
})

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
    var buttonvalue=event.currentTarget.value;
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
