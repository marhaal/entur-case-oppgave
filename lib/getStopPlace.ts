export type StopPlaceResponse = {
  name: string;
  departures: DepartureData[]
}

export type DepartureData = {
  expectedDepartureTime: string;
  aimedArrivalTime: string;
  expectedArrivalTime: string;
  publicCode: string,
  frontText: string,
  id: string
}

export async function getStopPlace(id: string): Promise<StopPlaceResponse> {
    const query = `
    query {
      stopPlace(
        id: "NSR:StopPlace:${id}"
      ) {
        name
        id
        estimatedCalls(numberOfDepartures: 10) {
          expectedDepartureTime
          aimedArrivalTime
          expectedArrivalTime
          destinationDisplay {
            frontText
          }
          serviceJourney {
            id
            line {
              publicCode
            }
          }
        }
      }
    }`;

    return await fetch('https://api.entur.io/journey-planner/v3/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'ET-Client-Name': 'entur-case' 
      },
      body: JSON.stringify({ query }),
    })
    .then(async response => {
      const {data} = await response.json()
      if (response.ok) {
        return {
          name: data.stopPlace.name,
          departures: data.stopPlace.estimatedCalls.map((call) => ({
            departureTime: call.expectedDepartureTime,
            aimedArrivalTime: call.aimedArrivalTime,
            expectedArrivalTime: call.expectedArrivalTime,
            frontText: call.destinationDisplay.frontText,
            publicCode: call.serviceJourney.line.publicCode,
            id: call.serviceJourney.id,
          })),
        };
      } else {
        // handle the graphql errors
        const error = {
          message: data?.errors?.map(e => e.message).join('\n'),
        }
        return Promise.reject(error)
      }
    })
}
