import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

import { LoginButton } from "../Login/LoginButton"

import "./LandingPage.css"

export const LandingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth0()

  return (
    <main className="landing">
      <header className="landing-img">
        <h1 className="logo">Backcountry Buddy</h1>
        
        {isAuthenticated && user.given_name ? (
          <h2>Welcome, {user.given_name}</h2>
        ) : (
          <h2>Welcome!</h2>
        )}

        {!isAuthenticated && <LoginButton />}
        
      </header>
    </main>
  )
}
