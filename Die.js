import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <div className={[2,3,4,5,6].includes(props.value)? "dot" : ""}></div>
            <div></div>
            <div className={[4,5,6].includes(props.value)? "dot" : ""}></div>
            <div className={[6].includes(props.value)? "dot" : ""}></div>
            <div className={[1,3,5].includes(props.value)? "dot" : ""}></div>
            <div className={[6].includes(props.value)? "dot" : ""}></div>
            <div className={[4,5,6].includes(props.value)? "dot" : ""}></div>
            <div></div>
            <div className={[2,3,4,5,6].includes(props.value)? "dot" : ""}></div>
        </div>
    )
}