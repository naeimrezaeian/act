var intervalTimer;
export default {

    state: {
        selectedTime: 0,
        timeLeft: '00:00',
        endTime: '0',
        timerFinish:false
    },
    actions: {

        setTime({dispatch},seconds) {           
            clearInterval(intervalTimer);           
            dispatch("timer",seconds)
        },
        timer({dispatch},seconds) {
            const now = Date.now();
            const end = now + seconds * 1000;           
            dispatch("displayTimeLeft",seconds)
            this.selectedTime = seconds;           
            dispatch("displayEndTime",seconds)            
            dispatch("countdown",end)
            
        },
        countdown({dispatch},end) {

            intervalTimer = setInterval(() => {
                const secondsLeft = Math.round((end - Date.now()) / 1000);

                if (secondsLeft === 0) {
                    this.endTime = 0;
                }

                if (secondsLeft < 0) {
                    clearInterval(intervalTimer);

                    return;
                }
              
                dispatch("displayTimeLeft",secondsLeft)
            }, 1000);
        },
        displayTimeLeft({commit},secondsLeft) {
            const minutes = Math.floor((secondsLeft % 3600) / 60);
            const seconds = secondsLeft % 60;
            commit("updateTimeleft",{"minutes":minutes,"seconds":seconds})
           
        },
        displayEndTime({commit},timestamp) {
            const end = new Date(timestamp);
            const hour = end.getHours();
            const minutes = end.getMinutes();           
            commit("updateEndtime",{"hour":hour,"minutes":minutes})
        }

    },
    mutations: {
        updateEndtime(state,data){            
            state.endTime = `${hourConvert(data.hour)}:${zeroPadded(data.minutes)}`;
        },
        updateTimeleft(state,data){            
            state.timeLeft = `${zeroPadded(data.minutes)}:${zeroPadded(data.seconds)}`;            
            if (data.minutes === 0 && data.seconds === 0) {
                console.log("Time end");
                state.timerFinish=true
              

            }
            

            }
        

    },
    getters: {
        


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