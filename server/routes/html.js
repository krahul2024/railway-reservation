const get_user = (user) => {
	return `<tr style="padding-left:20px padding-right-20px">
              <td style="margin:5px 10px 5px 10px">${user.name}</td>
              <td style="margin:5px 10px 5px 10px">${user.pnr}</td>
              <td style="margin:5px 10px 5px 10px">${user.seat}</td>
              <td style="margin:5px 10px 5px 10px">${user.address}</td>
              <td style="margin:5px 10px 5px 10px">${user.phone}</td>
              <td style="margin:5px 10px 5px 10px">${user.email}</td>
              <td style="margin:5px 10px 5px 10px">${user.age}</td>
            </tr> <br>`
}

const get_t_row = (name , value) => {
	return `<tr style="padding:10px">
              <th >${name}</th>
              <th >${value}</th>
            </tr>`
}

const get_html = (users , ticket) => {
	let fields = [
			{ name:'Booking Time' , value:ticket.createdAt	},
			{ name:'Train Details' , value:`${ticket.train.number} - ${ticket.train.name}`	},
			{ name:'Class' , value: ticket.jClass.classType	},
			{ name:'Journey Date' , value:`${ticket.date.day.value} ${ticket.date.month.name} ${ticket.date.year}`},
			{ name:'Amount (per person, in Rs.)' , value:ticket.distance * ticket.jClass.fareRatio },
			{ name:'Station Details' , 
			 value:`Boarding from ${ticket.stations.boarding.stationName} at ${ticket.stations.boarding.departureTime} ,  Arriving on ${ticket.stations.destination.stationName} at ${ticket.stations.destination.arrivalTime}`
			}
		]
	let start = `
    <div>
      <div>
        <span style="font-size:15px">Details for your ticket booking are displayed below. PNR values are different for each person and they are mentioned right next to name of the person.</span>
      </div>
      <br>
      <div>
        <div>
          <table>
            <caption style="font-size:22px">
              Journey Details
            </caption> <br>`
       let j_details = ``
       fields.map((item , index) => {
       	j_details += get_t_row(item.name , item.value)
       })
       // here we have to add j_details {name , value} pair
       let mid_values = ` </table>
        </div>
        <br><br>
        <div>
          <table>
            <caption style="font-size:22px">
              Details of Passengers
            </caption><br>
            <tr style="padding-left:20px padding-right-20px">
              <th style="margin:5px 10px 5px 10px">Name</th> 
              <th style="margin:5px 10px 5px 10px">PNR</th>
              <th style="margin:5px 10px 5px 10px">Seat</th>
              <th style="margin:5px 10px 5px 10px">Address</th>
              <th style="margin:5px 10px 5px 10px">Phone</th>
              <th style="margin:5px 10px 5px 10px">E-mail</th>
              <th style="margin:5px 10px 5px 10px">Age</th>
            </tr><br>`
         let user_details = `` 
         users.map((user , index) => {
         	user_details += get_user(user)  
         })
         let end_values = `   </table>
        </div>
      </div>
      <br><br>
      <span>If you want to cancel the ticket visit homepage --> PNR-status , then enter your pnr number an d select cancel the ticket, after that you will recieve an otp on the email which the ticket was booked , enter valid otp and click on confirm cancellation, after that same email should recieve a message of ticket cancellation, OR click on the link given below for going to PNR-status page. Thanks.</span>
      <br><br>
      <a href="http://localhost:3000/pnr-status" target="__blank">Click Here</a>
    </div>
`

const html_message = start + j_details + mid_values + user_details + end_values 

// console.log({html_message}) 
return html_message 
}

export default get_html  