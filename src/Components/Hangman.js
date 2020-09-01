import React,{Component} from 'react';
import './Hangman.css';
import { randomWord } from './Words';

import step0 from './Images/0.jpg';
import step1 from './Images/1.jpg';
import step2 from './Images/2.jpg';
import step3 from './Images/3.jpg';
import step4 from './Images/4.jpg';
import step5 from './Images/5.jpg';
import step6 from './Images/6.jpg';

 class Hangman extends Component{

    static defaultProps = {
        maxWrong : 6,
        images : [step0, step1, step2, step3, step4, step5,step6]
    }

    constructor(props) {
        super(props);
        this.state = {
            mistakes : 0,
            guessed : new Set([]),
            answer : randomWord()
        }
    }


    handleGuess = (e) => {
        // console.log(e.target.value);
        let char = e.target.value;
        this.setState((prevstate) => ({
            guessed : prevstate.guessed.add(char),
            mistakes : prevstate.mistakes + (prevstate.answer.includes(char) ? 0 : 1),
        }))
    }


    guessWord = () => {
        return (this.state.answer.split("").map( (letter) => (this.state.guessed.has(letter) ? letter : " _ ")));
    }

    generateButtons = () => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map( letter => (
            <button 
                className="btn btn-lg btn-primary m-2"
                key={ letter }
                value={letter}
                onClick={this.handleGuess}
                disabled={this.state.guessed.has(letter)}          
            >
                {letter}
            </button>
        ));
    }

    resetGame = () => {
        this.setState({
            mistakes : 0,
            guessed: new Set([]),
            answer : randomWord()
        })
    }

    render(){

        const gameOver = this.state.mistakes >= this.props.maxWrong;
        let isWinner = this.guessWord().join("") === this.state.answer;
        let gameStat = this.generateButtons();

        if(isWinner){
            gameStat = "You Won";
        }

        if(gameOver){
            gameStat = "You Lost";
        }

        return (
            <div className="Hangman container">
                <h1 className="text-center">
                    Hangman
                </h1>
                <div className="float-right">
                    Wrong Guesses {this.state.mistakes} of {this.props.maxWrong}
                </div>
                <div className="text-center">
                    <img src={this.props.images[this.state.mistakes]} alt="" />
                </div>
                <div className="text-center">
                    <p>
                        Guess the programming language
                    </p>

                    <p>
                        {gameOver ?  this.state.answer : this.guessWord() }
                    </p>
                    <p>
                        {gameStat}
                    </p>

                    <button className="btn btn-info " onClick={this.resetGame}>
                        Reset
                    </button>

                </div>

              { console.log(this.state.answer) }
            </div>
        )
    }
    
}

export default Hangman;
