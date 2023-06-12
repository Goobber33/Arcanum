import { CARD_PLAYED, START_GAME } from "./actions";

//pack of 108 cards
const Deck1 = [
    "647fbddef6f5bca74c4f26c7","647fbddef6f5bca74c4f26c8","647fbddef6f5bca74c4f26c9","647fbddef6f5bca74c4f26ca","647fbddef6f5bca74c4f26cb"
]
const Deck2 = [
    "647fbddef6f5bca74c4f26c7","647fbddef6f5bca74c4f26c8","647fbddef6f5bca74c4f26c9","647fbddef6f5bca74c4f26ca","647fbddef6f5bca74c4f26cb"
]

const initialState = {
    gameOver: true,
    turn: '',
    player1Hand: [],
    player2Hand: [],
    currentNumber: '',
    played1DeadPile: [],
    played2DeadPile: [],
    Deck1: [],
    Deck2: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case START_GAME: {
            //shuffle array function
            function shuffleArray(array) { 
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1))
                    var temp = array[i]
                    array[i] = array[j]
                    array[j] = temp;
                }   
                return array
            }

            //shuffle CARDS array
            const shuffledCards = shuffleArray(Deck1,Deck2)
            

            //extract first 7 elements to player1Hand
            const player1Hand = shuffledCards.splice(0, 3)

            //extract first 7 elements to player2Hand
            const player2Hand = shuffledCards.splice(0, 3)

            //extract random card from shuffledCards and check if its not an action card
            let startingCardIndex = Math.floor(Math.random() * 94)
            while(true) {
                startingCardIndex = Math.floor(Math.random() * 94)
                if(shuffledCards[startingCardIndex]==="647fbddef6f5bca74c4f26c7" || shuffledCards[startingCardIndex]==="647fbddef6f5bca74c4f26c8" || shuffledCards[startingCardIndex]==="647fbddef6f5bca74c4f26c9" ||
                shuffledCards[startingCardIndex]==="647fbddef6f5bca74c4f26cb" || shuffledCards[startingCardIndex]==='#G' || shuffledCards[startingCardIndex]==='D2G' ||
                shuffledCards[startingCardIndex]==='skipB' || shuffledCards[startingCardIndex]==='#B' || shuffledCards[startingCardIndex]==='D2B' ||
                shuffledCards[startingCardIndex]==='skipY' || shuffledCards[startingCardIndex]==='#Y' || shuffledCards[startingCardIndex]==='D2Y' ||
                shuffledCards[startingCardIndex]==='W' || shuffledCards[startingCardIndex]==='D4W') {
                    continue;
                }
                else
                    break;
            }

            //extract the card from that startingCardIndex into the playedCardsPile
            const played1DeadPile = shuffledCards.splice(startingCardIndex, 1)
            const played2DeadPile = shuffledCards.splice(startingCardIndex, 1)

            //store all remaining cards into drawCardPile
            const drawCardPile = shuffledCards

            return {
                gameOver: false,
                turn: 'Player 1',
                player1Hand: [...player1Hand],
                player2Hand: [...player2Hand],
                player1DeadPile: player1DeadPile[0].charAt(0),
                played2DeadPile: played2DeadPile[0].charAt(0),
                Deck1: [...drawCardPile],
                Deck2: [...drawCardPile]
            }
        }

        case CARD_PLAYED: {
            const cardPlayedBy = state.turn
            switch(action.payload.cardPlayed) {
                case '0R': case '1R': case '2R': case '3R': case '4R': case '5R': case '6R': case '7R': case '8R': case '9R': case '#R': case '0G': case '1G': case '2G': case '3G': case '4G': case '5G': case '6G': case '7G': case '8G': case '9G': case '#G': case '0B': case '1B': case '2B': case '3B': case '4B': case '5B': case '6B': case '7B': case '8B': case '9B': case '#B': case '0Y': case '1Y': case '2Y': case '3Y': case '4Y': case '5Y': case '6Y': case '7Y': case '8Y': case '9Y': case '#Y': {
                    const numberOfPlayedCard = action.payload.cardPlayed.charAt(0)
                    const colorOfPlayedCard = action.payload.cardPlayed.charAt(1)

                    if(state.currentColor === colorOfPlayedCard) {
                        console.log('colors matched!');
                        if(cardPlayedBy === 'Player 1') {
                            const removeIndex = state.player1Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                turn: 'Player 2',
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player1Deck: [...state.player1Deck.slice(0, removeIndex), ...state.player1Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: numberOfPlayedCard
                            }
                        }
                        else {
                            const removeIndex = state.player2Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                turn: 'Player 1',
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player2Deck: [...state.player2Deck.slice(0, removeIndex), ...state.player2Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: numberOfPlayedCard
                            }
                        }
                    }
                    else if(state.currentNumber === numberOfPlayedCard) {
                        console.log('numbers matched!');
                        if(cardPlayedBy === 'Player 1') {
                            const removeIndex = state.player1Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                turn: 'Player 2',
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player1Deck: [...state.player1Deck.slice(0, removeIndex), ...state.player1Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: numberOfPlayedCard
                            }
                        }
                        else {
                            const removeIndex = state.player2Deck.indexOf(action.payload.cardPlayed)
                            return {
                                ...state,
                                turn: 'Player 1',
                                playedCardsPile: [...state.playedCardsPile.slice(0, state.playedCardsPile.length), action.payload.cardPlayed, ...state.playedCardsPile.slice(state.playedCardsPile.length)],
                                player2Deck: [...state.player2Deck.slice(0, removeIndex), ...state.player2Deck.slice(removeIndex + 1)],
                                currentColor: colorOfPlayedCard,
                                currentNumber: numberOfPlayedCard
                            }
                        }
                    }
                    else {
                        alert('Invalid Move!')
                    }
                    
                    break;
                }
            }
        }
        
        default:
            return state
    }
}

export default reducer