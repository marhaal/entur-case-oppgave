import React, { useEffect, useState } from 'react';
import getStopPlace from '../pages/stopPlaceQuery';
import { Departure } from './departure';
//import DepartureInterface from './departure';

interface DepartureInterface {
    expectedDepartureTime: string;
    aimedArrivalTime: string;
    expectedArrivalTime: string;
    destinationDisplay: {
        frontText: string;
    }
    serviceJourney: {
        line: {
            publicCode: string;
            transportMode: string;
        }
    } 
}

export const DepartureList = () => {
    const [departures, setDepartures] = useState<DepartureInterface[]>([]);

    const getDeparturesList = async () => {
        const dep = await getStopPlace();
        setDepartures(dep.stopPlace.estimatedCalls)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getDeparturesList()
        }, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <ul>
            {departures?.map(departure => {            
                return (
                    <Departure 
                        key={departure.expectedDepartureTime} 
                        busCode={departure.serviceJourney.line.publicCode} 
                        busName={departure.destinationDisplay.frontText} 
                        expectedArrivalTime={departure.expectedArrivalTime}
                        aimedArrivalTime={departure.aimedArrivalTime}
                    />
                )
            })}
        </ul>
    )
}

export default DepartureList;