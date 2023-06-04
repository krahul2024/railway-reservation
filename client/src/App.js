import './App.css';
import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import AddTrain from './components/add_train.js'
import Home from './components/home.js'
import TrainList from './components/train_list.js'
import TrainDetails from './components/train_details.js'
import ReservationDetails from './components/reservationDetails.js'
import ReservationConfirmation from './components/reservationConfirmation.js'
import Login from './components/login.js'
import Register from './components/register.js'
import UpdateProfile from './components/update_profile.js'
import Profile from './components/profile.js'
import Header from './components/header.js'
import {UserContextProvider , UserContext } from './userContext.js'
import Tickets from './components/tickets.js'
import PnrStatus from './components/pnrStatus.js'
import AddClass from './components/add_class.js'
import AddStation from './components/add_station.js'
import Information from './components/information.js'

function App() {
  return ( <>

      {/*Nav bar is placed here */}

      <UserContextProvider>
        <Header />

        <Routes>

          <Route exact path = "/" element = { <Home /> } />
          <Route path = "/add_train" element = { <AddTrain /> } />
          <Route path = "/info" element = { <Information /> } />   
          <Route path = "/add_class"  element = { <AddClass /> } />
          <Route path = "/add_station" element = { <AddStation /> } /> 
          <Route path = "/train_details" element = { <TrainDetails />} /> 
          <Route path = "/train_list" element = { <TrainList /> } />
          <Route path = "/reservation_details"  element = { <ReservationDetails /> } />
          <Route path = "/confirmation" element = { <ReservationConfirmation /> } />
          <Route path = "/login" element = { <Login /> } /> 
          <Route path = "/register" element = { <Register /> } />
          <Route path = "/update_profile" element = { <UpdateProfile /> } />
          <Route path = "/user/:subpage" element = { <Profile /> } /> 
          <Route path = "/reservations" element = { <Tickets /> } />
          <Route path = "/pnr-status" element = { <PnrStatus /> } /> 

        </Routes>

      </UserContextProvider>
      
  </>)
}

export default App;
