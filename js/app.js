/*
 * Create a list that holds all of your cards
 */
/*jQuery.noConflict()(function ($) {*/
$(document).ready(function() {
	var moves=0;
	var matched=0;
	var startGame=false;
	$('#reset-button').click(resetGame);
	var timer= new timer();
	timer.addEventListener('timeupdated',function(event){
		$('#timer').html(timer.getTime().toString());
	});
	cardsList= ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
       
	function initGame{
		createCards();
		$('.card').click(toggleCard);
		$('#moves').html("0 Moves");
		addStars(3);
	}
	function addStars(num){
		for(car i=0; i<num; i++){
			$('#stars').append('<li><i class="fa fa-star"></i></li>');
		}
	}
    function createCards() {
			for(var i=0; i<2; i++){
			cardList=shuffle(cardList);
            cardList.forEach(AddCard);
			}
      
    function shuffle(array) {
		var currentIndex = array.length
        , temporaryValue, randomIndex;
        while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    
    }
    return array;
}
      function AddCard(card){
		  $('#deck').append(`<li class="card animated"><i class="fa ${card}"></i></li>`);
	  }  
	  
	  var openedCards=[]
	  function toggleCard(){
		  //start the timer
		  if(startGame==false){
			  startGame=true;
			  timer.start();
		  }
		  if(openedCards.length===0){
			  $(this).toggleClass("show open").animateCss('flipInY');
			  openedCards.push($(this));
			  disableClick();
		  }
		  else if(openedCards.length===1){
			  updateMoves();
			  $(this).toggleClass("show open").animateCss('flipInY');
			  openedCards.push($(this));
			  setTimeout(matchCards,1100);
		  }
	  }
	  function disableClick(){
		  openedCards.forEach(function(card){
			  card.off('click');
		  });
	  }
	  function EnableClick(){
		  openedCards[0].click(toggleCard);
	  }
	  function matchCards(){
		  
	  }

	  //extend jquery to add function that does all animations
	  $.fn.extend({
		  animateCss:function(animationName){
			  var animationEnd='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			  this.addClass(animationName).one(animationEnd,function(){
				  $(this).removeClass(animateName);
			  });
			  return this;
		  }
	  });
      initGame();
/*
        assignCards: function() {
            $('.card').each(function(index) {
                $(this).attr('data-card-value', `fa ${game.cardsList[index]}`);
            });
            game.clickHandlers();
        },
        clickHandlers: function() {
            $('.card').on('click', function() {
                        $(this).html('<i>' + $(this).data("cardValue") + '</i>').addClass('open'); 
						game.checkMatch();
                        });

                },
                checkMatch: function() {
                    if ($('.open').first().data('cardVlaue') === $('.open').last().data('cardValue')) {
                    $('.open').each(function() {
                        $(this).addClass('match');
                      /*  $(this).animate({
                            animmation-name: flash;
                        });*/
                /*    });
                    $('.open').each(function() {
                        $(this).removeClass('open');
                    });
                    game.checkWin();
                } else {
                    setTimeout(function() {
                        $('.open').each(function() {
                            $(this).html('').removeClass('open');
                        });
                    }, 1000);

                }
        },
        checkWin: function() {
            if ($('.match').length === 16) {

            }
        }
    };
    game.init();
});

/*});*/

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}*/