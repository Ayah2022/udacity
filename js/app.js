/*
 * Create a list that holds all of your cards
 */
$(document).ready(function(){
    let cardList=["fa fa-diamond"," fa fa-paper-plane-o","fa fa-bolt","fa fa-cube", "fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];
    let moves=0;
    let timer;
    let TimerValue;
    let stars=3;
    let matchCount=0;
    let gameStart=false;
    //reset the whole game with clicking on the restart icon
    $(".restart").on("click",resetGame);

    //add cards dynamically to the deck
    for(var i=0;i<2;i++){
       newArray=shuffle(cardList);
       newArray.forEach(function(el){
        $("#deck").append(`<li class="card animated"><i class="${el}"></i></li>`);
    });
    }
    
        // shuffle the list of cards using the shuffle() method
        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
    
            }
            return array;
        }
    
     //making the function to declare how the card will respond to the click  
    $(".card").on("click",function () {
        //that part of the code starts the timer
        if(gameStart==false){
            gameStart=true;
            Timer();
            }
        //that code checks if any card has class called 'match'
        if ( $(this).hasClass('match') ) {
            return;
          }
    
            // Toggle the flip class and open show class as well to make card visible
            $(this).toggleClass("open show flipInY");
            //get currently flipped card which does not has match class yet
            var flipped = $(".flipInY").not(".match");
           
            //this one to set the limit to flip a card which does not have match class  
             if ( flipped.length === 2 ) {
                moves++;
                $(".moves").text(moves); 
            //selecting first and second flipped card
            var firstCard = flipped.first();
            var secondCard = flipped.last();
          
            //to check if first and second flip card is same
            if ( firstCard.html() === secondCard.html() ) {
            //as met the condition, this code is to declare match
                firstCard.addClass("tada match").removeClass("flipInY");
                secondCard.addClass("tada match").removeClass("flipInY");
                checkResult();
            } else {
                //as not met the condition of equality the unmatched card shall be closed
                setTimeout(function () {
                  firstCard.removeClass("open show flipInY");
                  secondCard.removeClass("open show flipInY");
                }, 1000);
              //this function call updates move with two flip cards
              
            }
            updateMoves();
        } 
    }); 
            //declaring timer function
            function Timer() {
                let startTime = new Date().getTime();
            
                // Update the timer every second
                timer = setInterval(function() {
            
                let currentTime = new Date().getTime();
            
                        // calculate time elapsed 
                        let timePlayed = currentTime - startTime;
            
                        // Calculate minutes and seconds
                        let mins = Math.floor((timePlayed % (1000 * 60 * 60)) / (1000 * 60));
                        let secs = Math.floor((timePlayed % (1000 * 60)) / 1000);
                        TimerValue = mins + " minutes " + secs + " seconds ";
                        // Add starting 0 if seconds < 10
                        if (secs < 10) {
                            secs = "0" + secs;
                        }
                        if (mins < 10) {
                            mins = "0" + mins;
                        }
            
                        let lastCurrentTime = mins + ':' + secs;
            
                        // Update timer on game screen and modal
                        $(".timer").text(lastCurrentTime);

                    },500);
                }
                //adding stars to the score panel dynamically
               function addStars(){
                for (var i = 0; i < 3; i++) {
                    $('.stars li').html('<li><i class="fa fa-star"></i></li>');
                }
               }
               //updating moves and with the move calling the star rate function so that the score panel gets star according to the moves
               function updateMoves() {
                if (moves ==32) {
                    starRate();
                } else if (moves == 24) {
                    starRate();
                } else if (moves == 17) {
                    starRate();
                }
        
            }
            //declaring the function which will update rating with star by the move
            function starRate(){
                $('.stars li').first().remove();
                stars-=1;
                $('.stars').append('<li><i class="fa fa-star-o"></i></li>');
            }
            //declaring function the check the number of matched pairs and calling the showWinBox function to display game over window and score   
            function checkResult() {
                matchCount+= 1;
                if (matchCount ===8) {
                    setTimeout(showWinBox(), 500);
                }
            
            }
             //function for resetting the game with the click on restart button which has been called on previous code on line 13   
            function resetGame() {
                moves = 0;
                matchCount=0
                gameStart = false;
                startGame();
            }
            //function for starting game
            function startGame() {
                moves = 0;
                matchCount=0;
                gameStart = false;
                clearInterval(timer);
                $(".timer").text("00:00");
                $(".card").removeClass("open show flipInY tada match");
                $('.moves').html("0");
                addStars(3);
            }
            //function to show game over score card
            function showWinBox() {
                clearInterval(timer);
                swal({
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    animation: false,
                    customClass: 'animated tade',
                    title: 'Congratulations! You Made It!',
                    text: 'With ' + moves + ' Moves and ' + stars + ' Stars.\n wooo! ' + ' Ellapsed Time ' + TimerValue,
                    type: 'success',
                    confirmButtonColor: '#1d71f7',
                    confirmButtonText: 'Play Again!'
                    }).then(function(isConfirm) {
                        if (isConfirm) {
                            clearInterval(timer);
                            startGame();
                        }
                    })
                }
            // function call that start game
            startGame();
               
    });
