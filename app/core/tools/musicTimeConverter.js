const musicTimeConverter = (time) => {
    if (time >= 60) {
        const timeConvert = Math.floor(time);
        const newTime = Math.floor(timeConvert / 60);
        const remainingTime = timeConvert - (newTime * 60)
        if (remainingTime === 0) {
            return newTime + ":00"
        }
        else {
            const newRemaningTime = remainingTime < 10 ? "0" + remainingTime : remainingTime
            return newTime + ":" + newRemaningTime
        }
    }
    else {
        const timeConvert = Math.floor(time);
        const newTime = timeConvert < 10 ? "0" + timeConvert : timeConvert
        return "00:" + newTime
    }
}

export default musicTimeConverter;