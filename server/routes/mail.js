// import express from 'express'  
// import Station from '../models/station.js'
// import data from './rs_list.json' assert {type : 'json'}
// export default data]
import nodemailer from 'nodemailer' 

const sendMail = async(to , messageContent) => {
	try{
		//creating transporter  
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port:587,
			secure:false ,
			auth:{
				user:"rahulstestmail2024@gmail.com",
				pass:"obmbvrhwnohbgzun"
			}
		})
		transporter.verify((error , success) => {
			if(error) console.log({error}) 
			else console.log('server is ready to send messages.')
		})
		console.log('transporter working or not?')

			// message object  
			const message = {
				to , subject:'new message' , 
				html:`<div>${messageContent}</div>`
			}

			// sending the mail  
			const response = await transporter.sendMail(message) 
			return response  
	}
	catch(err) {
		console.log(err)
		return 'There was an error while sending the mail! Please try again later.'
	}
}

export default sendMail  