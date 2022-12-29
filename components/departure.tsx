import React, { useState } from 'react';

export const Departure = ({
    busCode, 
    busName, 
    expectedArrivalTime,
    aimedArrivalTime}) => {

    function calculateTimeToDeparture() {
        const currentDateTime = new Date().getTime();
        const busArrivalDateTime = new Date(expectedArrivalTime).getTime();
        return Math.round((((busArrivalDateTime - currentDateTime) % 86400000) % 3600000) / 60000)
    }

    const timeToDeparture = calculateTimeToDeparture()
    const departureInfo = timeToDeparture === 0 ? 'nå' : timeToDeparture + ' ' + 'min';

    function calculateIsDelayed() {
        const delayTime = Math.round(((new Date(aimedArrivalTime).getTime() - new Date(expectedArrivalTime).getTime()% 86400000) % 3600000) / 60000)
        console.log(delayTime)
        return delayTime < 0 ? '(Forsinket)' : '';
    }  

    return (
        <>
            <li key={expectedArrivalTime.toString()}>
                {busCode + ' ' + busName + ' ' + departureInfo + ' ' + calculateIsDelayed()}
            </li>
        </>
    )
}

export default Departure;