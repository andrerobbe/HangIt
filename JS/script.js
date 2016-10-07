
var words 			= ["appel","hond","lepel","kat","auto","fiets","computer","badschuim","konijn","bus","school",
					   "webdesign","hoofdje","zwengel","chinees","golfclub","polyethyleen","meubel","zaak"];
var wordToGuess 	= "";		   
var wordToGuess 	= pickRandomword(words);


function pickRandomword(words)
{
	ranndomNumber = Math.floor( Math.random() * 18  );
	wordToGuess = words[ranndomNumber];
	return wordToGuess;
}

console.log(wordToGuess);
/*Comment*/

/* Comment added PJ 11:56 */
