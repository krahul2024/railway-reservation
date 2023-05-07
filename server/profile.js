import React ,{ useState } from 'react'
import profile from '../images/profile.jpg'
import '../App.css'
import { NavLink } from 'react-router-dom'
//basic information contains name email phone with change password address
//extra information contains favourites section tickets trips

const Profile = () => {

	const basic_information = [{
			title:"Username : " , value:"rahul_one"
		},{
			title:"Name : "  , value:"Rahul Kumar Sah",
		},{
			title:"Date Joined : " , value:"March 2023"
		},
		{
			title:"E-mail : " , value:"this_is_my_email@email.com"
		},{
			title:"Phone : " , value:"+91 6609325422"
		},{
			title:"Address : " , value:"Tezpur Tezpur university Assam 784028"
		}
		]

	const extra_information = [{
			title:"Name : "  , value:"Rahul Kumar Sah",
		},{
			title:"Date Joined : " , value:"March 2023"
		},
		{
			title:"E-mail : " , value:"this_is_my_email@email.com"
		},{
			title:"Phone : " , value:"+91 6609325422"
		},{
			title:"Address : " , value:"Tezpur Tezpur university Assam 784028"
		}
		]
		let [ticketCount, setTicketCount] = useState(1)

		const tickets = [
				{title:"Transaction Details: ", value:"Amount: Rs. 5233, Transaction Number: 532211"},
				{title:"Train Details: ", value:"41124 Patna-Guwahati Superfast Express"},
				{title:"Boarding Details: ", value:"Station: Patna, Date:31/3/2023, Time:23:44(IST) "},
				{title:"Destination/Arrival Details: " , value:"Station: Guwahati, Date:1/4/2023, Time:21:54(IST) "},
				{title:"Reservation Details: ", value:"Class: 3AC, Seat Number: 45, 1 Adult, 0 children"},
				{title:"Booking Id: ", value:"random53322"}
			]

		const displayAll = () => {
			setTicketCount = 2
		}



	return ( 
		<>

		<div className="flex flex-col items-center justify-center p-4">

			<form action="">
				<div className="md:flex md:gap-x-4 mt-44 bg-slate-900 rounded-3xl px-4 py-16">
				
					<div className="flex md:mb-0 mb-8 shadow-lg p-1 rounded-lg justify-center">
						<img src={profile} 
						style={{ display:"inline" , width: 160, height: 150, borderRadius: 100, overflow: "hidden",
								    backgroundColor: "#1e293b",objectFit:"cover" }} alt=""/>
						{/*<div className="text-md text-cyan-400 ">
						<span className="font-bold block text-lg">Rahul Kumar</span>
						rahul_2647
						</div>*/}
					</div>

					<div className="justify-between p-2">
						{ basic_information.map((item)=>(
							<div className="p-1">
								<span className="text-md font-bold text-sky-400 mr-6">{item.title}</span>
								<span className="text-md font-semibold text-cyan-600">{item.value}</span>
							</div>
						))}
					</div>
				</div>
			</form>

			<div className="flex flex-col items-center bg-gray-900 p-1 mt-6 rounded-md">
					<div className="p-4">
					<span className="text-xl text-cyan-600 font-bold">Your Bookings</span>

						<div className="p-6 rounded-lg bg-gray-800 mt-6 mb-2 drop-shadow-2xl">
					{	
						tickets.map((item) => (
								<div className="">
									<span className="text-md text-sky-400 mr-6">{item.title}</span>
									<span className="text-sm font-bold text-slate-400">{item.value}</span>
								</div>
							))
					}
						</div>

					
						<div className="p-6 rounded-lg bg-gray-800 mt-6 mb-2 drop-shadow-2xl">
					{	
						tickets.map((item) => (
								<div className="">
									<span className="text-md text-sky-400 mr-6">{item.title}</span>
									<span className="text-sm font-bold text-slate-400">{item.value}</span>
								</div>
							))
					}
						</div>

						<div className="p-6 rounded-lg bg-gray-800 mt-6 mb-2 drop-shadow-2xl">
					{	
						tickets.map((item) => (
								<div className="">
									<span className="text-md text-sky-600 mr-6">{item.title}</span>
									<span className="text-sm font-bold text-slate-400">{item.value}</span>
								</div>
							))
					}
						</div>

					</div>
						<NavLink to={"/all_bookings"} className="text-center mb-2 p-2 mt-2 cursor-pointer w-1/2 text-sky-500 rounded-full bg-slate-800 text-md drop-shadow-md">
						Show All</NavLink>
					</div>
				<div>This is for favourite journeys</div>

			</div> 
		</>)
}

export default Profile
