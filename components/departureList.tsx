import React, { 
    useEffect, 
    useState, 
    FC } from 'react';
import { Departure } from './departure';
import { DepartureData, getStopPlace } from '../lib/getStopPlace'
import { enqueue, dequeue, QueueItem } from '../lib/utils';
import styles from '../styles/Home.module.css'

type DepartureList = {
    stopPlaceId: string;
    stopPlaceTitle: string;
}

export const DepartureList: FC<DepartureList> = ({
    stopPlaceId, 
    stopPlaceTitle
    }): JSX.Element => {
    const [departures, setDepartures] = useState<DepartureData[]>([]);
    const [pendingState, setPendingState] = useState<boolean>(false);
    const [queue, setQueue] = useState<QueueItem[]>([])

    const getDepartures = () => {
        setPendingState(true)

        getStopPlace(stopPlaceId).then(response => {
            setPendingState(false)
            if (queue.length !== 0) {
                dequeue(queue, stopPlaceId)
                setQueue([])
            }
            if (response) {
                setDepartures(response.departures)
            }
        }, error => console.log(error))
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (pendingState === false) {
                getDepartures();
            } else {
                setQueue(enqueue(() => getStopPlace(stopPlaceId), queue));
            }
        }, 10000);
        return () => clearInterval(interval);
    });

    return (
        <>
            <h3>{stopPlaceTitle}</h3>
            <ul className={styles.departurelist}>
                {departures?.map(departure => {
                    return (
                        <Departure 
                            key={departure.id} 
                            busCode={departure.publicCode} 
                            busName={departure.frontText} 
                            expectedArrivalTime={new Date(departure.expectedArrivalTime)}
                            aimedArrivalTime={new Date(departure.aimedArrivalTime)}
                        />
                    )
                })}
            </ul>
        </>
    )
}

export default DepartureList;