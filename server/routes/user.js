import express from 'express'
import User from '../models/user.js'
import Pnr from '../models/pnr.js'
import jwt from 'jsonwebtoken'
import Ticket from '../models/ticket.js'
import Train from '../models/train.js'
import cookieParser from 'cookie-parser'
import auth from '../middlewares/auth.js'
import sendMail from './mail.js'
import get_html from './html.js'
import get_hash from './hash.js'
const router = express.Router()
import config from '../config.js'

router.use(cookieParser())
const age = 720 * 3600

const createToken = async (id) => {
    return jwt.sign({ id }, "Thisismysecretkeyforjsonwebtoken", {
        expiresIn: age
    })
}

router.get("/", (req, res) => {
    console.log("This is user page")
})


router.get("/profile", auth, async (req, res) => {
    // console.log(req.body) 
    config.mongo_connect(); 
    return res.status(200).send({
        success: true,
        msg: "Profile information fetched successfully!",
        user: req.user,
        token: req.token
    })
})

//for registering user
router.post("/register", async (req, res) => {
    config.mongo_connect(); 
    const { username, password, name } = req.body

    try {
        let user = await User.findOne({ username })
        // console.log(user)
        if (user) return res.status(400).send({
            success: false,
            msg: "This username is already taken. Please try with another username.",
            // toPath:"/register"
        })

        user = new User({
            name,
            username,
            password:get_hash(password)
        })

        user = await user.save()

        if (!user) throw err
        return res.status(200).send({
            success: true,
            msg: "Registration successful, you can login now.",
            // toPath:"/login",
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            msg: "There was an error registering you! Please try again later.",
            toPath: "/register"
        })
    }
})


router.post("/login", async (req, res) => {
    config.mongo_connect(); 

    const { username, password } = req.body

    try {

        let user = await User.findOne({ username })

        if (!user) return res.status(400).send({
            success: false,
            msg: "No user is registered with this username! Please try registering. Thanks.",
            toPath: "/register"
        })

        else if (user.password !== get_hash(password)) return res.status(403).send({
            success: false,
            msg: "Incorrect Password! Please try entering correct password",
            toPath: "/login",
            user: {
                username,
                password:null
            }
        })

        else if (user.password === get_hash(password)) {

            const token = await createToken(user._id)

            res.cookie('accessToken', token, {
                withCredentials: true,
                httpOnly: true,
                maxAge: age * 1000,
                secure: false ,
                // secure:true, // comment these out and comment the secure == false option on deployment
                // sameSite:'none',
            })

            console.log(token)

            user.token = token

            user = await user.save()

            return res.status(200).send({
                success: true,
                msg: "Welcome " + user.name + ",Login successful! Please Update your profile for ticket booking. Thanks.",
                user,
                toPath: "/profile"
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({
            success: false,
            msg: "There was an error logging you in! Please try again later. Thanks.",
            toPath: "/login"
        })
    }
})


router.post("/update_user", auth, async (req, res) => {
    config.mongo_connect();

    const { username, phone, email, address, name } = req.body
    try {

        let user = await User.findOne({ username })
        if (!user) return res.status(403).send({
            success: false,
            msg: "No such user exists! Please try again later, Thanks."
        })

        user.name = name
        user.phone = phone
        user.email = email
        user.address = address

        user = await user.save()

        if (!user) return res.status(403).send({
            success: false,
            msg: "Failed to update user profile! Please try again later, Thanks."
        })

        return res.status(200).send({
            success: true,
            msg: "Profile updation successful! You can continue ticket booking.",
            toPath: "/reservationConfirmation",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(403).send({
            success: false,
            msg: "Failed to update user profile! Please try again later, Thanks."
        })
    }
})


/*for this thing we need to check if the user is logged in or not even if the user
 was previously looged in so using auth again 
 now we have to generate tickets for each of the travellers */

router.post("/confirmReservation", auth, async (req, res) => {
    config.mongo_connect();
    const { resInfo } = req.body, reservations = []

    console.log({ resInfo })

    try {

        let bookUser = await User.findOne({ username: req.body.user.username })
        // in case of any error
        if (!bookUser) return res.status(500).send({
            msg: "There was an error during ticket booking! Please try again later",
            success: false
        })
        const email_of_user = bookUser.email
        const train = {
            name: resInfo.train.name,
            number: resInfo.train.number,
            id: resInfo.train._id
        }
        const { users, stations, distance, date } = resInfo
        const quantity = users.length,
            jClass = resInfo.class
        // console.log(users, stations , distance, quantity , train)

        //-----------getting list of all the pnrs
        let pnrs = await Pnr.find({}),
            train_value = await Train.findOne({ number: train.number })
        //--------in case of any error while fetching train or pnr information
        if (!pnrs || !train_value) return res(500).send({
            success: false,
            msg: "There was an error during ticket booking! Please try again later"
        })
        let pnr_values = [],
            emptySeats = []

        pnrs.map((pnr, index) => {
            pnr_values.push(pnr.pnr)
        })

        jClass.seats.map((item, index) => {
            if (!item) emptySeats.push(index)
        })

        //------pnr generation 
        for (let i = 0; i < users.length; i++)
            pnr_values.push(Math.floor(Math.random() * 100000))
        pnr_values.reverse()
        console.log("List of possible pnr values to be allocated", pnr_values)

        //--------ticket generation 
        for (let i = 0; i < users.length; i++) {

            //allocation of seats and updating seat status whether booked or not?
            let user = users[i],
                seat = emptySeats[emptySeats.length - 1]
            jClass.seats[seat] = true
            jClass.bookedSeats += 1
            emptySeats.pop()
            users[i].pnr = pnr_values[i]
            users[i].seat = seat
            let ticket = new Ticket({
                pnr: pnr_values[i],
                bookedBy: bookUser._id,
                user,
                seat,
                jClass,
                stations,
                distance,
                quantity,
                train,
                date,
                status:'Active'
            })
            // console.log("ticket for ",i+1,"the user",ticket)
            reservations.push(ticket) //adding tickets to user reservations list
        }

        //------updating the pnr values 
        for (let i = 0; i < users.length; i++) {
            let pnr_value = new Pnr({ pnr: pnr_values[i] })
            pnr_value = await pnr_value.save()
            //------in case of any error
            if (!pnr_value) return res.status(500).send({
                msg: "There was an error. Please try again later.",
                success: false
            })
        }

        //------updating ticket values and user information 
        for (let i = 0; i < reservations.length; i++) {
            let ticket_value = reservations[i]
            ticket_value = await ticket_value.save()
            //------- in case of any error
            if (!ticket_value) return res.status(500).send({
                success: false,
                msg: "There was an error! Please try agail later."
            })
            if (ticket_value) console.log(i + 1, "th ticket  generated....")
        }

        // -----after all this we will be updating user information
        console.log("Updated user after booking\n", bookUser)
        let user_value = bookUser
        user_value.reservations.push(reservations) //adding reservations to list of booked tickets by user
        user_value = await user_value.save()
        // -----in case of any error
        if (!user_value) return res.status(400).send({
            success: false,
            msg: "There was an error during ticket booking! Please try again later"
        })

        // ----updating class information
        for (let i = 0; i < train_value.classes.length; i++)
            if (jClass.classType === train_value.classes[i].classType) {
                train_value.classes[i] = jClass
                break
            }

        // -------update train information as class and ticket information is modified 
        train_value = await train_value.save() // now we have to save the train as to save changes
        //------in case of any error
        if (!train_value) return res.status(500).send({
            success: false,
            msg: "There was an error during ticket booking! Please try again later"
        })
        if (train_value) console.log('Saved all the changes....')


        user_value.password = null //setting password as null


        //sending mail to the user 
        const message = get_html(users, reservations[0])
        const response = await sendMail(email_of_user, message)
        console.log({ response })

        return res.status(200).send({
            msg: "Booking successful!",
            success: true,
            user: user_value
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            msg: "There was an error during reservation! Please try again later.",
        })
    }

})

router.get('/refresh_user' , async(req,res) => {
    config.mongo_connect(); 
    let users = await User.find({})
    for(let i=0;i<users.length;i++){
        let user = users[i] 
        // user.isAdmin = true 
        // user.password = get_hash(user.password) 
        user = await user.save() 
    }
})

router.post("/logout", auth, async (req, res) => {
    config.mongo_connect(); 
    let id = req.user._id
    let user = await User.findOne({ _id: id })
    if (!user) return res.status(400).send({
        success: false,
        msg: "There was an error logging you out"
    })

    user.token = null
    user = await user.save()

    if (!user) return res.status(400).send({
        success: false,
        msg: "There was an error logging you out"
    })
    res.clearCookie('accessToken')
    res.status(200).send({
        success: true,
        msg: "Logged out successfully",
        toPath: "/"
    })
})


export default router