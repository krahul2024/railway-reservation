import express from 'express'  
import send_mail from './mail.js' 
console.log('sending the mail.....')
const message = 'this is testing  mail'  
const options = {
	from : 'rahulstestmail2024@gmail.com',
	to: 'sandipkumar2024@gmail.com',
	subject:'testing purpose',
	text:message ,
	html:'<div>this is html part for this testing mail</div>'
}
console.log('this is intermediate stage....')

send_mail(options , (info) => {
	console.log('email send')  
	console.log('message id: ' , info.message)
	console.log({info})
})