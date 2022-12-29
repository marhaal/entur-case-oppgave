import React, {FC} from 'react';
import { calculateTimeDifferenceInMinutes } from '../lib/utils';

interface Departure {
    busCode: string;
    busName: string;
    expectedArrivalTime: string;
    aimedArrivalTime: string;
}

export const Departure: FC<Departure> = ({
    busCode, 
    busName, 
    expectedArrivalTime,
    aimedArrivalTime
    }): JSX.Element => {

    function calculateTimeToDeparture() {
        const currentDateTime = new Date();
        const busArrivalDateTime = new Date(expectedArrivalTime);
        return calculateTimeDifferenceInMinutes(busArrivalDateTime, currentDateTime)
    }

    const timeToArrival: number = calculateTimeToDeparture()
    const arrivalInfo = timeToArrival === 0 
        ? 'nå' 
        : `${timeToArrival} min`;

    function calculateIsDelayed() {
        const delayTime = calculateTimeDifferenceInMinutes(new Date(aimedArrivalTime), new Date(expectedArrivalTime))
        return delayTime < 0 
            ? `(Forsinket ca. ${Math.abs(delayTime)} minutter)` 
            : '';
    }  

    return (
        <li>
            {busCode + ' ' + busName + ' ' + arrivalInfo + ' ' + calculateIsDelayed()}
        </li>
    )
}

export default Departure;