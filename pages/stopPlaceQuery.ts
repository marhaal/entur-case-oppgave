export default async function getStopPlace() {
    return await fetch('https://api.entur.io/journey-planner/v3/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `
        query {
          stopPlace(
            id: "NSR:StopPlace:4000"
          ) {
            name
            id
            estimatedCalls {
              expectedDepartureTime
              aimedArrivalTime
              expectedArrivalTime
              destinationDisplay {
                frontText
              }
              serviceJourney {
                line {
                  publicCode
                  transportMode
                }
              }
            }
          }
        }` 
      }),
    })
    .then(async res => {
      const {data} = await res.json()
      return await data;
    })
  }