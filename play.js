let remainingValidCards=numOfCards;
let playMoves=0;

function score(){
    remainingValidCards = document.querySelectorAll('.validCard').length;
                                console.log('Remaining valid cards: ',remainingValidCards);

                       return "Remaining: "+remainingValidCards +' / ' + numOfCards + '\n'+"play moves: "+playMoves;

}


function play(){
    
    let openCards=0;
    gameBoard=document.querySelector('#gameBoard');
    console.log(gameBoard);
    


    let firstCard='';
    let secondCard='';
    
    
    
    function restoreCards(){
        // firstCard.classList.add('hidden');
        firstCard.classList.remove('uncovered');
        // secondCard.classList.add('hidden');
        secondCard.classList.remove('uncovered');
        openCards=0;                                       //erst jetzt reagiert wieder der EventListener 
    }
    
    
  
        gameBoard.addEventListener('click',function(e) {
            //Prüfung ob die Karte valid ist (Sie muss cardValid und hidden als Klasse haben.)
            playMoves++;
            
            let element=  e.target.parentElement.parentElement;
            console.log('element: ',element.classList, 'uncovered?: ',element.classList.contains('uncovered'),'validCard?: ',element.classList.contains('validCard'));
            
            let covered=!element.classList.contains('uncovered');
            let valid=element.classList.contains('validCard');
            console.log('covered: ', covered, 'valid: ', valid);
            
            if (!(covered && valid)){                       //Wenn schon aufgedeckt oder ungülitg(aus dem Spiel)
                 console.log('Ungültige Karte');
                 return;                                    //Funktion abgebrochen
            }

            console.log('openCards: ',openCards);
            if (openCards===0){
                    firstCard = element;
                    // firstCard.classList.remove('hidden');
                    firstCard.classList.add('uncovered');
                    openCards++;

                    // console.log('If: 1: ', firstCard,', 2: ', secondCard,'opencards: ',openCards);

            } else if (openCards===1){
                    secondCard = element;
                    // secondCard.classList.remove('hidden');
                    secondCard.classList.add('uncovered');
                    openCards++;

                    console.log('Vergleich der Fotos: ',firstCard.getAttribute('data-img'), secondCard.getAttribute('data-img'));

                    let pair=(firstCard.getAttribute('data-img')) === (secondCard.getAttribute('data-img'));
                    console.log('Ist es ein Paar? ',pair);                                                                 //Pair
                    if (pair){
                        console.log('Hurra, ein Paar!!!');
                        firstCard.classList.remove('validCard');
                        firstCard.classList.add('removed');                                                                        //Paar gefunden
                        secondCard.classList.remove('validCard');
                        secondCard.classList.add('removed');
                        openCards=0;    
                        
                    } else{                                                                                            //Kein Paar, nach Warten werden die Karten wieder umgedreht
                        setTimeout(restoreCards,1500);
                    }     //Ende von if pair

            }else{
                    //passiert nichts. Der Wert für openCards wird erst wieder auf 0 gesetzt, wenn die Zeit abgelaufen ist. Bis dann läuft jeder Klick ins Leere

            }      //Ende des If openCards- Block
                    document.querySelector('#score').firstChild.innerText=score();    
                    if (remainingValidCards<=0){
                        document.querySelector('#score').firstChild.innerText="Game over \n\n"+score(); 
                        } 
        });                                    //Ende des EventListeners
        
        
} //Ende von play




    play();
    console.log("Schluss jetzt!");








