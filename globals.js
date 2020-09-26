//Festlegen der globalen Variablen

const numOfCards=24;
const numOfRows=5;
const numOfColumns=5;
const elementsPerRaw=5;



const numOfFields=numOfCards+1;
const emptyField=(numOfCards/2);
    console.group('numOfFields :',numOfFields,'emptyField: ',emptyField);

function createArray(){                //Array mit Index, Zufallszahl, und jeweils 2 imgs in zufälliger Reihenfolge
    const arrOut=[];

    for (i=0;i<numOfCards;i++) {
        let arrIn=[];
        arrIn.push(i+1);                         //Index-ID einfügen
        arrIn.push(Math.random());             //Zufallszahl einfügen
        arrOut.push(arrIn);
    }
    sortArrayByIndex(arrOut,1);                 //sortieren des Array nach der Zufallszahl
       
    for (i=0;i<numOfCards;i++) {
            
        let strImg='img'+Math.floor((i+2)/2);   //jeweils 2 gleiche Karten einfügen
        arrOut[i][2]=strImg;
    }

    // console.log(arrOut);
     sortArrayByIndex(arrOut,0);                //sortieren des Array nach dem Index
    //  console.log(arrOut);
    return arrOut;
}




function createGameBoard(){
    const gameBoard=document.querySelector('#gameBoard');
        console.log('gameBoard: ',gameBoard);
    
    const arrGame=createArray();
        console.log('arrGame: ',arrGame, arrGame.length);
    
        let rawCounter=0;
        let rawElementCounter=0;
        let divCurrentRaw=document.createElement('div');
        let minus=0;                          //Variable, die das Setzen von leeren Feldern ermöglicht. Bei einem leeren Feld wird minus um eins erhöht.
                                                // so kann i um eins erhöht werden, das Array wird aber normal durchlaufen
                                            
    for(let i=0; (i-minus)<numOfCards;i++) {                  
        
        

        
        
        function appendRaw(){                           //fügt die Zeile mit div-Elementen an das Gameboard an.
            rawCounter ++;
            let idRaw= 'raw' + rawCounter;
            divCurrentRaw.classList.add('raw');
            divCurrentRaw.id=idRaw;
            gameBoard.appendChild(divCurrentRaw);
            rawElementCounter=0;
            divCurrentRaw='';
            divCurrentRaw=document.createElement('div');   //divCurrentRaw wird neu initiiert
        }

        

        let newLi=document.createElement('div');
        rawElementCounter++;
        let newDiv=document.createElement('div');                      //Das Unterelement der Spielfelder, das die Rückseite der Karte hat
        let newDivDiv=document.createElement('div');
        let newDivDiv2=document.createElement('div');
        
        newLi.classList.add('outerBox');
        newDiv.classList.add('innerBox');
        newLi.classList.add('card');
        
        if (i===emptyField) {                           //zusätzliche div! Danach wird weiter im Array gearbeitet, daher kein else
            minus++ ;                            //notwendig, das leere Feld wird eingefügt, dabei soll i unverändert bleiben (i wird in jeder Schleife erhöht, minus wird hier um 1 erhöht-)
            newLi.id="score"
            newDiv.innerText="Score"
        } else {
                                               
            // newLi.classList.add('hidden');
            newLi.classList.add('validCard');

            
    	    newLi.id=arrGame[i-minus][0];                                           //Id wird eingefügt
       
        
            newDivDiv.classList.add('cardFront');
            newDivDiv.classList.add(arrGame[i-minus][2]);
            newDivDiv2.classList.add('cardBack');
            newLi.setAttribute('data-img', arrGame[i-minus][2]);                     //Wird nochmals eingetragen, weil man darauf leichter zugreifen kann als auf die Klasse
            
            newDiv.appendChild(newDivDiv);
            newDiv.appendChild(newDivDiv2);
        }                                        
        newLi.appendChild(newDiv);
        
        divCurrentRaw.appendChild(newLi);
        if (rawElementCounter>=elementsPerRaw){appendRaw()};
    }
    if (rawElementCounter>0){appendRaw()}                              //wenn  noch Elemente übrig sind
}


createGameBoard();