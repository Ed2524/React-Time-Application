import { useEffect, useState } from "react";
import "./App.css";

export default function Timer_React() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Live Clock
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Stopwatch
    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    // Format Stopwatch
    const formatStopwatch = () => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // Reset Stopwatch
    const resetStopwatch = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    return (
        <div>
            <h1>React Time App</h1>

            <h2>Live Clock</h2>

            <div className="clock-display">
                {currentTime.toLocaleTimeString()}
            </div>

            <h2>Stopwatch</h2>

            <div className="stopwatch-display">
                {formatStopwatch()}
            </div>

            <div className="button-container">
                <button onClick={() => setIsRunning(true)}>
                    Start
                </button>

                <button onClick={() => setIsRunning(false)}>
                    Stop
                </button>

                <button onClick={resetStopwatch}>
                    Reset
                </button>
            </div>
        </div>
    );
}