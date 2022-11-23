import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timer: 25,
    seconds: '00',
    timerID: null,
    breakID: null,
    alarm: false
}

const clockSlice = createSlice({
    name: "clockSlice",
    initialState,
    reducers: {
        decrementBreak(state) {
            if (state.breakLength !== 1) {
                state.breakLength = --state.breakLength
            }
        },
        incrementBreak(state) {
            if (state.breakLength < 60) {
                state.breakLength = ++state.breakLength;
            }
        },
        incrementSession(state) {
            if (state.sessionLength < 60) {
                state.sessionLength = ++state.sessionLength;
                state.timer = ++state.timer;
            }
        },
        decrementSession(state) {
            if (state.sessionLength !== 1) {
                state.sessionLength = --state.sessionLength;
                state.timer = --state.timer;
            }
        },
        reset(state) {
            clearInterval(state.timerID)
            state.alarm.pause();
            state.alarm.currentTime = 0;
            state.breakLength = 5
            state.sessionLength = 25
            state.timer = 25
            state.seconds = '00'
            state.timerID = null
            state.isBreak = false
        },
        setTimerID(state, action) {
            state.timerID = action.payload
        },
        setIsBreak(state, action) {
            state.isBreak = action.payload
        },
        setSeconds(state, action) {
            state.seconds = action.payload
        },
        setTimer(state, action) {
            state.timer = action.payload
        },
        setAlarm(state, action) {
            state.alarm = action.payload.current
        }
    }
})

export const start = createAsyncThunk("clock/timerStatus", async (_, Thunk) => {

    let dispatch = Thunk.dispatch
    let { clockSlice: { timerID } } = Thunk.getState();

    if (timerID) {

        clearInterval(timerID)
        dispatch(setTimerID(null))

    } else {
        let id = setInterval(function counter() {

            let { clockSlice: { breakLength, timer, seconds, sessionLength, alarm, isBreak } } = Thunk.getState();

            if (+seconds === 0 && +timer === 0) {

                if (isBreak) {
                    dispatch(setIsBreak(false))
                    dispatch(setTimer(sessionLength))
                } else {
                    alarm.play()
                    dispatch(setIsBreak(true))
                    dispatch(setTimer(breakLength))
                }

            } else {

                if (+seconds === 0 && timer !== 0) {
                    dispatch(setSeconds(59))
                    dispatch(setTimer(--timer))
                } else {
                    if (seconds <= 10) {
                        dispatch(setSeconds(`0${--seconds}`))
                    } else {
                        dispatch(setSeconds(--seconds))
                    }
                }

            }

        }, 1000);

        dispatch(setTimerID(id))
    }
})

export const { decrementBreak, incrementBreak, incrementSession, decrementSession, reset, setTimerID, setSeconds, setTimer, setIsBreak, setAlarm } = clockSlice.actions
export default clockSlice.reducer