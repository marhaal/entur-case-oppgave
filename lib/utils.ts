import { StopPlaceResponse } from "./getStopPlace";

export type QueueItem = {
    promise: (id: string) => Promise<StopPlaceResponse>
}

export function enqueue(
    promise: (id: string) => Promise<StopPlaceResponse>, 
    queue: QueueItem[]) 
    {
    queue.push({
        promise,
    });
    return queue;
}

export function dequeue(
    queue: QueueItem[],
    id: string) 
    {
    const item = queue.pop();
    if (!item) {
        return;
    }
    item.promise(id)
}

export function timeDifferenceInMinutes(from: Date, to: Date): number {
    return Math.round((((from.getTime() - to.getTime())% 86400000) % 3600000) / 60000)
}