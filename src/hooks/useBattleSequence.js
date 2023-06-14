import {useState} from 'react'

export const useBattleSequence = () => {

    const [turn,setTurn] = useState(0);
    const [inSequence,,setInSequence,] = useState(false);
    const [player1Health,setPlayer1health] = useState(player1Stats.maxHealth);
    const [player2Health,setPlayer2health] = useState(player2Stats.maxHealth);
    const [announcerMessage, setAnnouncerMessage] = useState('');
    const [player1Animations,setPlayer1Animation] = useState('static');
    const [player2Animations,setPlayer2Animation] = useState('static');

    return {
        turn,
        inSequence,
        player1Health,
        player2Health,
        announcerMessage,
        player1Animations,
        player2Animations,
    }
}