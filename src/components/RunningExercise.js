/*
import React, { useState } from 'react';
import StopWatch from './StopWatch';

const RunningExercise = () => {
  const [lapTimes, setLapTimes] = useState([]);

  const recordLap = () => {
    const currentTime = new Date().toLocaleTimeString();
    setLapTimes(prevLapTimes => [...prevLapTimes, currentTime]);
  };

  return (
    <div>
      <h2>Running Exercise</h2>
      <button onClick={recordLap}>Record Lap</button>
      <div>
        <h3>Lap Times:</h3>
        <ul>
          {lapTimes.map((lapTime, index) => (
            <li key={index}>{lapTime}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RunningExercise;



import React, { useState } from 'react';
import StopWatch from './StopWatch'; // Assuming StopWatch component is defined in StopWatch.js

const RunningExercise = () => {
  const [lapTimes, setLapTimes] = useState([]);

  const recordLap = (lapTime) => {
    setLapTimes(prevLapTimes => [...prevLapTimes, lapTime]);
  };

  return (
    <div>
      <h2>Running Exercise</h2>
      <StopWatch onLap={recordLap} />
      <div>
        <h3>Lap Times:</h3>
        <ul>
          {lapTimes.map((lapTime, index) => (
            <li key={index}>{lapTime}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RunningExercise;


import React, { useState } from 'react';
import Stopwatch from './Stopwatch'; // Assuming Stopwatch component is defined in Stopwatch.js

const RunningExercise = () => {
  const [lapTimes, setLapTimes] = useState([]);
  const [stopwatchTime, setStopwatchTime] = useState(null);

  const recordLap = () => {
    if (stopwatchTime) {
      setLapTimes([...lapTimes, stopwatchTime]);
    }
  };

  const handleStopwatchUpdate = (time) => {
    setStopwatchTime(time);
  };

  return (
    <div>
      <h2>Running Exercise</h2>
      <Stopwatch onUpdate={handleStopwatchUpdate} />
      <div>
        <button onClick={recordLap}>Record Lap</button>
      </div>
      <div>
        <h3>Lap Times:</h3>
        <ul>
          {lapTimes.map((lapTime, index) => (
            <li key={index}>{lapTime}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RunningExercise;

//code without timer

import React, { useState } from 'react';

const RunningExercise = () => {
  const [lapTimes, setLapTimes] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    setIsRunning(true);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setTimer(msToTime(elapsed));
    }, 1000);
    setTimer(msToTime(0));
    setTimer(interval);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timer);
  };

  const recordLap = () => {
    if (isRunning) {
      setLapTimes([...lapTimes, timer]);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(null);
    setLapTimes([]);
  };

  const msToTime = (duration) => {
    let milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  };

  return (
    <div>
      <h2>Running Exercise</h2>
      <div>
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={recordLap} disabled={!isRunning}>Record Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <h3>Lap Times:</h3>
        <ul>
          {lapTimes.map((lapTime, index) => (
            <li key={index}>{lapTime}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RunningExercise;
*/

import React, { useState, useEffect } from 'react';

const RunningExercise = () => {
  const [lapTimes, setLapTimes] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      // Decrease the interval duration to update the timer more frequently
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 100); // Update the timer every 100 milliseconds
      }, 100); // Decrease the interval duration to 100 milliseconds
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const recordLap = () => {
    if (isRunning) {
      setLapTimes([...lapTimes, timer]);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(0);
    setLapTimes([]);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div>
      <h2>Running Exercise</h2>
      <div>
        <p>Time: {formatTime(timer)}</p>
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={recordLap} disabled={!isRunning}>Record Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <h3>Lap Times:</h3>
        <ul>
          {lapTimes.map((lapTime, index) => (
            <li key={index}>{formatTime(lapTime)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RunningExercise;
