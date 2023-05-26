import express from 'express'
import rzp from 'razorpay'
const router = express.Router() 

router.get('/',(req,res) => {
	res.status(200).send('Welcome to the payment gateway')
})





export default router 