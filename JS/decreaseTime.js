function DecreaseTime (time) {
    var counter     = time;
    var interval    = setInterval(Decrement, 1000);
    
    function Decrement () {
        counter -= 1;
        
        if ( counter <= 0 ) {
            counter = 0;
            clearInterval(interval);
            GameOver();
        }
    }
}

DecreaseTime(10);