/*
 * Create a list that holds all of your cards
 */
/*jQuery.noConflict()(function ($) {*/
$(document).ready(function (){
	

 var moves = 0;
  var openedCards = []
            var matched = 0;
            var startGame = false;
            $('#reset-button').click(resetGame);


            cardsList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
                    //extend jquery to add function that does all animations
                    $.fn.extend({
                        animateCss: function(animationName) {
                            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                            this.addClass(animationName).one(animationEnd, function() {
                                $(this).removeClass(animateName);
                            });
                            return this;
                        }
                    });	

           

            function resetGame() {
                moves = 0;
                matched = 0;
                $('#deck').empty();
                $('#stars').empty();
                startGame = false;
                initGame();
            }

            function initGame() {
                createCards();
                $('.card').click(toggleCard);
                $('#moves').html("0 Moves");
                addStars(3);
            }

            function addStars() {
                for (var i = 0; i < 3; i++) {
                    $('#stars').append('<li><i class="fa fa-star"></i></li>');
                }
            }

            function createCards() {
               for( var i=0; i<2; i++){
                        cardsList = shuffle(cardsList);
                        cardsList.forEach(AddCard);
			   }
				 
                    
			}
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

                    function AddCard(card) {
                        $('#deck').append(`<li class="card animated"><i class="fa ${card}"></i></li>`);
                    }
				
			
                   

                    function toggleCard() {
                        
                        if (startGame == false) {
                            startGame = true;
                        }
                        if (openedCards.length === 0) {
                            $(this).toggleClass("show open").animateCss('flipInY');
                            openedCards.push($(this));
                            disableClick();
                        } else if (openedCards.length === 1) {
                            updateMoves();
                            $(this).toggleClass("show open").animateCss('flipInY');
                            openedCards.push($(this));
							matchCards();
                           // setTimeout(matchCards, 1100);
                        }
                    }

                    function disableClick() {
                        openedCards.forEach(function(card) {
                            card.off('click');
                        });
                    }

                    function updateMoves() {
                        moves += 1;
                        $('#moves').html(`${moves} Moves`);
                        if (moves == 16) {
                            rate();
                        } else if (moves == 8) {
                            rate();
                        }
                    }

                    function rate() {
                       $('.fa fa-star').remove();
                       $('#stars').append('<li><i class="fa fa-star-o"></i></li>');
                    }

                    function EnableClick() {
                        openedCards[0].click(toggleCard);
                    }

                    function matchCards() {
                        if (openedCards[0] === openedCards[1]) {
                            console.log("matchCard");
                            openedCards[0].addClass("match").animateCss('pulse');
                            openedCards[1].addClass("match").animateCss('pulse');
                            disableCLick();
                            removeOpenCards();
							checkResult();
                           // setTimeout(checkResult, 1000);
                        } else {
                            openedCards[0].toggleClass("show open").animateCss('flipInY');
                            openedCards[1].toggleClass("show open").animateCss('flipInY');
                            EnableClick();
                            removeOpenCards();
                        }

                    }

                    function removeOpenCards() {
                        openedCards = [];
                    }

                    function checkResult() {
                        matched += 1;
                        if (matched == 8) {
                            showWinBox();
                        }
                    }

                    function showWinBox() {
                     
                    }

                    
initGame();
	});

