import React , { createContext , useState , useEffect} from 'react' 
import { useNavigate , useLocation} from 'react-router-dom'
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({children}) {
	const navigate = useNavigate()
	const [profile , setProfile] = useState(null)
	const [stations , setStations] = useState([])
	const [user , setUser] = useState(null) 
	const [ready , setReady] = useState(false)  //this we are adding so that it takes some-time to load the user information 
	                            //and during that period we will be getting errors and to avoid that we are using ready

	const fetchUser = async () => {

		try{
			const response = await fetch('http://localhost:4000/user/profile',{
					withCredentials:true ,
					method:"GET",
					headers:{
						Accept:"application/json",
						"Content-Type":"application/json"
					},
					credentials:"include"
				})

			const result = await response.json() 
			if(!result.success) throw new Error(result.msg) 
			else if(result.success) {
				setUser(result.user)
			    setProfile(result.user) 
			}
		}
		catch(error){
			console.log(error) 
			// error.message?window.alert(error.message):window.alert("There was an error! Please try again later.")
			navigate("/")
		}

	}

	useEffect(() => {
		fetchUser() 
	},[])

	const fetchStations = async () => {
		try {
			const response = await fetch('http://localhost:4000/train/station_list' , {
				withCredentials : true ,
				method:"GET",
				headers : {
					Accept:"application/json",
					"Content-Type":"application/json"
				},
				credentials:"include"
			})

			const result = await response.json() 
			if(!result.success) throw new Error(result.msg) 
			else if(result.success) {
				setStations(result.stations)
			}
		}
		catch(error){
			console.log(error) 
			// error.message?window.alert(error.message):window.alert("There was an error! Please try again later.")
			navigate("/")
		}
	}
	useEffect(() => {
		fetchStations() 
	}, [])
	console.log({stations})
	//setting the list of stations in local storage so that we don't have to fetch again and again 
	localStorage.setItem('stations' , JSON.stringify(stations))

	console.log(user)

	return (<> 

		<UserContext.Provider value={{profile , setProfile , stations , setStations}}>
			{children}
		</UserContext.Provider>

		</>)
}