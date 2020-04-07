//Black Black Game
let blackJackGame = {
    'you': {"scoreSpan": '#your-black-jack-result', 'div': '#your-box', "score": 0},
    'dealer': {"scoreSpan": '#dealer-black-jack-result', 'div': '#dealer-box', "score": 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2, '3': 3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'Q':10, 'J':10, 'A':[1,11],},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,

};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');



document.querySelector('#black-jack-hit-button').addEventListener("click", blackJackHit);
document.querySelector('#black-jack-stand-button').addEventListener('click', blackJackStand);
document.querySelector('#black-jack-deal-button').addEventListener('click', blackJackDeal);

function blackJackHit(){
    if (blackJackGame['isStand'] === false){
        let card = randomCard();
        showCard(YOU, card);
        updateScore(card, YOU);
        showScore(YOU);
    }   
}

function showCard(activePlayer, card){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);    
        hitSound.play()
    }

}

function blackJackDeal(){
    // computeWinner();
    if(blackJackGame['turnsOver'] === true){

        let yourImages = document.querySelector("#your-box").querySelectorAll('img');
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
    
        for (i=0; i < yourImages.length; i++){
            yourImages[i].remove();
        }       

        for (i=0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-black-jack-result').textContent = '0';
        document.querySelector('#your-black-jack-result').style.color = 'white';

        document.querySelector('#dealer-black-jack-result').textContent = '0';
        document.querySelector('#dealer-black-jack-result').style.color = 'white';
    
        document.querySelector("#black-jack-result").textContent = "Let's Play";
        document.querySelector("#black-jack-result").style.color = "black";

        blackJackGame['isStand'] = false;
        blackJackGame['turnsOver'] = false;
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer){
    if (card === 'A'){
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
        return 
    }

    activePlayer['score'] += blackJackGame['cardsMap'][card];
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = '!Busted_Bitch!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        return 
    }
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackJackStand(){ // async function for using await
    blackJackGame['isStand'] = true;
    while(DEALER['score'] < 16){

        let card = randomCard();
        showCard(DEALER, card);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);  //await only available in async function
    }                       //if only await used then browser is also put to sleep so to overcome that use async function...
                            // and everything will freeze for that 1000ms
    blackJackGame['turnsOver'] = true;
    computeWinner();

}

//compute Winner 
function computeWinner(){
    let winner;
    if (YOU['score'] <= 21){
        //condition: higher score than dealer or when the dealer busts
        if((YOU['score'] > DEALER['score']) || (DEALER['score'] > 21)){
            blackJackGame['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']){
            winner = DEALER;
            blackJackGame['losses']++;
        }
        else if(YOU['score'] === DEALER['score']){
            winner = 'None';
            blackJackGame['draws']++;
        }
        //condition when user busts but dealer dsn't
    }
    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        winner = DEALER;
        blackJackGame['losses']++;
        //when both busts
    }
    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        winner = 'None';
        blackJackGame['draws']++;
    }
    showResult(winner);
}

function showResult(winner){
    let message, messageColor;
    if (winner === YOU){
        document.querySelector('#wins').textContent = blackJackGame['wins'];
        message = "$$_WINNNERRR_$$";
        messageColor = 'green';
        winSound.play();
    }
    else if (winner === DEALER){
        document.querySelector('#losses').textContent = blackJackGame['losses'];
        message = "!!_LOOOOSER_!!";
        messageColor = 'red';
        lossSound.play();
    }
    else{
        document.querySelector('#draws').textContent = blackJackGame['draws'];
        message = '!_Draw HuH Lucky_!';
        messageColor = 'black';
    }

    document.querySelector("#black-jack-result").textContent = message;
    document.querySelector("#black-jack-result").style.color = messageColor;
}
