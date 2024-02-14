var intervalTimer;
export default {

    state: {
        selectedTime: 0,
        timeLeft: '00:00:00',
        endTime: '0',
        timerFinish: false,
        secondsLeft:0
    },
    actions: {
        setTime({ dispatch,commit }, seconds) {
            commit("resetTimer")
            clearInterval(intervalTimer);
            if(seconds){
                dispatch("timer", seconds)
            }
            
        },
        timer({ dispatch }, seconds) {
            const now = Date.now();
            const end = now + seconds * 1000;
            dispatch("displayTimeLeft", seconds)
            this.selectedTime = seconds;
            dispatch("displayEndTime", seconds)
            dispatch("countdown", end)

        },
        countdown({ dispatch }, end) {

            intervalTimer = setInterval(() => {
                const secondsLeft = Math.round((end - Date.now()) / 1000);

                if (secondsLeft === 0) {
                    this.endTime = 0;
                }

                if (secondsLeft < 0) {
                    clearInterval(intervalTimer);

                    return;
                }

                dispatch("displayTimeLeft", secondsLeft)
                dispatch("secondsRemain", secondsLeft)
            }, 1000);
        },
        displayTimeLeft({ commit }, secondsLeft) {
            const hour = Math.floor(secondsLeft/ 3600);
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;
            commit("updateTimeleft", { hour, minutes, seconds })

        },
        displayEndTime({ commit }, timestamp) {
            const end = new Date(timestamp);
            const hour = end.getHours();
            const minutes = end.getMinutes();
            commit("updateEndtime", { hour, minutes })
        },
        secondsRemain({commit},seconds){
            commit('updateSecondsLeft',seconds)
        }

    },
    mutations: {
        resetTimer(state){
            state.selectedTime= 0,
            state.timeLeft= '00:00:00',
            state.endTime= '0',
            state.timerFinish= false,
            state.secondsLeft=0
        },
        updateEndtime(state, data) {
            state.endTime = `${hourConvert(data.hour)}:${zeroPadded(data.minutes)}:${zeroPadded(data.seconds)}`;
        },
        updateTimeleft(state, data) {
            state.timeLeft = `${zeroPadded(data.hour)}:${zeroPadded(data.minutes)}:${zeroPadded(data.seconds)}`;
            if (data.hour === 0 && data.minutes === 0 && data.seconds === 0) {
                state.timerFinish = true
            }
        },
        updateSecondsLeft(state,data){
            state.secondsLeft=data
        }
    },
    getters: {
        getCurrentTimeInSecond(state){
            return state.secondsLeft
        }
    },

}

function zeroPadded(num) {
    // 4 --> 04
    return num < 10 ? `0${num}` : num;
}

function hourConvert(hour) {
    // 15 --> 3
    return hour % 12 || 12;
}