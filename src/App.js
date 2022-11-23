import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { incrementBreak, decrementBreak, decrementSession, incrementSession, start, reset, setAlarm } from "./Redux/clockSlice"

import alarmSound from "./assets/alarm.mp3";

import './index.scss';

function App() {
  const { breakLength, sessionLength, timer, seconds, timerID, isBreak } = useSelector(state => state.clockSlice)
  const dispatch = useDispatch()
  const alarmRef = React.useRef()

  React.useEffect(() => {
    dispatch(setAlarm(alarmRef))
  }, [])

  return (
    <div className="App">
      <div className="background">
        <div className="strap"></div>
        <div className="bodyBG"></div>
        <div  id="break-label">
          <button id="break-decrement" onClick={() => !timerID && dispatch(decrementBreak())}>
            <i class="fa-solid fa-minus"></i>
          </button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => !timerID && dispatch(incrementBreak())}>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="display">      
        <div id="timer-label">{isBreak ? "Break" : "Session"}</div>
          <span id="time-left">{`${timer < 10 ? "0" + timer : timer}:${seconds}`}</span>
          <div className="timer_control">
            <button id="start_stop" onClick={() => dispatch(start())}>
              <i class="fa-solid fa-play"></i>
              <i class="fa-solid fa-pause"></i>
            </button>
            <button id="reset" onClick={() => dispatch(reset())}>
              <i class="fa-solid fa-repeat"></i>
            </button>
          </div>
          </div>
        <div  id="session-label">
          <button id="session-decrement" onClick={() => !timerID && dispatch(decrementSession())}>
            <i class="fa-solid fa-minus"></i>
          </button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => !timerID && dispatch(incrementSession())}>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>  

      <audio ref={alarmRef} src={alarmSound} id="beep" ></audio>
    </div>
  );
}

export default App;
