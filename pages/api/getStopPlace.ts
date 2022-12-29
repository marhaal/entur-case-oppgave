// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getStopPlace from '../stopPlaceQuery'

export default function handler(req, res) {
  const stopPlace = getStopPlace()
  res.status(200).json(stopPlace)
}