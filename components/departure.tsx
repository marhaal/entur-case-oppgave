import React, {FC} from 'react';
import { timeDifferenceInMinutes } from '../lib/utils';

interface Departure {
    busCode: string;
    busName: string;
    expectedArrivalTime: Date;
    aimedArrivalTime: Date;
}

export const Departure: FC<Departure> = ({
    busCode, 
    busName, 
    expectedArrivalTime,
    aimedArrivalTime
    }): JSX.Element => {
    const currentDateTime = new Date();

    function getArrivalInfo(): string {
        const timeToArrival = timeDifferenceInMinutes(expectedArrivalTime, currentDateTime);
        if (timeToArrival === 0) {
            return 'nå'
        } 
        else if (timeToArrival > 10) {
            return `${expectedArrivalTime.getHours()}:${expectedArrivalTime.getMinutes()}`
        } else {
            return `${timeToArrival} min`
        }
    }

    function calculateIsDelayed(): string {
        const delayTime = timeDifferenceInMinutes(aimedArrivalTime, expectedArrivalTime)
        return delayTime < 0 ? `(Forsinket ca. ${Math.abs(delayTime)} minutter)` : '';
    }

    return (
        <li>
            {busCode + ' ' + busName + ' ' + getArrivalInfo() + ' ' + calculateIsDelayed()}
        </li>
    )
}

export default Departure;