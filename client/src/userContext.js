import React , { createContext , useState , useEffect} from 'react' 
import { useNavigate , useLocation} from 'react-router-dom'
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({children}) {
	const navigate = useNavigate()
	const [profile , setProfile] = useState(null)
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

	console.log(user)

	return (<> 

		<UserContext.Provider value={{profile , setProfile}}>
			{children}
		</UserContext.Provider>

		</>)
}