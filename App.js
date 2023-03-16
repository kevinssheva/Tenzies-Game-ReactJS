import React from "react"
import Counter from "./Counter"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [counter, setCounter] = React.useState({rolls: 0, seconds: 0, minutes: 0})
    const [highScore, setHighScore] = React.useState(""); 
    
    let timer
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    
    React.useEffect(() => {
        if (!tenzies) {
            timer = setInterval(() => {
                if (counter.seconds == 59) {
                    setCounter(oldCounter => ({
                        ...oldCounter,
                        seconds: 0,
                        minutes: oldCounter.minutes + 1                        
                    }))
                } else {
                    setCounter(oldCounter => ({
                        ...oldCounter,
                        seconds: oldCounter.seconds + 1
                    }))
                }
            }, 1000)
        }
        return (() => clearInterval(timer))
    })

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 3),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function addScore(time) {
        if (!highScore) {
            setHighScore({
                seconds: time.seconds,
                minutes: time.minutes
            })
        } else {
            const oldTime = highScore.minutes * 60 + highScore.seconds
            const newTime = time.minutes * 60 + time.seconds
            if (newTime < oldTime) {
                setHighScore({
                    seconds: time.seconds,
                    minutes: time.minutes
                })
            }
        }
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            
            setCounter(oldCounter => ({
                ...oldCounter,
                rolls: oldCounter.rolls + 1
            }))
        } else {
            addScore({
                seconds: counter.seconds,
                minutes: counter.minutes
            })
            setTenzies(false)
            setDice(allNewDice())
            setCounter({
                rolls: 0,
                seconds: 0,
                minutes: 0
            })
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti 
            width="400px"
            height="500px"/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <Counter rolls={counter.rolls} sec={counter.seconds} min={counter.minutes} bestTime={highScore}/>
        </main>
    )
}