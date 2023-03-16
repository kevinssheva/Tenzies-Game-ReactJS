import React from "react"

export default function Counter(props) {
    return(
        <div className="counter">
            <h4>Rolls : {props.rolls}</h4>
            <div className="best-time">
                <h4>Best Time</h4>
                <h4>{props.bestTime? 
                    (
                    (props.bestTime.minutes < 10? '0' + props.bestTime.minutes : props.bestTime.minutes) 
                    + ":" +
                    (props.bestTime.seconds < 10? '0' + props.bestTime.seconds : props.bestTime.seconds)
                    )
                    : "-"}
                </h4>
            </div>
            <h4>{props.min < 10? '0' + props.min : props.min}:
            {props.sec < 10? '0' + props.sec : props.sec}</h4>
        </div>
    )
}