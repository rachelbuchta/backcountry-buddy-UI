import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import "./Profile.css"
import { updateUser } from "../../apiRequests/userRequests.js"
import { LogoutButton } from "../Login/LogoutButton"
import { NavBar } from "../NavBar/NavBar"

interface ProfileProps {
  user: {
    id: string
    user_name: string
    email_address: string
    emergency_contact_name: string
    emergency_number: string
    last_name: string
    first_name: string
    full_name: string
    picture: string
  }
  setUser: React.Dispatch<React.SetStateAction<any>>
}

export const Profile: React.FC<ProfileProps> = ({ user, setUser }) => {
  const { getAccessTokenSilently } = useAuth0()

  const submitInfo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    getAccessTokenSilently().then((token) => {
      updateUser(token, user.id, {
        emergency_contact_name: user.emergency_contact_name,
        emergency_number: user.emergency_number,
      })
    })
  }

  return (
    <main className="background profile-background-img">
      <div className="sub-container">
        <h1>My Account</h1>
        <img
          src={user.picture}
          alt={user.full_name}
          className="profile-photo"
        />

        <div>
          <p className='name'>
            <strong>Name:</strong> {user.full_name}
          </p>
          <p className='userName'>
            <strong>Username:</strong> {user.user_name}
          </p>
          <p className='email'>
            <strong>Email:</strong> {user.email_address}
          </p>
        </div>

        <form className="emergency-form">
          <h3>Emergency Contact</h3>
          <div className="emergency-form-section">
            <label htmlFor="emergencyName" className="emergency-label">
              Name:
            </label>
            <input
              type="text"
              name="emergencyName"
              value={user.emergency_contact_name}
              onChange={(e) =>
                setUser({
                  ...user,
                  emergency_contact_name: e.target.value,
                })
              }
            />
          </div>
          <div className="emergency-form-section">
            <label htmlFor="phone" className="emergency-label">
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              placeholder="123-456-7890"
              value={user.emergency_number}
              onChange={(e) =>
                setUser({
                  ...user,
                  emergency_number: e.target.value,
                })
              }
            />
          </div>
          <button className="button-save" onClick={(e) => submitInfo(e)}>
            <strong>Save</strong>
          </button>
        </form>

        <LogoutButton />
      </div>
      <NavBar />
    </main>
  )
}
