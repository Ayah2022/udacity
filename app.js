/*
 * Create a list that holds all of your cards
 */
/*jQuery.noConflict()(function ($) {*/
$(document).ready(function() {
    var game = {
        cardsList: ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"],
        init: function() {
            game.shuffle();
        },
        shuffle: function() {
            var random = 0;
            var temp = 0;
            for (var i = 1; i < game.cardsList.length; i++) {
                random = Math.round(Math.random() * i);
                temp = game.cardsList[i];
                game.cardsList[i] = game.cardsList[random];
                game.cardsList[random] = temp;
            }

            game.assignCards();

        },

        assignCards: function() {
            $('.card').each(function(index) {
                $(this).attr('cardsymbol', 'fa ${game.cardsList[index]}');
            });
            game.clickHandlers();
        },
        clickHandlers: function() {
            $('.card').on('click', function() {
                        $(this).html('<i>' + $(this).data('cardsymbol' + '</i>')).addClass('selected'); game.checkMatch();
                        });

                },
                checkMatch: function() {
                    if ('.selected').first().data('cardsymbol') == $('.selected').last().data('cardsymbol') {
                    $('.selected').each(function() {
                        $(this).addClass('match');
                        $(this).animate({
                            animmation - name: flash
                        });
                    });
                    $('.selected').each(function() {
                        $(this).removeClass('selected');
                    });
                    game.checkWin();
                } else {
                    setTimeout(function() {
                        $('.selected').each(function() {
                            $(this).html('').removeClass('selected');
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