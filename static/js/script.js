//Black Black Game
let blackJackGame = {
    'you': {"scorespan": '#your-black-jack-result', 'div': '#your-box', "score": 0},
    'dealer': {"scorespan": '#dealer-black-jack-result', 'div': '#dealer-box', "score": 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2': 2, '3': 3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'Q':10, 'J':10, 'A':11},

};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#black-jack-hit-button').addEventListener("click", blackJackHit);
document.querySelector('#black-jack-deal-button').addEventListener('click', blackJackDeal);

function blackJackHit(){
    let card = randomCard();
    console.log(card);
    showCard(YOU, card);
}

function showCard(activePlayer, card){
    let cardImage = document.createElement('img');
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);    
    hitSound.play()
}

function blackJackDeal(){
    let yourImages = document.querySelector("#your-box").querySelectorAll('img');
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
    
    for (i=0; i < yourImages.length; i++){
        yourImages[i].remove();
    }

    for (i=0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex];
}