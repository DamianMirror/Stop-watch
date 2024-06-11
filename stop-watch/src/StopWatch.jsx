import React, {useState, useEffect, useRef} from "react"

function StopWatch(){
    const [isRunning, setIsRunning] = useState(false)
    const [elepsedTime, setElsepsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElsepsedTime(Date.now() - startTimeRef.current);
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elepsedTime;
    }

    function stop(){
        setIsRunning(false);
    }

    function reset(){
        setElsepsedTime(0);
        setIsRunning(false);
    }

    function formatTime(){
        let hours = Math.floor(elepsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elepsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elepsedTime / (1000) % 60);
        let milliseconds = Math.floor(elepsedTime % 1000 / 10);

        hours = String(hours).padStart(2, "0")
        minutes = String(minutes).padStart(2, "0")
        seconds = String(seconds).padStart(2, "0")
        milliseconds = String(milliseconds).padStart(2, "0")

        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }

    return(<div className="StopWatch">
        <div className="display">{formatTime()}</div>
        <div className="controls">
            <button onClick={start} className="button">Start</button>
            <button onClick={stop} className="button">Stop</button>
            <button onClick={reset} className="button">Reset</button>
        </div>
    </div>)
}

export default StopWatch