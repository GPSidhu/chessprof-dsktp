import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export interface TimerProps {
    id: string | number
    startTime: number // in seconds
    increment?: number // in seconds
    on?: boolean
    format?: "hour" | "min" | "second" // default hour => hh:mm:ss, min => mm:ss
    onTimeout?: (id: string | number ) => void // returns the id of the timer which exhausted
}

const Container = styled.div`
    height: 28px;
    width: 80px;
    background: darkgrey;
    color: #fff;
    font-weight: bold;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
`

const Timer = ({
    startTime,
    increment,
    on,
    format,
    id,
    onTimeout
}: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(startTime);
    const [isOff, setIsOff] = useState<boolean>(false);

    useEffect(() => {
        if (on) {
            setIsOff(false);
            const interval = setInterval(() => {
                if (timeLeft > 0)
                    setTimeLeft(timeLeft - 1)
                else {
                    onTimeout && onTimeout(id)
                    clearInterval(interval)
                }
            }, 1000)
            return () => clearInterval(interval)
        } else {
            if (!isOff && timeLeft < startTime) {
                setTimeLeft(timeLeft + (increment || 0))
                setIsOff(true);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft, on]);

    // const { time, start, on } = timer;
    let seconds = ("0" + (Math.floor((timeLeft) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timeLeft / 60) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timeLeft / 3600) % 60)).slice(-2);

    return (
        <Container>
            <span className="timerCount">
                {format === "hour" && <span>{`${hours} : `}</span>}
                {format === "min" && <span>{`${minutes} : `}</span>}
                {<span>{`${seconds}`}</span>}
            </span>
        </Container>
    )
}

Timer.defaultProps = {
    on: false,
    format: "min"
}

export default Timer
