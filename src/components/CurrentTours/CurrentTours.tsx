import React, { useState, useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import "./CurrentTours.css"
import { CurrentTourCard } from "./CurrentTourCard"
import { getTours, deleteTour } from "../../apiRequests/tourRequests.js"
import { cleanTours } from "../../apiRequests/dataCleaners.js"
import { secureCall } from "../../apiRequests/promiseHandling.js"
import { NavBar } from "../NavBar/NavBar"

interface Tour {
  id: number
  date: string
  location: string
  creator_id: number
  complete: boolean
}

interface CurrentToursProps {
  userId: number
  setErr: () => any
}

export const CurrentTours: React.FC<CurrentToursProps> = ({
  userId,
  setErr,
}) => {
  const [allTours, setAllTours] = useState<Array<Tour>>([])
  const { getAccessTokenSilently } = useAuth0()

  const removeTour = (tourId: number): any => {
    const confirmationMessage = window.confirm(
      "Are you sure you want to remove this tour?"
    )
    if (confirmationMessage) {
      secureCall(getAccessTokenSilently, setErr, deleteTour, tourId).then(() =>
        setAllTours(allTours.filter((tour) => tour.id !== tourId))
      )
    } else {
      return false
    }
  }

  useEffect(() => {
    secureCall(
      getAccessTokenSilently,
      setErr,
      getTours,
      userId
    ).then((tours: Array<Tour>) => setAllTours(cleanTours(tours, false)))
  }, [getAccessTokenSilently, userId, setErr])

  const tours = allTours.map((tour) => {
    return (
      <CurrentTourCard
        key={tour.id}
        date={tour.date}
        location={tour.location}
        tourId={tour.id}
        userId={userId}
        removeTour={removeTour}
      />
    )
  })

  return (
    <main className="background current-background-img">
      <div className="sub-container">
        <h1>Current Tours</h1>
        <section className="card-container">{tours}</section>
      </div>
      <NavBar />
    </main>
  )
}
